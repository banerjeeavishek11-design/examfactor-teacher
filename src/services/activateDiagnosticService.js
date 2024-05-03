import { teacherService } from '../environment/Environment';
import api from '../utils/axios.config';

export const activateDiagnosticByTeacher = async (requiredBody) => {
  return await api.post(`${teacherService}/v1/diagnostics`, requiredBody, {});
};

export const getDiagnosticsByTeacher = async (params) => {
  return await api.get(`${teacherService}/v1/diagnostics`, {
    params: params,
  });
};
