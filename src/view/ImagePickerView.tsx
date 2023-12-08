import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import AppButton from './Button';
import colors from '../constant/colors';
import ImagePicker from 'react-native-image-crop-picker';

type ImagePickerViewProps = {
  onImageSelected: (image?: string) => void;
  title: string;
  imageUri?: string;
  imageStyle?: ImageStyle;
  displayEmptyImage?: boolean;
  cropOptions?: {width?: number; height?: number; cropping?: boolean};
};
const ImagePickerView = ({
  onImageSelected,
  title,
  imageUri,
  imageStyle,
  displayEmptyImage,
  cropOptions,
}: ImagePickerViewProps) => {
  const [aspectRatio, setAspectRatio] = useState(2.4);

  const handleSelectImage = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
      ...cropOptions,
    })
      .then(image => {
        console.log(image);
        onImageSelected(image.path);
      })
      .catch(erorr => {
        console.log(erorr);
      });
  };

  return (
    <View style={styles.container}>
      {imageUri && (
        <Image
          onLoad={event => {
            const {width, height} = event.nativeEvent.source;
            setAspectRatio(width / height);
          }}
          source={{uri: imageUri}}
          style={[styles.image, {aspectRatio}, imageStyle]}
        />
      )}
      {displayEmptyImage && !imageUri && (
        <TouchableOpacity onPress={handleSelectImage}>
          <View
            style={{
              width: '100%',
              aspectRatio,
              backgroundColor: colors.light60,
            }}
          />
        </TouchableOpacity>
      )}
      <AppButton type="clear" title={title} onPress={handleSelectImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
});

export default ImagePickerView;
