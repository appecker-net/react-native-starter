import React from 'react';
import {StyleSheet} from 'react-native';
import typography from '../../constant/typography';
import {BKListItem, BKListItemProps} from './BKListItem';

export const CustomListItem = (props: BKListItemProps) => {
  return (
    <BKListItem
      style={styles.itemContainer}
      {...props}
      accessory="right-arrow"
    />
  );
};

const styles = StyleSheet.create({
  itemTextContainer: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 8,
    marginRight: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  itemTitle: {...typography.title},
  itemSubtitle: {...typography.subtitle},

  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
    padding: 8,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
  },
});
