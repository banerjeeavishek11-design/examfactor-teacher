import api from '../../utils/axios.config';
import { b2bStudentService, faqService } from '../../environment/Environment';

export const getSupportFAQDetails = async (params) => {
  return api.get(`${faqService}/v1/profile-support/frontend/faq`, {
    params: params,
  });
};

export const ratingApp = async (ratings) => {
  return await api.post(`${b2bStudentService}/v1/ratings`, ratings);
};
