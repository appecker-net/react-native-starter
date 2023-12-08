import {Button, ButtonProps} from '@rneui/base';
import colors from '../constant/colors';
import SvgArrowIcon from '../../resources/svg/SvgArrow';
import {View} from 'react-native';
import ModalPickerView, {ModalPickerOption} from './ModalPickerView';
import {useState} from 'react';
import typography from '../constant/typography';

const AppButton = ({style, titleStyle, ...props}: ButtonProps) => (
  <Button
    style={[
      {
        marginHorizontal: 8,
        borderRadius: 8,
        overflow: 'hidden',
      },
      style,
    ]}
    color={colors.primary}
    titleStyle={[
      typography.title,
      {color: props.type === 'clear' ? colors.primary : colors.white},
      titleStyle,
    ]}
    {...props}
  />
);
export default AppButton;

/**
 * HOW TO USE. 
 * Use it same as button
 * <AppButtonDropDown
      style={styles.button}
      title={'Attended'}
      pickerTitle="Select an Action"
      onSelection={() => {}}
      options={[{key: 'teminated', title: 'Terminate'}]}
    />
 * @param props 
 * @returns 
 */
export const AppButtonDropDown = ({
  pickerTitle,
  onSelection,
  options,
  ...props
}: ButtonProps & {
  pickerTitle: string;
  onSelection: (item: ModalPickerOption) => void;
  options: Array<ModalPickerOption>;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleSelectOption = (option: any) => {
    onSelection(option);
    setModalVisible(false);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
  };
  return (
    <Button
      color={colors.primary}
      titleStyle={{
        color: props.type === 'clear' ? colors.primary : colors.white,
      }}
      {...props}
      onPress={() => {
        setModalVisible(true);
      }}>
      {props.title}
      <View style={{marginLeft: 16}}>
        <SvgArrowIcon
          height={16}
          width={16}
          direction="down"
          color={'#000'}
          fill={props.type === 'clear' ? colors.primary : colors.white}
        />
        <ModalPickerView
          showSelection={false}
          title={pickerTitle}
          visible={modalVisible}
          options={options}
          onCancel={handleCancelModal}
          onSelect={handleSelectOption}
        />
      </View>
    </Button>
  );
};
