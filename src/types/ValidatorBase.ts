import Result from './Result';

interface ValidatorBase {
  parse: (...args: any[]) => any;
  safeParse: (...args: any[]) => Result;
}

export default ValidatorBase;
