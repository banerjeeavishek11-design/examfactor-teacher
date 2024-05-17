import api from '../../utils/axios.config';
import { b2bStudentService } from '../../environment/Environment';

export const getReportInsights = async (params) => {
  return api.get(`${b2bStudentService}/v1/report-homework-insight`, {
    params: params,
  });
};
