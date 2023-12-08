export type Company = {
  id: number;
  company_uid: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  tax_id: string;
  dto: string;
  mca: string;
  irp_exp_date: string;
  clearing_house: string;
  call_before_clearing: string;
  ask_mvr: string;
  status: string;
  level: string;
  created_at: string;
  updated_at: string;
  token: string;
};

export type User = Company;

export type AppState = {
  user?: User;
  loading: boolean;
};

export const initialState: AppState = {
  user: undefined,
  loading: false,
};

//-- Reducer

export enum ActionTypes {
  User = 'user',
  Loading = 'loading',
  Reset = 'reset',
}

export type Action = {
  type: ActionTypes;
  payload: any;
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ActionTypes.User:
      return {...state, user: action.payload};
    case ActionTypes.Loading:
      return {...state, loading: action.payload};
    case ActionTypes.Reset:
      return initialState;
    default:
      throw new Error();
  }
}

export default appReducer;
