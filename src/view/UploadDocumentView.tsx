import {Platform, View} from 'react-native';
import AppButton from './Button';
import {Text, PermissionsAndroid, Alert} from 'react-native';
import ActionSheet, {ActionSheetRefType} from './ActionSheet';
import {useRef} from 'react';
import documentManager, {types} from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {Linking} from 'react-native';

export type FileType = {uri: string; name?: string; type?: string};

export const getFileName = (file?: FileType | null) => {
  return file?.name || file?.uri?.replace(/^.*[\\\/]/, '');
};

async function requestStoragePermission() {
  try {
    const alreadyGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (alreadyGranted) {
      return alreadyGranted;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE &&
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE &&
        PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    //const granted = permissions['android.permission.READ_EXTERNAL_STORAGE'];

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission granted, proceed with picking image
      console.log(`granted ${granted}`);
    } else {
      // Permission denied
      console.log(`granted ${granted}`);
      Alert.alert(
        'Permission required',
        'This app needs storage permission to access the gallery. Please grant the permission in Settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
      );
    }
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
  }
}

const UploadDocumentView = ({
  documentName = '',
  buttonTitle,
  onPreviewPress,
  onDocumentSelection,
}: {
  documentName: string;
  buttonTitle?: string;
  onPreviewPress: () => void;
  onDocumentSelection: (file: FileType) => void;
}) => {
  const actionSheetRef = useRef<ActionSheetRefType | null>(null);

  const pickDocumentOrImageAction = () => {
    // show actionsheet to pick image or document.
    actionSheetRef.current &&
      actionSheetRef.current.show(
        ['Pick a Document', 'Pick an Image'],
        (label: string) => {
          if (label === 'Pick a Document') {
            setTimeout(() => {
              pickDocument();
            }, 300);
          } else if (label === 'Pick an Image') {
            setTimeout(() => {
              handleSelectImage();
            }, 700);
          }
        },
      );
  };

  const pickDocument = async () => {
    documentManager
      .pickSingle({type: [types.images, types.pdf]})
      .then(async ({uri, name}) => {
        console.log(uri);
        // const filePath = await copyFileToLocalDir(uri);
        // console.log(`filePath : ${filePath}`);
        onDocumentSelection({uri, name: name || undefined});
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSelectImage = async () => {
    if (Platform.OS === 'android') {
      const permissions = await requestStoragePermission();
      if (!permissions) return;
    }

    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: false,
    })
      .then(image => {
        console.log(image);
        onDocumentSelection({uri: image.path, name: image.filename});
      })
      .catch(erorr => {
        console.log(erorr);
      });
  };

  return (
    <View
      style={{
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dotted',
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
        marginHorizontal: 8,
      }}>
      {documentName?.length > 0 && (
        <>
          <Text style={{color: '#000'}}>{documentName}</Text>
          {Platform.OS === 'ios' && (
            <AppButton
              type="clear"
              title={'Preview Document or Image'}
              onPress={onPreviewPress}
            />
          )}

          {Platform.OS === 'ios' && (
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  paddingHorizontal: 8,
                  height: 1,
                  backgroundColor: '#333',
                  marginHorizontal: 8,
                }}
              />
              <Text style={{fontWeight: 'bold', fontSize: 20}}>OR</Text>
              <View
                style={{
                  paddingHorizontal: 8,
                  height: 1,
                  backgroundColor: '#333',
                  marginHorizontal: 8,
                }}
              />
            </View>
          )}
        </>
      )}
      <AppButton
        type="clear"
        title={
          documentName?.length > 0
            ? 'Upload New Document or Image'
            : buttonTitle
            ? buttonTitle
            : 'Select Document or Image'
        }
        onPress={pickDocumentOrImageAction}
      />
      <ActionSheet ref={actionSheetRef} />
    </View>
  );
};
export default UploadDocumentView;
