import { b2bStudentService } from '../environment/Environment';
import api from '../utils/axios.config';

export const getSubjectWiseReport = async (params) => {
  return await api.get(`${b2bStudentService}/v1/consolidated-report`, {
    params: params,
  });
};
