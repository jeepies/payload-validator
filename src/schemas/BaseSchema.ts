import Result from "../result";

interface BaseSchema {
    parse: (...args: any[]) => Result;
}

export default BaseSchema;