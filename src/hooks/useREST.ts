import {apiManager} from '../models/ApiManager';

type EndPoint = String | undefined | null;

export type ApiResponse<T = any> = {
  success: boolean;
  data: T;
  message: string;
};

export const useREST = (options?: {endPoint?: string}) => {
  const endPoint = options?.endPoint || '';
  const getEndPoint = (ep: EndPoint = null) => {
    return ep !== undefined && ep !== null ? endPoint + ep : endPoint;
  };
  const post = <T = any>(
    data: any,
    ep: EndPoint = null,
    header?: any,
  ): Promise<ApiResponse<T>> => {
    return apiManager.post(getEndPoint(ep), data, header);
  };
  const put = <T = any>(
    data: any,
    ep: EndPoint = null,
  ): Promise<ApiResponse<T>> => {
    return apiManager.put(getEndPoint(ep), data);
  };
  const get = <T = any>(ep: EndPoint = null): Promise<ApiResponse<T>> => {
    return apiManager.get(getEndPoint(ep));
  };
  const deleteMethod = <T = any>(
    ep: EndPoint = null,
  ): Promise<ApiResponse<T>> => {
    return apiManager.delete(getEndPoint(ep));
  };
  return {get, post, put, deleteMethod};
};

export function appendUrlParams(
  url: string,
  params: Record<string, string | number | undefined>,
) {
  const urlParams = Object.keys(params)
    .filter(key => !!params[key])
    .map(key => {
      return `${key}=${params[key]}`;
    })
    .join('&');
  return `${url}?${urlParams}`;
}
