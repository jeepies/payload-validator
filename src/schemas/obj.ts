import schemas from ".";
import Result from "../result";
import Schema from "../types";
import BaseSchema from "./BaseSchema";

class obj<T extends Record<string, typeof schemas>> implements BaseSchema {
    schema: Schema<T>

    constructor(schema: Schema<T>) {
        this.schema = schema;
    }

    public parse(): Result {
        return {
            success: false
        }
    }
}

export default obj;