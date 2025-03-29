import ValidatorBase from "../types/ValidatorBase";
import Rule from "../types/Rule";
import Result from "../types/Result";

type StrRules = {
  EQUALS?: Rule;
  MIN?: Rule;
};

const RuleBook = {
  EQUALS: (base: string, comparator: string): boolean => {
    return base === comparator;
  },
  MIN: (base: string, comparator: string): Boolean => {
    // Not fond of this. Find a way to make it possible without casting.
    return base.length > +(comparator);
  },
  IMIN: (base: string, comparator: string): Boolean => {
    return base.length >= +(comparator);
  },
};

class str implements ValidatorBase {
  rules: StrRules;

  constructor(rules?: StrRules) {
    this.rules = rules ?? {};
  }

  protected _parse(data: string) {
    const results = Object.entries(this.rules).map(([k, v]) => ({
      rule: [k],
      failed: RuleBook[k as keyof StrRules](data, v.value) === false,
    }));
    return results.filter((r) => r.failed === true).map((f) => f.rule);
  }

  public parse(data: string): string {
    const failed = this._parse(data);
    if (failed.length !== 0) throw new Error("str is invalid");
    return data;
  }

  public safeParse(data: string): Result {
    const failed = this._parse(data);

    if (failed.length !== 0)
      return {
        success: false,
        error: failed.flat(),
      };

    return {
      success: true,
      data: data,
    };
  }

  public equals(comparator: string, overload?: { error_message?: string }) {
    this.rules.EQUALS = {
        value: comparator,
        error_message: overload?.error_message ?? `Failed on EQUALS`,
      };
      return new str(this.rules);
  }

  public min(comparator: number, overload?: { error_message?: string }) {
    this.rules.MIN = {
      value: String(comparator),
      error_message: overload?.error_message ?? `Failed on MIN`,
    };
    return new str(this.rules);
  }
}

export default str;