import {FileType} from '../view/UploadDocumentView';
import {useREST} from './useREST';
import {useAsyncMutation, useLazyQuery, useRESTQuery} from './useRESTQuery';
import {useQueryClient} from '@tanstack/react-query';

export type DocumentsModel = {
  id: number;
  company_id: number;
  title: string;
  document: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export interface AddDocumentRequestModel {
  company_id: string;
  title: string;
  type: string;
  document: FileType;
}

const useDocumentApis = ({
  documentId,
  type,
}: {
  documentId?: string | number;
  page?: number;
  limit?: number;
  type?: string;
}) => {
  const endPoint = '/company/document';
  const allMethods = useRESTQuery<
    AddDocumentRequestModel,
    AddDocumentRequestModel
  >({
    endPoint,
    id: documentId,
  });
  const {get, post, put} = useREST({endPoint});

  const queryClient = useQueryClient();

  const getDocumentsRequestsQuery = useLazyQuery({
    queryKey: [`/company/document/${type}`],
    queryFn: () => get<DocumentsModel[]>(`/${type}`),
  });

  const uploadDocumentMutation = useAsyncMutation({
    mutationFn: (data: AddDocumentRequestModel) => post(data),
    onSuccess: res => {
      console.log(res);
      queryClient.invalidateQueries([`/company/document/${type}`]);
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  return {
    ...allMethods,
    getDocumentsRequestsQuery,
    uploadDocumentMutation,
  };
};

export default useDocumentApis;
