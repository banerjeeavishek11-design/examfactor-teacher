import axios from 'axios';
import { loginService } from '../environment/Environment';

export const loginByUsername = async (requiredBody) => {
  return await axios.post(
    `${loginService}/v1/auth/login`,
    {
      ...requiredBody,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        // Host: host,
      },
    }
  );
};
