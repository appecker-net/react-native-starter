import {removeUserDetails} from '../models/StorageModel';
import {User} from '../context/appContext/AppReducer';
import {Alert} from 'react-native';
import {apiManager} from '../models/ApiManager';
import {useQueryClient} from '@tanstack/react-query';
import {useREST} from './useREST';
import useAuthUser, {
  SignUpDataModel,
  UpdateTokenModel,
  UserType,
} from './useAuthUser';
import {useAsyncMutation} from './useRESTQuery';

type Options = {
  type?: UserType;
};

const useAuthApis = <S extends User>(options?: Options) => {
  const type = options?.type || UserType.Company;
  const {user, setUser, setUserDetails, restoreUserDetails} = useAuthUser<S>();
  const {post} = useREST();
  const queryClient = useQueryClient();

  const loginMutation = useAsyncMutation({
    mutationFn: (params: {email: string; password: string}) =>
      post(params, `${type}/login`),
    onSuccess: data => {
      if (data?.success === true) {
        setUserDetails({...data.data, type});
      }
    },
  });

  const resetPasswordMutation = useAsyncMutation({
    mutationFn: (params: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => post(params, `${type}/password/update`),
  });

  const forgotPasswordMutation = useAsyncMutation({
    mutationFn: (email: string) => post({email}, `${type}/validate`),
  });

  const signOutMutation = useAsyncMutation({
    mutationFn: () => post({}, `${user.type}/signout`),
    onSuccess: () => {
      removeUserDetails();
      apiManager.setToken(undefined);
      setUser(undefined);
      queryClient.invalidateQueries();
    },
    onError: (e: any) => {
      removeUserDetails();
      apiManager.setToken(undefined);
      setUser(undefined);
      queryClient.invalidateQueries();
      Alert.alert(e as string);
    },
  });

  const emailVerificationMutation = useAsyncMutation({
    mutationFn: ({email}: {email: string}) =>
      post({email}, `${type}/email/verify`),
  });

  const emailVerificationCodeMutation = useAsyncMutation({
    mutationFn: ({email, code}: {email: string; code: string}) =>
      post({email, code}, `${type}/email/validate`),
  });

  const registerMutation = useAsyncMutation({
    mutationFn: (data: SignUpDataModel) => post(data, `${type}/add`),
  });

  const updateTokenMutation = useAsyncMutation({
    mutationFn: (data: UpdateTokenModel) => post(data, `${type}/token`),
  });

  return {
    user,
    setUser,
    loginMutation,
    resetPasswordMutation,
    forgotPasswordMutation,
    registerMutation,
    updateTokenMutation,
    signOutMutation,
    restoreUserDetails,
    emailVerificationMutation,
    emailVerificationCodeMutation,
  };
};

export default useAuthApis;
