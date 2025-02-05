import Result from "../result";
import Schema from "../types";
import BaseSchema from "./BaseSchema";

class str implements BaseSchema {
    constructor() {}

    public parse(): Result {
        return {
            success: false
        }
    }
}

export default str;