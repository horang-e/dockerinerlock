import axios from 'axios';
import { setCookie, getCookie, deleteCookie } from '@utils/Cookie';



export const getAPIHost = () => {

  return '';

};

export const restApi = axios.create({
  baseURL: getAPIHost(),
});




restApi.interceptors.request.use((config) => {
  const access_token = getCookie('access_token');
  config.headers.authorization = `Bearer ${access_token}`;
  return config;
});

restApi.interceptors.response.use(
  async (response) => {
    const { config } = response;
    return response;
  },
  async (error) => {
    console.log(error, '^^***');
    const originalRequest = error.config;

    const user = getCookie('user');
    const autoLogin = getCookie('autoLogin');
    if (error.response.status === 401 && error.config && user) {
      const refresh_token = getCookie('refresh_token');
      return await restApi
        .get(`/auth/token?refresh_token=${refresh_token}`)
        .then((res) => {
          setCookie('access_token', res.data.payload.access_token, (res.data.payload.exp - Date.now()) * 2);
          originalRequest.headers.Authorization = `${res.data.payload.access_token}`;
          return axios(originalRequest);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            deleteCookie('user');
            deleteCookie('autoLogin');
            deleteCookie('refresh_token');
            deleteCookie('access_token');
          } else {
          
          }
        });
    }
    throw error;
  }
);

export default {
  getAPIHost,
  restApi,
};
