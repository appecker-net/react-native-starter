import React, {ReactNode, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import useAuthUser from '../hooks/useAuthUser';

type SwipeableRowProps = {
  onDelete?: () => void;
  children?: ReactNode;
};

const SwipeableRow = (props: SwipeableRowProps) => {
  const ref = useRef<Swipeable>(null);
  const onClose = () => {
    ref.current?.close();
    props.onDelete?.();
  };
  const {isGuestUser} = useAuthUser();

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragX: Animated.AnimatedInterpolation<string | number>,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 1, 1],
    });
    return (
      <RectButton style={styles.rightAction} onPress={onClose}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          Delete
        </Animated.Text>
      </RectButton>
    );
  };

  return props.onDelete && isGuestUser ? (
    <Swipeable ref={ref} renderRightActions={renderRightActions}>
      {props.children}
    </Swipeable>
  ) : (
    <>{props.children}</>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    margin: 8,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SwipeableRow;
