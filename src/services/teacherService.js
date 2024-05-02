import { teacherService } from '../environment/Environment';
import api from '../utils/axios.config';
export const getTeacherDetailsById = async (userName) => {
  return await api.get(`${teacherService}/v1/teachers/${userName}`, {
    params: { query: 'assignedClasses' },
  });
};

export const getUserDetailsByUserId = async (userName) => {
  return await api.get(`${teacherService}/v1/teachers/${userName}`);
};
