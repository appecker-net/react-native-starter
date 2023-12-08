import React from 'react';
import {WebView} from 'react-native-webview';
import getNavigationLeftButtonAction from '../view/NavigationDefaultLeftCTA';
import {useLoader} from '../context/appContext/AppContext+StateHooks';

export default function WebPageScreen({navigation, route}: any) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...getNavigationLeftButtonAction({route, navigation}),
    });
  }, [navigation, route]);
  const {showLoader} = useLoader();

  return (
    <WebView
      allowFileAccess={true}
      source={{uri: route.params.uri}}
      onLoadStart={() => {
        showLoader(true);
      }}
      onLoadEnd={() => {
        showLoader(false);
      }}
      onError={() => {
        showLoader(false);
      }}
    />
  );
}
