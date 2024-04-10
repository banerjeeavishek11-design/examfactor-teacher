import dev from '../../env.dev.json';
import current from '../../env.current.json';
const env = current.current === 'dev' ? dev : null;
export const host = env.HOST;
export const rootApiUrl = env.ROOT_API_URL;
export const loginService = `${rootApiUrl}/auth-service`;
