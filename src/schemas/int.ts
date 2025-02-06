import Result from "../result";
import BaseSchema from "./BaseSchema";

type IntRules = {
    EQUALS?: number;
    GREATER_THAN?: number;
    LESS_THAN?: number;
    GREATER_THAN_EQUALS?: number;
    LESS_THAN_EQUALS?: number;
}

const RuleBook = {
    EQUALS: (data: number, comparator: number): boolean => {
        return data === comparator;
    },
    GREATER_THAN: (data: number, comparator: number): boolean => {
        return data < comparator;
    },
    LESS_THAN: (data: number, comparator: number): boolean => {
        return data > comparator;
    },
    GREATER_THAN_EQUALS: (data: number, comparator: number): boolean => {
        return data <= comparator;
    },
    LESS_THAN_EQUALS: (data: number, comparator: number): boolean => {
        return data >= comparator;
    },
}

class int implements BaseSchema {
    rules: IntRules;

    constructor(rules?: IntRules) {
        this.rules = rules ?? {};
    }

    private _parse(data: number): any {
        const results = Object.entries(this.rules).map(([k, v]) => ({ rule: [k], failed: RuleBook[k as keyof IntRules](data, v)}))
        return results.filter(r => r.failed === true).map(f => f.rule);
    }

    public safeParse(data: number): Result {
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

    public parse(data: number): number {
        const failed = this._parse(data);
        if(failed.length !== 0) throw new Error('int is invalid');
        return data;
    }

    public equals(int2: number) {
        this.rules.EQUALS = int2;
        return new int(this.rules);
    }

    public gt(int2: number) {
        this.rules.GREATER_THAN = int2;
        return new int(this.rules)
    }

    public lt(int2: number) {
        this.rules.LESS_THAN = int2;
        return new int(this.rules)
    }

    public gte(int2: number) {
        this.rules.GREATER_THAN_EQUALS = int2;
        return new int(this.rules)
    }

    public lte(int2: number) {
        this.rules.LESS_THAN_EQUALS = int2;
        return new int(this.rules)
    }
}

export default int;