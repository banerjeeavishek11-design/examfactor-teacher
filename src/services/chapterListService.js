import api from '../utils/axios.config';
import { masterDataService } from '../environment/Environment';

export const getChaptersBySubjectId = async (subjectId) => {
  return await api.get(`${masterDataService}/v1/subjects/${subjectId}/chapters`);
};

export const getSubjectsBySubjectId = async (subjectId) => {
  return await api.get(`${masterDataService}/v1/subjects/${subjectId}`, {
    params: {
      query: 'mapped_diagnostic_subtopic',
    },
  });
};
