import api from '../utils/axios.config';
import { masterDataService, questionnaireService } from '../environment/Environment';

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

export const getQuestionNumberOfChapter = async (requiredBody) => {
  return await api.get(`${questionnaireService}/v1/questions`, {
    params: requiredBody,
  });
};
