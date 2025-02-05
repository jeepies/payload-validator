import Result from "../result";

interface BaseSchema {
    parse: () => Result;
}

export default BaseSchema;