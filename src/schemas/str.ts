import Result from "../result";
import BaseSchema from "./BaseSchema";

type StringRules = {
    MAX_LEN?: number;
    MIN_LEN?: number;
    // REGEX?: RegExp;
}

const RuleBook = {
    MAX_LEN: (data: string, length: number): boolean => {
        return data.length > length;
    },
    MIN_LEN: (data: string, length: number): boolean => {
        return data.length < length;
    },
    // REGEX: (data: string, regex: RegExp): boolean => {
    //     return regex.test(data);
    // }
}

class str implements BaseSchema {
    rules: StringRules;

    constructor(rules?: StringRules) {
        this.rules = rules ?? {};
    }

    private _parse(data: string): any {
        const results = Object.entries(this.rules).map(([k, v]) => ({ rule: [k], failed: RuleBook[k as keyof StringRules](data, v)}))
        return results.filter(r => r.failed === true).map(f => f.rule);
    }

    public safeParse(data: string): Result {
        const failed = this._parse(data);

        if(failed.length !== 0) return {
            success: false,
            error: failed.flat(),
        }

        return {
            success: true,
            data: data
        }
    }

    public parse(data: string): string {
        const failed = this._parse(data);
        if(failed.length !== 0) throw new Error('string is invalid');
        return data;
    }

    public max(length: number) {
        this.rules.MAX_LEN = length;
        return new str(this.rules)
    } 

    public min(length: number) {
        this.rules.MIN_LEN = length;
        return new str(this.rules)
    }

    public contains(substr: string) {
        
    }

    // public regex(rule: RegExp) {

    // }
}

export default str;