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

export const editTeacherDetails = async (requestBody, id) => {
  return await api.put(`${teacherService}/v1/teachers/${id}`, requestBody);
};

export const uploadPicture = async (file) => {
  return await api.patch(`${teacherService}/v1/teachers/pic`, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
