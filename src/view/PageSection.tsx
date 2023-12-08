import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  ViewProps,
  TextStyle,
} from 'react-native';
import {margin} from '../utils/utils';
import typography from '../constant/typography';
import colors from '../constant/colors';
import {BkListAccessoryView, ListAccessoryType} from './List/BKListBaseItem';
import {maskAndDisplayLastFourDigits} from '../utils/string.helper';

interface PageSection extends ViewProps {
  title: string;
  subTitle?: string;
  contentStyle?: ViewStyle;
  headingStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  headingViewStyle?: ViewStyle;
  open?: boolean;
  expandable?: boolean;
  onSubTitlePress?: () => void;
}

const PageSection = ({
  style,
  contentStyle,
  headingStyle,
  subTitleStyle,
  headingViewStyle,
  children,
  title,
  subTitle,
  open,
  expandable = true,
  onSubTitlePress,
}: PageSection) => {
  const [expanded, setExpanded] = useState(false);
  const onExpand = () => setExpanded(e => !e);
  useEffect(() => {
    open !== undefined && setExpanded(open);
  }, [open]);

  const getSubTitleView = () => {
    if (subTitle) {
      if (onSubTitlePress) {
        return (
          <TouchableOpacity onPress={onSubTitlePress}>
            <Text style={[styles.headingText, headingStyle, subTitleStyle]}>
              {subTitle}
            </Text>
          </TouchableOpacity>
        );
      }
      return <Text style={[styles.headingText, headingStyle]}>{subTitle}</Text>;
    }
    return null;
  };
  return (
    <View style={[styles.container, style]}>
      {expandable ? (
        <TouchableOpacity onPress={onExpand}>
          <View style={[styles.headingContainer, headingViewStyle]}>
            <Text style={[styles.headingText, headingStyle]}>{title}</Text>
            <Text style={[styles.headingText, headingStyle]}>
              {expanded ? '-' : '+'}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View>
          <View style={[styles.headingContainer, headingViewStyle]}>
            <Text style={[styles.headingText, headingStyle]}>{title}</Text>
            {getSubTitleView()}
          </View>
        </View>
      )}
      {(expanded || !expandable) && (
        <View style={[styles.contentStyle, contentStyle]}>{children}</View>
      )}
    </View>
  );
};

export const TextRow = ({
  title,
  value,
  titleStyle,
  subTitleStyle,
  accessory,
  accessorySize,
  maskValue = false,
  ...viewProps
}: {
  title: string;
  value?: string;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  accessory?: ListAccessoryType;
  accessorySize?: number;
  maskValue?: boolean;
} & ItemRowProps) => {
  const valueToDisplay = () => {
    return maskValue ? maskAndDisplayLastFourDigits(value) : value;
  };
  return (
    <ItemRow {...viewProps}>
      <Text
        style={[
          typography.subtitle,
          {marginRight: 8, color: '#000'},
          titleStyle,
        ]}>
        {title}
      </Text>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        {value && value.length && (
          <Text
            numberOfLines={0}
            style={[
              typography.title,
              {textAlign: 'right', color: '#000'},
              subTitleStyle,
            ]}>
            {valueToDisplay()}
          </Text>
        )}
        <BkListAccessoryView accessory={accessory} size={accessorySize} />
      </View>
    </ItemRow>
  );
};

type ItemRowProps = ViewProps & {onPress?: () => void};

export const ItemRow = ({children, style, onPress, ...props}: ItemRowProps) => {
  const row = (
    <View style={[styles.textRow, style]} {...props}>
      {children}
    </View>
  );
  return onPress ? (
    <TouchableOpacity onPress={onPress}>{row}</TouchableOpacity>
  ) : (
    row
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.light60,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headingContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: margin(1.5),
    backgroundColor: colors.primary,
    ...typography.heading,
  },
  headingText: {
    color: colors.tint,
    ...typography.heading,
  },
  contentStyle: {
    paddingTop: margin(1),
    paddingHorizontal: margin(1),
  },
  expandView: {
    marginVertical: 16,
    alignItems: 'flex-end',
  },
  textRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: margin(1.5),
  },
  image: {
    width: 56,
    height: 56,
    backgroundColor: 'red',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PageSection;
