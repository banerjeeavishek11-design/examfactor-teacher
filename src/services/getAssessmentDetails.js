import { assessmentService } from '../environment/Environment';
import api from '../utils/axios.config';

export const getAssessmentDetails = async (params) => {
  return await api.get(`${assessmentService}/v1/assessments`, {
    params: params,
  });
};
