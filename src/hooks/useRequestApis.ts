import {useREST} from './useREST';
import {useAsyncMutation, useLazyQuery, useRESTQuery} from './useRESTQuery';
import {useQueryClient} from '@tanstack/react-query';

export type RequestsModel = {
  id: number;
  company_id: number;
  user_id: string;
  title: string;
  phone: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export interface AddRequestModel {
  company_id: string;
  owner_id: string;
  title: string;
  phone: string;
  description: string;
}

const useRequestApis = ({
  documentId,
}: {
  documentId?: string | number;
  page?: number;
  limit?: number;
}) => {
  const endPoint = '/company/request';
  const allMethods = useRESTQuery<AddRequestModel, AddRequestModel>({
    endPoint,
    id: documentId,
  });
  const {get, post} = useREST({endPoint});

  const queryClient = useQueryClient();

  const getRequestsQuery = useLazyQuery({
    queryKey: ['/company/request'],
    queryFn: () => get<RequestsModel[]>(``),
  });

  const uploadRequestMutation = useAsyncMutation({
    mutationFn: (data: AddRequestModel) => post(data),
    onSuccess: res => {
      console.log(res);
      queryClient.invalidateQueries(['/company/request']);
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  return {
    ...allMethods,
    getRequestsQuery,
    uploadRequestMutation,
  };
};

export default useRequestApis;
