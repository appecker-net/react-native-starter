import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
  ViewProps,
} from 'react-native';
import CheckIcon from '../../icons/CheckIcon';
import SwipeableRow from '../SwipeableRow';
import ArrowIcon from '../../icons/ArrowIcon';

export type ListAccessoryType =
  | 'check'
  | 'check-disabled'
  | 'right-arrow'
  | 'none';
export interface BKListBaseItemProps extends ViewProps {
  onPress?: () => void;
  onDelete?: () => void;
  selected?: boolean;
  showUnSelectedIcon?: boolean;
  selection?: boolean;
  style?: ViewStyle;
  accessory?: ListAccessoryType;
}

export const BkListAccessoryView = ({
  accessory = 'none',
  size = 20,
}: {
  accessory?: ListAccessoryType;
  size?: number;
}) => {
  switch (accessory) {
    case 'check':
    case 'check-disabled':
      return (
        <CheckIcon size={size} disabled={accessory === 'check-disabled'} />
      );
    case 'right-arrow':
      return <ArrowIcon size={size} direction="right" disabled />;
    default:
      return null;
  }
};

export const BKListBaseItem = ({
  onPress,
  onDelete,
  style,
  children,
  accessory = 'none',
}: BKListBaseItemProps) => {
  return (
    <SwipeableRow onDelete={onDelete}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.item, style]}>
          {children}
          {accessory !== 'none' && (
            <View style={styles.iconContainer}>
              {<BkListAccessoryView accessory={accessory} />}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SwipeableRow>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 8,
    marginRight: 10,
  },
  iconContainer: {
    alignSelf: 'center',
  },
  itemTitle: {},
  itemSubtitle: {},
});
