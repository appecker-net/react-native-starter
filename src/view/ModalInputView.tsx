import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ListItemData} from './List/BKListItem';
import colors from '../constant/colors';
import {AppInput, Button} from './';

export type ModalInputOption = ListItemData & {
  key: string;
};

export type ModalInputProps = {
  title: string;
  value?: string;
  errorMessage?: string;
  visible: boolean;
  setValue: (item: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

const ModalInputView = ({
  title,
  visible,
  onCancel,
  value,
  setValue,
  errorMessage,
  onSubmit,
}: ModalInputProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onCancel}>
        <View style={styles.container}>
          <View style={{backgroundColor: 'white', padding: 20}}>
            <Text style={styles.title}>{title}</Text>
            <AppInput
              title="Enter Code"
              keyboardType="number-pad"
              value={value}
              onChangeText={value => setValue(value)}
              errorMessage={errorMessage}
            />
            <Button style={{marginTop: 8}} title="Verify" onPress={onSubmit} />
            <Button
              style={{marginTop: 3}}
              title={'Cancel'}
              onPress={onCancel}
              type="clear"
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
    flex: 1,
    height: 300,
    width: '85%',
    justifyContent: 'center',
    alignSelf: 'center',
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
    padding: 8,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    alignItems: 'center',
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

export default ModalInputView;
