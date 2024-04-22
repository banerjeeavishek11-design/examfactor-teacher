import axios from 'axios';
import { host, teacherService } from '../environment/Environment';

export const activateDiagnosticByTeacher = async (token, requiredBody) => {
  return await axios.post(`${teacherService}/v1/diagnostics`, requiredBody, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Host: host,
    },
  });
};
