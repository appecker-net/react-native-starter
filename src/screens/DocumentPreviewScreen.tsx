import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Button, PageContainer} from '../view';
import Pdf from 'react-native-pdf';
import {isPDF, isURL} from '../utils/utils';
import {downloadFileAndShare} from './helpers/downloader.helper';
import {useLoader} from '../context/appContext/AppContext+StateHooks';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../constant/colors';

export default function DocumentPreviewScreen({route, navigation}: any) {
  const {item, nextScreenName} = route.params;
  const {showLoader} = useLoader();

  const uri = encodeURI(route.params.uri);
  const isUrlPath = isURL(uri);
  const file =
    isUrlPath || uri.includes('file://') || Platform.OS === 'android'
      ? uri
      : `file://${uri}`;
  const isPdfFile = isPDF(uri);
  const allowDownload = isUrlPath; //&& !!route.params.download;

  const downloadFile = async () => {
    try {
      showLoader(true);
      await downloadFileAndShare(file);
      showLoader(false);
    } catch (error) {
      showLoader(false);
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title || 'Document',
      headerRight: () => (
        <>
          {item && (
            <Button
              type="clear"
              title={'Edit'}
              buttonStyle={{marginRight: 8}}
              titleStyle={{color: '#fff'}}
              onPress={() => {
                if (nextScreenName) {
                  navigation.navigate(nextScreenName, {
                    item,
                  });
                }
              }}
            />
          )}
          {allowDownload && (
            <Icon
              onPress={downloadFile}
              name="clouddownload"
              size={30}
              color={colors.tint}
            />
          )}
        </>
      ),
    });
  }, [navigation, route]);

  return (
    <PageContainer>
      {isPdfFile ? (
        <View style={styles.container}>
          <Pdf
            source={{uri: file}}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
              console.log(file);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
            trustAllCerts={false}
          />
        </View>
      ) : (
        <WebView
          {...(isUrlPath ? {} : {originWhitelist: ['*']})}
          source={{uri: file}}
          allowFileAccess={true}
          style={{flex: 1, backgroundColor: '#fff'}}
          scalesPageToFit={true}
        />
      )}
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
