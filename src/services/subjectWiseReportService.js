import { b2bStudentService } from '../environment/Environment';
import api from '../utils/axios.config';

export const getSubjectWiseReport = async (params) => {
  return await api.get(`${b2bStudentService}/v1/consolidated-report`, {
    params: params,
  });
};
export const get7daysScoreForChart = async (params) => {
  return await api.get(`${b2bStudentService}/v1/consolidated-report/7days-score`, {
    params: params,
  });
};
export const get7daysStudyTimeForChart = async (params) => {
  return await api.get(`${b2bStudentService}/v1/consolidated-report/7days-study-time`, {
    params: params,
  });
};
