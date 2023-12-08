import AsyncStorage from '@react-native-async-storage/async-storage';
import {Callback} from '@react-native-async-storage/async-storage/lib/typescript/types';

const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key + '@gurp_local', jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key + '@gurp_local');
  } catch (e) {
    return null;
  }
};

const getObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key + '@gurp_local');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};

const removeData = async (key: any, cb?: Callback) => {
  try {
    await AsyncStorage.removeItem(key + '@gurp_local', cb);
  } catch (e) {}
};

const saveUserDetails = async (data: object) => {
  return storeData('user.details', data);
};

const getUserDetails = async () => {
  return getObject('user.details');
};

const removeUserDetails = async (cb?: Callback) => {
  return removeData('user.details', cb);
};

export {
  saveUserDetails,
  getUserDetails,
  removeUserDetails,
  storeData,
  getData,
  getObject,
};
