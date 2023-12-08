import React, {useEffect, useMemo, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  NativeScrollEvent,
} from 'react-native';
import {BKListItem, ListItemData} from './List/BKListItem';
import colors from '../constant/colors';

const ITEMS_PER_PAGE = 20;

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  const paddingToBottom = 100;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export type ModalPickerOption = ListItemData & {
  key: string;
};

export type ModalPickerProps = {
  title: string;
  showSelection?: boolean;
  defaultVaue?: string;
  options: ModalPickerOption[];
  visible: boolean;
  multiSelection?: boolean;
  onSelect: (item: ModalPickerOption[]) => void;
  onCancel: () => void;
  useTitle?: boolean;
};

const ModalPicker = ({
  title,
  options,
  visible,
  onSelect,
  onCancel,
  defaultVaue,
  showSelection = true,
  multiSelection = false,
  useTitle,
}: ModalPickerProps) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Array<ModalPickerOption>
  >([]);

  const keyToUse = useTitle ? 'title' : 'key';
  useEffect(() => {
    const v = options.filter(o =>
      defaultVaue?.split(',').includes(o[keyToUse]),
    );
    setSelectedOptions(v);
  }, [defaultVaue]);

  const [itemsToDisplay, setItemsToDisplay] = useState(ITEMS_PER_PAGE);
  const handleSelect = (option: ModalPickerOption) => {
    if (!multiSelection) {
      setSelectedOptions([option]);
      onSelect([option]);
      return;
    }

    const isSelected = selectedOptions.find(
      selectedOption => selectedOption?.[keyToUse] === option[keyToUse],
    );
    const options = isSelected
      ? selectedOptions.filter(
          selectedOption => selectedOption?.[keyToUse] !== option[keyToUse],
        )
      : [...selectedOptions, option];
    setSelectedOptions(options);
  };

  const handleDone = () => {
    onCancel();
    multiSelection && onSelect(selectedOptions);
  };

  const handleCancel = () => {
    onCancel();
  };

  const optionsToDisplay = useMemo(() => {
    return itemsToDisplay < options.length
      ? options.slice(0, itemsToDisplay)
      : options;
  }, [itemsToDisplay, options]);

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
            <TouchableOpacity onPress={handleDone}>
              <Text style={styles.cancelButton}>
                {multiSelection ? 'Done' : 'Cancel'}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.scrollView}
            onScroll={({nativeEvent}) => {
              if (
                isCloseToBottom(nativeEvent) &&
                options.length > itemsToDisplay
              ) {
                console.log(itemsToDisplay);
                setItemsToDisplay(itemsToDisplay + ITEMS_PER_PAGE);
              }
            }}
            scrollEventThrottle={400}>
            {optionsToDisplay.map(option => (
              <BKListItem
                style={{padding: 8}}
                selection={true}
                key={`${option.key}`}
                item={option}
                onPress={() => handleSelect(option)}
                selected={
                  showSelection
                    ? !!selectedOptions.find(
                        selectedOption =>
                          selectedOption?.[keyToUse] === option[keyToUse],
                      )
                    : false
                }
                accessory={
                  showSelection
                    ? !!selectedOptions.find(
                        selectedOption =>
                          selectedOption?.[keyToUse] === option[keyToUse],
                      )
                      ? 'check'
                      : 'none'
                    : 'none'
                }
              />
            ))}
          </ScrollView>
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
    maxHeight: '80%',
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

export default ModalPicker;
