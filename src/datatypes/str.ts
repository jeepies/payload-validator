import ValidatorBase from '../types/ValidatorBase';
import Rule from '../types/Rule';
import Result from '../types/Result';

type StrRules = {
  EQUALS?: Rule;
  MIN?: Rule;
  MAX?: Rule;
  INCLUDES?: Rule;
  LENGTH?: Rule;
  STARTS_WITH?: Rule;
  ENDS_WITH?: Rule;
  REGEX?: Rule;
  IS_EMAIL?: Rule;
  IS_IP?: Rule;
};

const RuleBook = {
  EQUALS: (base: string, comparator: string): boolean => {
    return base === comparator;
  },
  MIN: (base: string, comparator: string): Boolean => {
    // Not fond of this. Find a way to make it possible without casting.
    return base.length > +comparator;
  },
  MAX: (base: string, comparator: string): Boolean => {
    return base.length < +comparator;
  },
  INCLUDES: (base: string, comparator: string): Boolean => {
    return base.includes(comparator);
  },
  LENGTH: (base: string, comparator: string): Boolean => {
    return base.length === +comparator;
  },
  STARTS_WITH: (base: string, comparator: string): Boolean => {
    return base.startsWith(comparator);
  },
  ENDS_WITH: (base: string, comparator: string): Boolean => {
    return base.endsWith(comparator);
  },
  REGEX: (base: string, regex: string): Boolean => {
    const regExp = new RegExp(regex);
    return regExp.test(base);
  },
  IS_EMAIL: (base: string, regex: string): Boolean => {
    const regExp = new RegExp('[^s@]+@[^s@]+.[^s@]+');
    return regExp.test(base);
  },
  IS_IP: (base: string, regex: string): Boolean => {
    const regExp = new RegExp('(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}');
    return regExp.test(base);
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
      error_message: v.error_message,
    }));
    return results.filter((r) => r.failed === true).map((f) => f.error_message);
  }

  public parse(data: string): string {
    const failed = this._parse(data);
    if (failed.length !== 0) throw new Error('str is invalid');
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

  public max(comparator: number, overload?: { error_message?: string }) {
    this.rules.MAX = {
      value: String(comparator),
      error_message: overload?.error_message ?? `Failed on MAX`,
    };
    return new str(this.rules);
  }

  public includes(comparator: string, overload?: { error_message?: string }) {
    this.rules.INCLUDES = {
      value: String(comparator),
      error_message: overload?.error_message ?? `Failed on INCLUDES`,
    };
    return new str(this.rules);
  }

  public length(comparator: number, overload?: { error_message?: string }) {
    this.rules.LENGTH = {
      value: String(comparator),
      error_message: overload?.error_message ?? `Failed on LENGTH`,
    };
    return new str(this.rules);
  }

  public starts_with(comparator: string, overload?: { error_message?: string }) {
    this.rules.STARTS_WITH = {
      value: comparator,
      error_message: overload?.error_message ?? `Failed on STARTS_WITH`,
    };
    return new str(this.rules);
  }

  public ends_with(comparator: string, overload?: { error_message?: string }) {
    this.rules.ENDS_WITH = {
      value: comparator,
      error_message: overload?.error_message ?? `Failed on ENDS_WITH`,
    };
    return new str(this.rules);
  }

  public regex(comparator: string, overload?: { error_message?: string }) {
    this.rules.REGEX = {
      value: comparator,
      error_message: overload?.error_message ?? `Failed on REGEX`,
    };
    return new str(this.rules);
  }

  public email(overload?: { error_message?: string }) {
    this.rules.IS_EMAIL = {
      value: '',
      error_message: overload?.error_message ?? `Failed on EMAIL`,
    };
    return new str(this.rules);
  }

  public ip(overload?: { error_message?: string }) {
    this.rules.IS_IP = {
      value: '',
      error_message: overload?.error_message ?? `Failed on IP`,
    };
    return new str(this.rules);
  }
}

export default str;
