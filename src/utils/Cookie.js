import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, exp) => {
  cookies.set(name, value, {
    path: '/',
    expires: new Date(Date.now() + exp ),
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const deleteCookie = (name) => {
  return cookies.remove(name, { path: '/' });
};

