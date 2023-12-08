import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import typography from '../../constant/typography';
import {BKListBaseItem, BKListBaseItemProps} from './BKListBaseItem';

export interface ListItemData {
  title: string;
  subTitles?: (string | undefined)[];
}

export interface BKListItemProps extends BKListBaseItemProps {
  item: ListItemData;
  selected?: boolean;
  showUnSelectedIcon?: boolean;
  selection?: boolean;
  showArrowIcon?: boolean;
}

export const BKListItem = ({
  item,
  selected = false,
  showUnSelectedIcon = false,
  selection = false,
  showArrowIcon = false,
  ...props
}: BKListItemProps) => {
  return (
    <BKListBaseItem
      {...props}
      accessory={
        selection && (selected || showUnSelectedIcon)
          ? selected
            ? 'check'
            : 'check-disabled'
          : showArrowIcon
          ? undefined
          : props.accessory || 'right-arrow'
      }>
      <View style={styles.itemTextContainer}>
        <Text style={[styles.itemTitle, typography.title, {color: '#000'}]}>
          {item.title}
        </Text>
        {item.subTitles
          ?.filter(t => !!t)
          ?.map((t, i) => (
            <Text
              key={`subtitle${i}`}
              style={[styles.itemSubtitle, typography.subTitle]}>
              {t}
            </Text>
          ))}
      </View>
    </BKListBaseItem>
  );
};

const styles = StyleSheet.create({
  itemTextContainer: {
    flex: 1,
    marginLeft: 8,
    marginVertical: 4,
    marginRight: 8,
  },
  iconContainer: {
    marginRight: 10,
  },
  itemTitle: {...typography.title},
  itemSubtitle: {...typography.subtitle, color: '#000'},
});
