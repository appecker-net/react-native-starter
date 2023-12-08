import {Input, InputProps} from '@rneui/themed';
import moment from 'moment';
import {forwardRef, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
  TextStyle,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SvgArrowIcon from '../../resources/svg/SvgArrow';
import ModalPickerView, {ModalPickerOption} from './ModalPickerView';
import AddressModalPicker, {Address} from './AddressSearchView';
import typography from '../constant/typography';

type AppInputProps = InputProps & {
  title?: string;
  prefix?: string;
  inputTitleStyle?: TextStyle;
};

const AppInput = forwardRef(
  ({inputTitleStyle, ...props}: AppInputProps, ref: any) => {
    return (
      <View style={styles.inputView}>
        <Text style={[styles.inputTitle, inputTitleStyle]}>
          {props.title || props.placeholder}
        </Text>
        <View style={styles.inputInnerView}>
          {props.prefix && (
            <View style={styles.inputPrefixView}>
              <Text style={styles.inputPrefix}>{props.prefix}</Text>
            </View>
          )}
          <Input
            ref={ref}
            autoCapitalize="none"
            autoCorrect={false}
            {...props}
            placeholder={''}
            errorStyle={[typography.font, props.errorStyle]}
            inputStyle={[typography.font, props.inputStyle]}
          />
        </View>
      </View>
    );
  },
);

export const PhoneNumberInput = ({
  verified,
  onVerifyPress,
  ...props
}: AppInputProps & {onVerifyPress?: () => void; verified: boolean}) => {
  return (
    <View style={styles.inputView}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.inputTitle}>
          {props.title || props.placeholder}
        </Text>
        {verified && (
          <View style={[styles.badgeView, {backgroundColor: '#5DAB54'}]}>
            <Text style={[styles.badgeText, {color: 'white'}]}>Verified</Text>
          </View>
        )}
        {!verified && (
          <View style={[styles.badgeView]}>
            <Text style={styles.badgeText}>Not Verified</Text>
          </View>
        )}
        {!verified && (
          <TouchableOpacity onPress={onVerifyPress}>
            <View style={[styles.badgeView, {backgroundColor: '#000'}]}>
              <Text style={[styles.badgeText, {color: 'white'}]}>
                Verify Now
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputInnerView}>
        {props.prefix && (
          <View style={styles.inputPrefixView}>
            <Text style={styles.inputPrefix}>{props.prefix}</Text>
          </View>
        )}
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
          placeholder={''}
        />
      </View>
    </View>
  );
};

export const FloatingAppInput = (props: AppInputProps) => {
  const moveText = useRef(new Animated.Value(0)).current;
  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  useEffect(() => {
    if (props.value !== '') {
      moveTextTop();
    } else if (props.value === '') {
      moveTextBottom();
    }
  }, [props.value]);

  return (
    <View style={styles.inputView}>
      <Animated.View style={[animStyle]}>
        <Text style={[styles.inputFloatingTitle]}>
          {props.title || props.placeholder}
        </Text>
      </Animated.View>
      <View style={styles.inputInnerView}>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
          placeholder={''}
          inputStyle={[props.inputStyle, {fontSize: 18}]}
        />
      </View>
    </View>
  );
};

export default AppInput;

//--
/**
 * HOW TO USE
 * <PickerViewInput
    placeholder="Option"
    title="Select An Option"
    options={[
      {title: '1', key: '1', subTitles:["test subtitle one"]},
      {title: '2', key: '2'},
      {title: '3', key: '3'},
    ]}
    onSelection={item => {
      console.log(item.title);
    }}
  />
 */

export type PickerViewInputProps = {
  value?: string;
  errorMessage?: string;
  placeholder?: string;
  onSelection?: (item: ModalPickerOption) => void;
  onMultiSelection?: (item: ModalPickerOption[]) => void;
  options: Array<ModalPickerOption>;
  title: string;
  multiSelection?: boolean;
  useTitle?: boolean;
  multiline?: boolean;
  disable?: boolean;
};

export const PickerViewInput = ({
  options,
  title,
  onSelection,
  onMultiSelection,
  multiSelection = false,
  useTitle = true,
  multiline = false,
  disable = false,
  ...inputProps
}: PickerViewInputProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleSelectOption = (options: ModalPickerOption[]) => {
    if (multiSelection) {
      onMultiSelection?.(options);
    } else {
      onSelection?.(options[0]);
      setModalVisible(false);
    }
  };

  const handleCancelModal = () => {
    setModalVisible(false);
  };

  const keyToUse = useTitle ? 'title' : 'key';
  const valueToDisplay = options
    .filter(o => inputProps.value?.split(',')?.includes(o[keyToUse]))
    .map(v => v.title)
    .join(', ');

  return (
    <View style={styles.pickerView}>
      <AppInput
        title={title}
        editable={false}
        style={styles.pickerInput}
        {...inputProps}
        value={valueToDisplay}
        multiline={multiline}
        disabled={disable}
      />
      <View style={styles.pickerArrow}>
        <SvgArrowIcon
          height={16}
          width={16}
          direction="down"
          color={'#000'}
          fill="#000"
        />
      </View>
      <TouchableOpacity
        disabled={disable}
        style={styles.dateInputClickableOverlay}
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <ModalPickerView
        title={title}
        visible={modalVisible}
        options={options}
        onCancel={handleCancelModal}
        onSelect={handleSelectOption}
        defaultVaue={inputProps.value}
        multiSelection={multiSelection}
        useTitle={useTitle}
      />
    </View>
  );
};

//--
type DateTimeInputProps = {
  value?: string;
  errorMessage?: string;
  placeholder?: string;
  onChangeText?: (text: string, rawDate?: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  format?: string;
  title?: string;
};

export const DateTimeInput = ({
  onChangeText,
  minimumDate,
  maximumDate,
  mode = 'date',
  format = 'YYYY-MM-DD',
  ...inputProps
}: DateTimeInputProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    let dateString = moment(date).format(format).toString();
    onChangeText?.(dateString, date);
    hideDatePicker();
  };

  return (
    <View>
      <AppInput editable={false} {...inputProps} />
      <TouchableOpacity
        style={styles.dateInputClickableOverlay}
        onPress={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export type AddressViewInputProps = {
  errorMessage?: string;
  placeholder?: string;
  onSelection: (item: Address) => void;
  title: string;
  defaultValue?: Address;
  showAdrressOptinalFields?: Boolean;
  error?: {
    city?: string;
    state?: string;
    address?: string;
    zip?: string;
    formatted_address?: string;
  };
};

export const AddressViewInput = ({
  title,
  onSelection,
  defaultValue,
  showAdrressOptinalFields,
  error,
  ...inputProps
}: AddressViewInputProps) => {
  const [address, setAddress] = useState<Address>({
    formatted_address: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    lat: 0,
    lng: 0,
    ...defaultValue,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const handleSelectOption = (adrs: Address) => {
    setAddress(adrs);
    onSelection(adrs);
    setModalVisible(false);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.pickerView}>
        <AppInput
          title={title}
          editable={false}
          multiline={showAdrressOptinalFields ? true : false}
          style={styles.pickerInput}
          value={
            showAdrressOptinalFields
              ? address.formatted_address
              : address.address
          }
          {...inputProps}
        />
        <View style={styles.pickerArrow}>
          <SvgArrowIcon
            height={16}
            width={16}
            direction="down"
            color={'#000'}
            fill="#000"
          />
        </View>
        <TouchableOpacity
          style={styles.dateInputClickableOverlay}
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <AddressModalPicker
          title={`Search ${title}`}
          visible={modalVisible}
          onCancel={handleCancelModal}
          onSelect={handleSelectOption}
        />
      </View>
      {!showAdrressOptinalFields && (
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.pickerInputHalf}>
              <AppInput
                title={'City'}
                editable={false}
                style={styles.pickerInput}
                value={address.city}
                {...inputProps}
                errorMessage={undefined}
              />
            </View>
            <View style={styles.pickerInputHalf}>
              <AppInput
                title={'State'}
                editable={false}
                style={styles.pickerInput}
                value={address.state}
                {...inputProps}
                errorMessage={undefined}
              />
            </View>
          </View>

          <AppInput
            title={'Zipcode'}
            editable={false}
            style={styles.pickerInput}
            value={address.zip}
            {...inputProps}
            errorMessage={undefined}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateInputClickableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  inputView: {
    flexDirection: 'column',
    width: '100%',
  },
  inputInnerView: {
    // flex: 1,
    flexDirection: 'row',
  },
  inputPrefixView: {
    marginBottom: 24,
    marginRight: -10,
    marginLeft: 10,
    paddingRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#8B959F',
    borderBottomWidth: 1,
  },
  inputPrefix: {
    ...typography.font,
    fontSize: 19,
  },
  inputTitle: {
    ...typography.font,
    paddingHorizontal: 10,
    color: '#000',
  },
  badgeView: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgb(255, 193, 7)',
    marginRight: 4,
  },
  badgeText: {
    paddingHorizontal: 10,
    fontSize: 12,
  },
  inputFloatingTitle: {
    paddingHorizontal: 10,
    color: 'gray',
    fontSize: 18,
  },
  pickerView: {
    flexDirection: 'row',
  },
  pickerInput: {
    marginRight: 30,
  },
  pickerInputHalf: {
    width: '50%',
  },
  pickerArrow: {
    position: 'absolute',
    right: 16,
    marginBottom: 24,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
  },
});
