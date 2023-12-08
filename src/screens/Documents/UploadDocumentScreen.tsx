import React, {useEffect, useRef, useState} from 'react';
import {AppInput, Button, PageContainer, PickerViewInput} from '../../../view';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import colors from '../../../constant/colors';
import {TYPEDOWNLIST} from '../../../constant/constants';
import useDocumentApis from '../../../hooks/useDocumentApis';
import ActionSheet, {ActionSheetRefType} from '../../../view/ActionSheet';
import useAuthApis from '../../../hooks/useAuthApis';
import {useLoader} from '../../../context/appContext/AppContext+StateHooks';
import UploadDocumentView, {
  FileType,
  getFileName,
} from '../../../view/UploadDocumentView';

export default function UploadDocumentScreen({navigation, route}: any) {
  const type = route.params?.type;

  const [title, setTitle] = useState('');
  const [typeDropList, setTypeDropList] = useState(type);
  const [document, setDocument] = useState<FileType | undefined>();
  const [showError] = useState(false);
  const actionSheetRef = useRef<ActionSheetRefType | null>(null);
  const {user} = useAuthApis({});
  const {showLoader} = useLoader();

  const {
    uploadDocumentMutation: {mutate: uploadRequest, isLoading},
  } = useDocumentApis({type});

  const uploadDocumentAction = async () => {
    if (!document) {
      Alert.alert('Please select Document.');
      return;
    }
    if (title.length === 0) {
      // Alert.alert('Please enter Title.');
      Alert.alert(`Please enter Title. ${typeDropList}`);
      return;
    }

    try {
      const res = await uploadRequest({
        company_id: `${user.id}`,
        title,
        type: typeDropList,
        document: document || '',
      });
      console.log(`res : ${JSON.stringify(res)}`);
      showLoader(false);
      if (res.success) {
        Alert.alert('Document uploaded successfully.');
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showLoader(isLoading);
  }, [isLoading]);

  return (
    <>
      <PageContainer>
        <ScrollView style={styles.view}>
          <AppInput
            title="Title"
            value={title}
            onChangeText={value => setTitle(value)}
            errorMessage={
              showError && title.length === 0 ? 'Please enter title' : undefined
            }
          />
          <PickerViewInput
            title="Select Document Type"
            options={TYPEDOWNLIST}
            onSelection={item => {
              setTypeDropList(item.key);
            }}
            value={typeDropList}
            useTitle={false}
          />
          <UploadDocumentView
            documentName={getFileName(document) || ''}
            buttonTitle="Select Document or Image"
            onPreviewPress={() => {
              navigation.push('DocumentPreviewScreen', {
                uri: document?.uri,
                title: document?.name,
              });
            }}
            onDocumentSelection={setDocument}
          />

          <View style={{marginTop: 8}}>
            <Button title={'Upload'} onPress={uploadDocumentAction} />
          </View>
        </ScrollView>
      </PageContainer>
      <ActionSheet ref={actionSheetRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: colors.background,
  },
  view: {
    margin: 10,
  },
});
