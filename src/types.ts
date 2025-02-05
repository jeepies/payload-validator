import schemas from './schemas'

type Schema <T extends Record<string, typeof schemas>> = T;
export default Schema;