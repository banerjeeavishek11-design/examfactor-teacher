import axios from 'axios';
import { host, b2bStudentService } from '../environment/Environment';

export const getSubjectWiseReport = async (token, params) => {
  return await axios.get(`${b2bStudentService}/v1/consolidated-report`, {
    params: params,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Host: host,
    },
  });
};
