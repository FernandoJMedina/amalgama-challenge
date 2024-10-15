import { LoginRqTO } from '../models/login';

import { API } from '~/config/api';

const RESOURCES = {
  login: '/default/login',
};

async function login(data: LoginRqTO) {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  const response = await API.post(RESOURCES.login, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export const LoginService = {
  login,
};
