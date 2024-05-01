import axios from 'axios';
import { host, teacherService } from '../environment/Environment';

export const activateHomeworkByTeacher = async (token, requiredBody) => {
  return await axios.post(`${teacherService}/v1/homeworks`, requiredBody, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Host: host,
    },
  });
};

export const getHomeworkByTeacher = async (token, params) => {
  return await axios.get(`${teacherService}/v1/homeworks`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Host: host,
    },
    params: params,
  });
};
