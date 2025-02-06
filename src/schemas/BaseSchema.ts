import Result from "../result";

interface BaseSchema {
    parse: (...args: any[]) => any;
    safeParse: (...args: any[]) => Result;
}

export default BaseSchema;