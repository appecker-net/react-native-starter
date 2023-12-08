import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, View, Animated, Text} from 'react-native';
import typography from '../constant/typography';
import {StyleSheet} from 'react-native';
import colors from '../constant/colors';

const SegmentedView = ({
  options,
  selected,
  onPress,
}: {
  options: string[];
  selected: number;
  onPress: (selected: number, title: string) => void;
}) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const viewWidth = useRef(0);
  useEffect(() => {
    const value = selected * (1 / options.length);
    Animated.timing(moveAnim, {
      toValue: value,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [selected]);

  const xVal = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, viewWidth.current],
  });

  const animStyle = {
    transform: [
      {
        translateX: xVal,
      },
    ],
  };

  return (
    <View
      onLayout={event => {
        viewWidth.current = event.nativeEvent.layout.width;
      }}
      style={styles.container}>
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            key={`SegmentedView_${index}`}
            style={{flex: 1}}
            onPress={() => {
              onPress(index, option);
            }}>
            <View style={styles.segment}>
              <Text
                style={
                  selected === index
                    ? styles.segmentTextSelected
                    : styles.segmentText
                }>
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <Animated.View
        style={[
          styles.bottomLine,
          {width: viewWidth.current * (1 / options.length)},
          animStyle,
        ]}
      />
    </View>
  );
};

export default SegmentedView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    borderBottomColor: colors.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  segment: {
    padding: 8,
    alignSelf: 'stretch',
    color: colors.tint,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.tint,
    alignItems: 'center',
  },
  segmentText: {...typography.subTitle, color: colors.tint},
  segmentTextSelected: {
    ...typography.subTitle,
    color: colors.tint,
    fontWeight: '500',
  },
  bottomLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: colors.tint,
    bottom: 0,
  },
});
