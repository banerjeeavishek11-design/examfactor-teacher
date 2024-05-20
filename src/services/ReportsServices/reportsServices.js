import api from '../../utils/axios.config';
import { b2bStudentService } from '../../environment/Environment';

export const getReportInsights = async (params) => {
  return api.get(`${b2bStudentService}/v1/report-homework-insight`, {
    params: params,
  });
};

export const getStudentDetails = async (params) => {
  return api.get(`${b2bStudentService}/v1/b2b/student`, {
    params: params,
  });
};

export const mySubjectInsightByStudentId = async (subjectId, params) => {
  return api.get(`${b2bStudentService}/v1/my-subject-insight/${subjectId}`, {
    params: params,
  });
};

export const mySubjectInsightTimeSpend = async (subjectId, params) => {
  return api.get(`${b2bStudentService}/v1/my-subject-insight/time/spend/${subjectId}`, {
    params: params,
  });
};

export const mySubjectInsightAssessmentDetails = async (subjectId, params) => {
  return api.get(`${b2bStudentService}/v1/my-subject-insight/${subjectId}/assessmentdetails`, {
    params: params,
  });
};

export const mySubjectInsightScores = async (subjectId) => {
  return await api.get(`${b2bStudentService}/v1/my-subject-insight/${subjectId}/chapters?q=st`, {});
};

export const bookMarkedQuestionsList = async (params) => {
  return api.get(`${b2bStudentService}/v1/my-bookmark`, {
    params: params,
  });
};

export const getQuestionAnalysis = async (params) => {
  return api.get(`${b2bStudentService}/v1/b2b-question-analysis-report`, {
    params: params,
  });
};
