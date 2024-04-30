import axios from 'axios';
import { host, teacherService } from '../../environment/Environment';

export const activateClassworkByTeacher = async (token, requiredBody) => {
  return await axios.post(`${teacherService}/v1/classworks`, requiredBody, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Host: host,
    },
  });
};

export const getClasswoksByTeacher = async (token, params) => {
  return await axios.get(`${teacherService}/v1/classworks`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Host: host,
    },
    params: params,
  });
};
