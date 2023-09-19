import axios from 'axios';




export const getAPIHost = () => {

  return 'http://3.25.192.143:8081';

};

export const restApi = axios.create({
  baseURL: getAPIHost(),
});



axios.defaults.withCredentials = true;
restApi.interceptors.request.use((config) => {

  return config;
});

restApi.interceptors.response.use(
  async (response) => {
    const { config } = response;
    return response;
  },
  async (error) => {
    console.log(error, '^^***');


    throw error;
  }
);

export default {
  getAPIHost,
  restApi,
};
