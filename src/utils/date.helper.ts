import moment from 'moment';

enum DateFormats {
  API = 'yyyy-MM-DD',
  DISPLAY = 'MM-DD-yyyy',
  DISPLAY_MASK_YEAR = 'MM-DD-****',
}

export const APP_DATE_FORMATS = {Api: 'yyyy-MM-DD', Display: 'MM-DD-yyyy'};

const parseToFormat = (date?: Date | string, format?: DateFormats) => {
  if (!date) return '';
  return moment(date).format(format).toString();
};

export const parseDateToApiFormat = (date?: Date | string) => {
  return parseToFormat(date, DateFormats.API);
};

export const parseDateToDisplayFormat = (date?: Date | string) => {
  return parseToFormat(date, DateFormats.DISPLAY);
};

export const parseDateToDisplayFormatAndMaskYear = (date?: Date | string) => {
  return parseToFormat(date, DateFormats.DISPLAY_MASK_YEAR);
};
