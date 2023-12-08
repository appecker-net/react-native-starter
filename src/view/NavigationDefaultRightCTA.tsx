import React from 'react';
import AddIcon from '../icons/AddIcon';
import {Button} from '.';

type NavigationDefaultRightCTAProps = {
  route: any;
  addIconOnPress?: () => void;
  disabled: boolean;
  navigation?: any;
  nextScreenProps?: () => object;
  nextIconOnPress?: () => void;
  addScreenRouteName?: string;
};

const NavigationDefaultRightCTA = ({
  route,
  addIconOnPress,
  disabled = false,
  navigation,
  nextScreenProps,
  nextIconOnPress,
  addScreenRouteName,
}: NavigationDefaultRightCTAProps) => {
  return route?.params?.selection ? (
    <Button
      disabled={disabled}
      type="clear"
      title={'Next'}
      titleStyle={{color: '#000'}}
      onPress={
        nextIconOnPress
          ? nextIconOnPress
          : () => {
              if (route?.params?.nextScreenName && navigation) {
                navigation.navigate(route.params.nextScreenName, {
                  autoProps: {
                    ...route.params?.autoProps,
                    ...nextScreenProps?.(),
                  },
                });
              }
            }
      }
    />
  ) : addIconOnPress || addScreenRouteName ? (
    <AddIcon
      onPress={
        addIconOnPress
          ? addIconOnPress
          : () => {
              navigation.navigate(addScreenRouteName);
            }
      }
    />
  ) : null;
};

export default NavigationDefaultRightCTA;
