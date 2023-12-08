import axios, {AxiosInstance, AxiosRequestHeaders} from 'axios';
import Constants from '../constant/constants';

export const Header_MultiPart_FormData = {
  'Content-Type': 'multipart/form-data',
};

class ApiManager {
  #headers: AxiosRequestHeaders = {Accept: 'application/json'};
  #axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.#axiosInstance = axios.create({baseURL, timeout: 1000 * 60 * 3});
  }
  setToken(token?: string) {
    this.#headers = token
      ? {...this.#headers, Authorization: `Bearer ${token}`}
      : {...this.#headers};
  }
  parseDataAndHeader(data: any, header?: any) {
    const containsFile = Object.values(data).find((v: any) => {
      return typeof v === 'object' && v?.uri;
    });
    if (
      containsFile ||
      (header && header['Content-Type'] === 'multipart/form-data')
    ) {
      let formData = new FormData();
      Object.keys(data).forEach(key => {
        const value = data[key];

        if (typeof value === 'object' && value?.uri) {
          let filename: string = value.name || value.uri.split('/').pop();
          let type = value.type;

          if (!type && filename.includes('.pdf')) {
            type = 'application/pdf';
          } else {
            let match = /\.(\w+)$/.exec(filename);
            type = match ? `image/${match[1]}` : `image`;
          }
          formData.append(key, {uri: value.uri, name: filename, type});
        } else {
          formData.append(key, value);
        }
      });
      return {
        data: formData,
        headers: {
          ...this.#headers,
          ...Header_MultiPart_FormData,
          ...header,
        },
      };
    }
    return {data, headers: {...this.#headers, ...header}};
  }
  #handleError(error: any) {
    if (error.response) {
      console.log(error);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const data = error.response.data;
      throw data?.message || 'Something went wrong. Please try again later.';
    } else {
      throw error.message;
    }
  }
  #handleSuccess(data: any) {
    if (data && data.data && typeof data.status === 'number') {
      return data.data;
    }
    return data;
  }
  get(url: string) {
    console.log('GET : ' + url);
    console.log('headers : ' + JSON.stringify(this.#headers));
    return this.#axiosInstance
      .get(url, {headers: this.#headers})
      .then(this.#handleSuccess)
      .catch(this.#handleError);
  }
  post(url: string, data: any, header?: any) {
    console.log('POST : ' + url);
    console.log('Data : ' + JSON.stringify(data));
    const {data: parsedData, headers} = this.parseDataAndHeader(data, header);
    return this.#axiosInstance
      .post(url, parsedData, {headers})
      .then(this.#handleSuccess)
      .catch(this.#handleError);
  }
  put(url: string, data: any) {
    console.log('PUT : ' + url);
    const {data: parsedData, headers} = this.parseDataAndHeader(data);
    return this.#axiosInstance
      .put(url, parsedData, {headers})
      .then(this.#handleSuccess)
      .catch(this.#handleError);
  }
  patch(url: string, data: any) {
    console.log('PATCH : ' + url);
    const {data: parsedData, headers} = this.parseDataAndHeader(data);
    return this.#axiosInstance
      .patch(url, parsedData, {headers})
      .then(this.#handleSuccess)
      .catch(this.#handleError);
  }
  delete(url: string) {
    console.log('DELETE : ' + url);
    return this.#axiosInstance
      .delete(url, {headers: this.#headers})
      .then(this.#handleSuccess)
      .catch(this.#handleError);
  }
}

export default ApiManager;

const apiManager = new ApiManager(Constants.BASE_URL);

export {apiManager};
