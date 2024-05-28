import api from '../../utils/axios.config';
import { faqService } from '../../environment/Environment';

export const getSupportFAQDetails = async (params) => {
  return api.get(`${faqService}/v1/profile-support/frontend/faq`, {
    params: params,
  });
};
