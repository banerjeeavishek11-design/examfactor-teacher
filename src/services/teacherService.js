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

export const setReminderForHomework = async (requestBody) => {
  return await api.post(`${teacherService}/v1/homeworks/reminders`, requestBody);
};
