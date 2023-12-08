import React, {useEffect, useState} from 'react';
import BKList from '../../../view/List/BKList';
import {CustomListItem} from '../../../view/List/CustomListItem';
import EmptyState from '../../../view/EmptyState';
import useDocumentApis from '../../../hooks/useDocumentApis';
import SegmentedView from '../../../view/SegmentedView';
import getNavigationLeftButtonAction from '../../../view/NavigationDefaultLeftCTA';
import NavigationDefaultRightCTA from '../../../view/NavigationDefaultRightCTA';
import {getDocumentImageUrl} from '../../../constant/constants';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import colors from '../../../constant/colors';

export default function DocumentListScreen({navigation, route}: any) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [type, setType] = useState('fueltax');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...getNavigationLeftButtonAction({route, navigation}),
      headerRight: () => (
        <NavigationDefaultRightCTA
          route={route}
          navigation={navigation}
          disabled={false}
          addIconOnPress={() => {
            // Alert.alert(type);
            navigation.navigate('UploadDocumentScreen', {
              type,
            });
          }}
        />
      ),
    });
  }, [navigation, route, type, selectedIndex]);

  const {
    getDocumentsRequestsQuery: {
      data: documentData,
      isLoading: documentloading,
      enableQuery: enabledocumentDetailRequestsQuery,
      refetch: refetchdocumentrequest,
    },
  } = useDocumentApis({type});

  useEffect(() => {
    enabledocumentDetailRequestsQuery();
  }, []);

  const openWebUri = (uri: string, title: string) => {
    navigation.navigate('DocumentPreviewScreen', {uri, title, download: true});
  };

  return (
    <View style={styles.container}>
      <>
        <SegmentedView
          options={['Fuel Tax', 'Other']}
          selected={selectedIndex}
          onPress={index => {
            index == 0 ? setType('fueltax') : setType('other');
            setSelectedIndex(index);
          }}
        />
        <BKList
          listStyle={{paddingTop: 8, paddingBottom: 100}}
          data={documentData?.data || []}
          renderItem={({item}) => {
            return (
              <CustomListItem
                selected={false}
                item={{
                  title: `${item.title}`,
                  subTitles: [
                    `${moment(item.created_at).format(`MMM DD YYYY`)}`,
                  ],
                }}
                accessory="right-arrow"
                onPress={() => {
                  openWebUri(getDocumentImageUrl(item.document), item.title);
                }}
              />
            );
          }}
          onRefresh={() => {
            refetchdocumentrequest();
          }}
          emptyState={() =>
            documentloading || documentData?.data.length ? null : (
              <EmptyState text="You don't have any document yet." />
            )
          }
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: colors.background,
  },
});
