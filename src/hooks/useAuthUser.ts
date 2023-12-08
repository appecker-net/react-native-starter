import {getUserDetails, saveUserDetails} from '../models/StorageModel';
import {
  useAppContextDispatchAction,
  useAppContextState,
} from '../context/appContext/AppContext+StateHooks';
import {ActionTypes, User} from '../context/appContext/AppReducer';
import {useMemo} from 'react';
import {Platform} from 'react-native';
import {apiManager} from '../models/ApiManager';

export enum UserType {
  Company = 'company',
}

export type ImageUri = {uri: string};

export type CompanySignUpModel = {
  comptype: string;
  company_name: string;
  company_email: string;
  company_password: string;
  company_phone?: string;
  company_state?: string;
  company_city?: string;
  company_zip?: string;
  company_address?: string;
  company_tax_id: string;
  company_dto: string;
  company_mca: string;
  clearing_house: string;
  irp_exp_date?: string;
  call_before_clearing: string;
  ask_mvr: string;
  level: string;
};

export type UpdateTokenModel = {
  device: typeof Platform.OS;
  token: string;
  name?: string;
};

export type SignUpDataModel = CompanySignUpModel;

export type updatePasswordDataModel = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function useAppContextUser<S extends User>() {
  const dispatchAction = useAppContextDispatchAction();
  const user = useAppContextState().user as S;
  const setUser = (u: S | undefined) =>
    dispatchAction({payload: u, type: ActionTypes.User});
  return {user, setUser};
}

const useAuthUser = <S extends User>() => {
  const {user, setUser} = useAppContextUser<S>();

  const restoreUserDetails = () => {
    return getUserDetails().then(data => {
      if (data !== null) {
        setUserDetails(data);
      }
      return data;
    });
  };
  const setUserDetails = (data: S) => {
    if (data !== undefined && data.token !== undefined) {
      apiManager.setToken(data.token);
      saveUserDetails(data);
      setUser(data);
    }
  };

  const userType = useMemo(() => {
    const type = user?.type as UserType;
    return {
      type,
      isCompany: type === UserType.Company,
    };
  }, [user]);

  const isGuestUser = user?.level === 'guest';

  return {
    user,
    userType,
    isGuestUser,
    setUser,
    setUserDetails,
    restoreUserDetails,
  };
};

export default useAuthUser;
