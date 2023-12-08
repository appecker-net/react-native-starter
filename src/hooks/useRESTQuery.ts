import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import {ApiResponse, useREST} from './useREST';
import {useCallback, useRef, useState} from 'react';

export type RESTQueryOptions = {
  page?: number;
  limit?: number;
  id?: string | number;
  onAdd?: (data: ApiResponse) => void;
  onUpdate?: (data: ApiResponse) => void;
  onDelete?: (data: ApiResponse) => void;
};

export const useAsyncMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
) => {
  const promiseRes = useRef<(d: TData) => void>(() => {});
  const promiseRej = useRef<(d: TError) => void>(() => {});

  const mutation = useMutation({
    ...options,
    onError: (e, v, c) => {
      options.onError?.(e, v, c);
      if (promiseRej) {
        promiseRej.current(e);
      }
    },
    onSuccess: (d, v, c) => {
      options.onSuccess?.(d, v, c);
      if (promiseRes) {
        promiseRes.current(d);
      }
    },
  });
  const mutate = (variables: TVariables) => {
    return new Promise<TData>((res, rej) => {
      promiseRes.current = res;
      promiseRej.current = rej;
      mutation.mutate(variables);
    });
  };
  return {...mutation, mutate};
};

export const useLazyQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'initialData'
  > & {initialData?: () => undefined},
) => {
  const [enabled, setEnabled] = useState(false);
  const isQueryEnabled =
    options.enabled !== undefined && options.enabled !== null
      ? options.enabled && enabled
      : enabled;

  console.log(options);
  const result = useQuery({
    ...options,
    enabled: isQueryEnabled,
  });

  const enableQuery = useCallback(() => {
    setEnabled(true);
  }, []);

  return {
    enableQuery,
    ...result,
  };
};

export const useRESTQuery = <T, U, M = any>({
  endPoint,
  page = 1,
  limit = 10,
  id,
  onAdd,
  onDelete,
  onUpdate,
}: RESTQueryOptions & {endPoint: string}) => {
  const queryClient = useQueryClient();
  const {get, post, put, deleteMethod} = useREST({endPoint});

  const getAllQuery = useLazyQuery({
    queryKey: [endPoint, {page}],
    queryFn: () => get(`/all${page ? `?limit=${limit}&page=${page}` : ''}`),
    keepPreviousData: true,
  });

  const getByIdQuery = useLazyQuery({
    queryKey: [endPoint, {id}],
    queryFn: () => get<M>(`/${id}`),
    enabled: !!id,
  });

  const addMutation = useAsyncMutation({
    mutationFn: (data: T) => post(data),
    onSuccess: res => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: [endPoint]});
      onAdd?.(res);
    },
  });

  const updateMutation = useAsyncMutation({
    mutationFn: ({id, ...data}: {id: number} & U) => put(data, `/${id}`),
    onSuccess: res => {
      queryClient.setQueryData([endPoint, {id: 5}], res);
      onUpdate?.(res);
    },
  });

  const deleteMutation = useAsyncMutation({
    mutationFn: ({id}: {id: number | string}) => deleteMethod(`/${id}`),
    onSuccess: res => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: [endPoint]});
      onDelete?.(res);
    },
  });

  return {
    getAllQuery,
    addMutation,
    updateMutation,
    deleteMutation,
    getByIdQuery,
  };
};
