import { teacherService } from '../environment/Environment';
import api from '../utils/axios.config';

export const activateHomeworkByTeacher = async (requiredBody) => {
  return await api.post(`${teacherService}/v1/homeworks`, requiredBody, {});
};

export const getHomeworkByTeacher = async (params) => {
  return await api.get(`${teacherService}/v1/homeworks`, {
    params: params,
  });
};
