import axios from 'axios';
import { host, assessmentService } from '../environment/Environment';

export const getAssessmentDetails = async (token, params) => {
  return await axios.get(`${assessmentService}/v1/assessments`, {
    params: params,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Host: host,
    },
  });
};
