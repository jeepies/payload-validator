import ValidatorBase from "../types/ValidatorBase";
import Rule from "../types/Rule";
import Result from "../types/Result";

type IntRules = {
  EQUALS?: Rule;
  GTE?: Rule;
  LTE?: Rule;
  GT?: Rule;
  LT?: Rule;
};

const RuleBook = {
  EQUALS: (base: number, comparator: number): boolean => {
    return base === comparator;
  },
  GTE: (base: number, comparator: number): boolean => {
    return base >= comparator;
  },
  LTE: (base: number, comparator: number): boolean => {
    return base <= comparator;
  },
  GT: (base: number, comparator: number): boolean => {
    return base > comparator;
  },
  LT: (base: number, comparator: number): boolean => {
    return base < comparator;
  },
};

class int implements ValidatorBase {
  rules: IntRules;

  constructor(rules?: IntRules) {
    this.rules = rules ?? {};
  }

  protected _parse(data: number) {
    const results = Object.entries(this.rules).map(([k, v]) => ({
      rule: [k],
      failed: RuleBook[k as keyof IntRules](data, v.value) === false,
    }));
    return results.filter((r) => r.failed === true).map((f) => f.rule);
  }

  public parse(data: number): number {
    const failed = this._parse(data);
    if (failed.length !== 0) throw new Error("int is invalid");
    return data;
  }

  public safeParse(data: number): Result {
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

  public equals(comparator: number, overload?: { error_message?: string }) {
    this.rules.EQUALS = {
      value: comparator,
      error_message: overload?.error_message ?? `Failed on equals`,
    };
    return new int(this.rules);
  }

  public gte(comparator: number, overload?: { error_message?: string }) {
    this.rules.GTE = {
      value: comparator,
      error_message: overload?.error_message ?? `Failed on GTE`,
    };
    return new int(this.rules);
  }

  public lte(comparator: number, overload?: { error_message?: string }) {
    this.rules.LTE = {
      value: comparator,
      error_message: overload?.error_message ?? `Failed on LTE`,
    };
    return new int(this.rules);
  }

  public gt(comparator: number, overload?: { error_message?: string }) {
    this.rules.GT = {
      value: comparator,
      error_message: overload?.error_message ?? `Failed on GT`,
    };
    return new int(this.rules);
  }

  public lt(comparator: number, overload?: { error_message?: string }) {
    this.rules.LT = {
      value: comparator,
      error_message: overload?.error_message ?? `Failed on LT`,
    };
    return new int(this.rules);
  }
}

export default int;
