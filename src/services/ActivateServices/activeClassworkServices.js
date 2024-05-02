import { teacherService } from '../../environment/Environment';
import api from '../../utils/axios.config';

export const activateClassworkByTeacher = async (requiredBody) => {
  return await api.post(`${teacherService}/v1/classworks`, requiredBody, {});
};

export const getClasswoksByTeacher = async (params) => {
  return await api.get(`${teacherService}/v1/classworks`, {
    params: params,
  });
};
