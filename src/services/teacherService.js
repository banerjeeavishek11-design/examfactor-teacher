import axios from 'axios';
import { host, teacherService } from '../environment/Environment';
export const getTeacherDetailsById = async (token, userName) => {
  return await axios.get(`${teacherService}/v1/teachers/${userName}`, {
    params: { query: 'assignedClasses' },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Host: host,
    },
  });
};
