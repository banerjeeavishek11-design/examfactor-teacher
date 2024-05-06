import api from '../../utils/axios.config';
import { b2bStudentService } from '../../environment/Environment';

export const getStudentDiagnosticReports = async (params) => {
  return api.get(`${b2bStudentService}/v1/student-diagnostic-summary`, {
    params: params,
  });
};

export const getStudentHomeworkReports = async (params) => {
  return api.get(`${b2bStudentService}/v1/student-homework-summary`, {
    params: params,
  });
};
