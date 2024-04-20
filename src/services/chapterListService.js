import axios from 'axios';
import { host, masterDataService } from '../environment/Environment';

export const getChaptersBySubjectId = async (token, subjectId) => {
  return await axios.get(`${masterDataService}/v1/subjects/${subjectId}/chapters`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Host: host,
    },
  });
};
