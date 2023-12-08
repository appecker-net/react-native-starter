import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native'; // Import Animated from react-native
import typography from '../constant/typography';

const PRIMARY_COLOR = 'rgb(0,98,255)';
const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';

interface ActionItem {
  id: number | string;
  label: string;
  onPress: (label: string) => void;
}

interface ActionSheetProps {
  actionTextColor?: string;
  cancelButtons?: string[];
}

export type ActionSheetRefType = {
  show: (items: string[], onPress: (label: string) => void) => void;
} & ActionSheetProps;

const ActionSheet = forwardRef((props: ActionSheetProps, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);

  const showWithActionSheetItems = (
    items: string[],
    onPress: (label: string) => void,
  ) => {
    const _items: ActionItem[] = items.map(l => ({
      id: `id_${l}`,
      label: l,
      onPress,
    }));
    setActionItems([..._items]);
    setVisible(true);
  };

  const hideActionSheet = () => {
    setVisible(false);
    setActionItems([]);
  };

  useImperativeHandle(ref, () => ({
    show: showWithActionSheetItems,
  }));

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={hideActionSheet}>
      <TouchableWithoutFeedback onPress={hideActionSheet}>
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.actionSheetContainer}>
            <View style={[styles.buttonsView]}>
              {actionItems.map((actionItem, index) => (
                <TouchableHighlight
                  style={[
                    styles.actionSheetView,
                    index === 0 && styles.firstAction,
                    index === actionItems.length - 1 && styles.lastAction,
                  ]}
                  underlayColor={'#f7f7f7'}
                  key={index}
                  onPress={() => {
                    actionItem.onPress(actionItem.label);
                    hideActionSheet();
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.actionSheetText,
                      props?.actionTextColor
                        ? {color: props?.actionTextColor}
                        : {},
                      props.cancelButtons?.includes(actionItem.label) && {
                        color: '#fa1616',
                      },
                    ]}>
                    {actionItem.label}
                  </Text>
                </TouchableHighlight>
              ))}
            </View>
            <TouchableHighlight
              style={[styles.cancelButton, styles.lastAction]}
              underlayColor={'#f7f7f7'}
              onPress={() => {
                hideActionSheet();
              }}>
              <Text
                allowFontScaling={false}
                style={[styles.actionSheetCancelText, {color: '#fa1616'}]}>
                Cancel
              </Text>
            </TouchableHighlight>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sareArea: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  actionSheetContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  actionSheetText: {
    ...typography.titleLight,
    color: PRIMARY_COLOR,
  },
  actionSheetCancelText: {
    ...typography.titleLight,
    color: '#fa1616',
  },
  actionSheetView: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_COLOR,
    alignItems: 'center',
  },
  firstAction: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastAction: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 0,
  },
  cancelButton: {
    backgroundColor: WHITE,
    borderRadius: 12,
    marginBottom: 0,
    marginHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 16,
  },
  buttonsView: {
    backgroundColor: WHITE,
    borderRadius: 12,
    marginBottom: 20,
    marginHorizontal: 16,
  },
});

export default ActionSheet;
