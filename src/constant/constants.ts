export const GoogleApiKey = '';

const Constants = {
  BASE_URL: 'http://127.0.0.1:8000',
};

export const getAssetUrl = (name?: string, thumb: boolean = false) => {
  return name
    ? {
        uri: encodeURI(
          `${Constants.BASE_URL}/admin/assets/img/${
            thumb ? 'thumb/' : ''
          }${name}`,
        ),
      }
    : undefined;
};

export const getDriverImageUrl = (image: string) =>
  `${Constants.BASE_URL}/images/driver/${image}`;

export const getTruckImageUrl = (image: string) =>
  `${Constants.BASE_URL}/images/truck/${image}`;

export const getTruckInspectionImageUrl = (image: string) =>
  `${Constants.BASE_URL}/images/inspection/${image}`;

export const getTrailerImageUrl = (image: string) =>
  `${Constants.BASE_URL}/images/trailer/${image}`;

export const getTrailerInspectionImageUrl = (image: string) =>
  `${Constants.BASE_URL}/images/inspection/${image}`;

export const getOwnerImageUrl = (image: string) =>
  `${Constants.BASE_URL}/images/owner/${image}`;

export const getPermitImageUrl = (image: string) =>
  `${Constants.BASE_URL}/images/permit/${image}`;

export const getDocumentImageUrl = (image: string) =>
  `${Constants.BASE_URL}/api-documents/${image}`;

export const getCompanyImageUrl = (image: string) =>
  `${Constants.BASE_URL}/images/company/${image}`;

export default Constants;
