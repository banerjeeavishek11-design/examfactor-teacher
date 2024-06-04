import api from '../../utils/axios.config';
import { teacherService } from '../../environment/Environment';

export const rateUsService = async (ratings) => {
  return await api.post(`${teacherService}/v1/ratings`, ratings);
};

export const getRateUs = async () => {
  return await api.get(`${teacherService}/v1/ratings`);
};
