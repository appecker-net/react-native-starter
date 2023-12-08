import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../constant/colors';
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';

export type Address = {
  formatted_address: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
};

export type ModalPickerProps = {
  title?: string;
  visible: boolean;
  onCancel?: () => void;
  onSelect?: (data: Address) => void;
};

function parseLocationData(data?: GooglePlaceDetail): Address {
  const city =
    data?.address_components.find(({types}) => {
      return types.includes('locality');
    })?.short_name || '';
  const state =
    data?.address_components.find(({types}) => {
      return types.includes('administrative_area_level_1');
    })?.short_name || '';
  const zip =
    data?.address_components.find(({types}) => {
      return types.includes('postal_code');
    })?.short_name || '';
  const address = data?.name || '';
  const lat = data?.geometry.location.lat || 0;
  const lng = data?.geometry.location.lng || 0;
  return {
    address,
    city,
    state,
    zip,
    lat,
    lng,
    formatted_address: data?.formatted_address || '',
  };
}

const AddressModalPicker = ({
  title = 'Seach Address',
  visible,
  onCancel,
  onSelect,
}: ModalPickerProps) => {
  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleCancel}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text numberOfLines={2} style={styles.title}>
              {title}
            </Text>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, height: '100%'}}>
            <GooglePlacesAutocomplete
              textInputProps={{autoFocus: true, placeholderTextColor: '#000'}}
              styles={{
                textInput: {
                  color: '#000',
                },
                description: {
                  color: '#000',
                },
              }}
              fetchDetails={true}
              keepResultsAfterBlur={true}
              placeholder="Search Address"
              onPress={(_, details = null) => {
                if (details !== null) {
                  onSelect?.(parseLocationData(details));
                }
              }}
              onFail={error => console.log(error)}
              query={{
                key: 'AIzaSyDgrFfFDvUivXw9BioIUxMXxIwv4eWLHmw',
                language: 'en',
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '90%',
    paddingBottom: 44,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
    color: '#000',
  },
  cancelButton: {
    color: colors.primary,
    fontSize: 17,
  },
  scrollView: {
    maxHeight: 300,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
  },
  selectedOption: {
    backgroundColor: '#f2f2f2',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});

export default AddressModalPicker;
