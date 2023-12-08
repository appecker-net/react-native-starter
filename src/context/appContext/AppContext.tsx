import React, {Dispatch, useContext, useReducer} from 'react';
import appReducer, {initialState} from './AppReducer';

const AppContext = React.createContext<{
  state: typeof initialState;
  dispatchAction: (a: any) => void;
  dispatch?: Dispatch<any>;
}>({
  state: initialState,
  dispatchAction: () => {},
  dispatch: undefined,
});

function AppContextProvider({children}: any) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{state, dispatch, dispatchAction: dispatch}}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;

//-- App Context Actions

function useAppContext() {
  return useContext(AppContext);
}

export {useAppContext};
