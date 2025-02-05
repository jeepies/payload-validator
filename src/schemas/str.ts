import Result from "../result";
import BaseSchema from "./BaseSchema";

type StringRules = {
    MAX_LEN?: number;
    MIN_LEN?: number;
}

const RuleBook = {
    MAX_LEN: (data: string, length: number): boolean => {
        return data.length > length;
    },
    MIN_LEN: (data: string, length: number): boolean => {
        return data.length < length;
    }
}

class str implements BaseSchema {
    rules: StringRules;

    constructor(rules?: StringRules) {
        this.rules = rules ?? {};
    } 

    public parse(data: string): Result {
        const results = Object.entries(this.rules).map(([k, v]) => ({ rule: [k], failed: RuleBook[k as keyof StringRules](data, v)}))
        const failed = results.filter(r => r.failed === true).map(f => f.rule);

        if(failed.length !== 0) return {
            success: false,
            error: failed.flat(),
        }

        return {
            success: true,
            data: data
        }
    }

    public max(length: number) {
        this.rules.MAX_LEN = length;
        return new str(this.rules)
    } 

    public min(length: number) {
        this.rules.MIN_LEN = length;
        return new str(this.rules)
    }
}

export default str;