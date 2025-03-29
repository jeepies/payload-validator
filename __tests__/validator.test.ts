import { describe, expect, test } from '@jest/globals';

import validator from '../src/payload-validator';

describe('🧪 Validator Tests', () => {
  describe('Primitives', () => {
    describe('Integer', () => {
      describe('Equals', () => {
        const bankPink = new validator.int().equals(1337);

        test('should fail when given an integer that does not equal the bank pin', () => {
          const result = bankPink.safeParse(1234);
          expect(result).toEqual({
            error: ['Failed on EQUALS'],
            success: false,
          });
        });

        test('should pass when given the correct bank pin', () => {
          const result = bankPink.safeParse(1337);
          expect(result).toEqual({
            data: 1337,
            success: true,
          });
        });
      });

      describe('GTE', () => {
        const isAboveOrEqualToo18 = new validator.int().gte(18);

        test('should fail when given an integer less than 18', () => {
          const result = isAboveOrEqualToo18.safeParse(6);
          expect(result).toEqual({
            error: ['Failed on GTE'],
            success: false,
          });
        });

        test('should pass when given 18', () => {
          const result = isAboveOrEqualToo18.safeParse(18);
          expect(result).toEqual({
            data: 18,
            success: true,
          });
        });

        test('should pass when given an integer over 18', () => {
          const result = isAboveOrEqualToo18.safeParse(24);
          expect(result).toEqual({
            data: 24,
            success: true,
          });
        });
      });

      describe('LTE', () => {
        const checkFor100orLess = new validator.int().lte(100);

        test('should fail when given an integer greater than 100', () => {
          const result = checkFor100orLess.safeParse(101);
          expect(result).toEqual({
            error: ['Failed on LTE'],
            success: false,
          });
        });

        test('should pass when given 100', () => {
          const result = checkFor100orLess.safeParse(100);
          expect(result).toEqual({
            data: 100,
            success: true,
          });
        });

        test('should pass when given an integer less than 100', () => {
          const result = checkFor100orLess.safeParse(24);
          expect(result).toEqual({
            data: 24,
            success: true,
          });
        });
      });

      describe('GTE and LTE - The Club', () => {
        const canGetIntoClub = new validator.int().lte(24).gte(18);

        test('should throw anybody out that is over 24', () => {
          const result = canGetIntoClub.safeParse(42);
          expect(result).toEqual({
            error: ['Failed on LTE'],
            success: false,
          });
        });

        test('should throw anybody out that is under 18', () => {
          const result = canGetIntoClub.safeParse(12);
          expect(result).toEqual({
            error: ['Failed on GTE'],
            success: false,
          });
        });

        test('should let anybody in that is in the age range', () => {
          const result = canGetIntoClub.safeParse(21);
          expect(result).toEqual({
            data: 21,
            success: true,
          });
        });
      });

      describe('GT', () => {
        const isAbove21 = new validator.int().gt(21);

        test('should fail when given an integer less than 21', () => {
          const result = isAbove21.safeParse(20);
          expect(result).toEqual({
            error: ['Failed on GT'],
            success: false,
          });
        });

        test('should fail when given 21', () => {
          const result = isAbove21.safeParse(21);
          expect(result).toEqual({
            error: ['Failed on GT'],
            success: false,
          });
        });

        test('should pass when given an integer over 21', () => {
          const result = isAbove21.safeParse(24);
          expect(result).toEqual({
            data: 24,
            success: true,
          });
        });
      });

      describe('LT', () => {
        const isBelow21 = new validator.int().lt(21);

        test('should fail when given an integer above or equal too 21', () => {
          const result = isBelow21.safeParse(500);
          expect(result).toEqual({
            error: ['Failed on LT'],
            success: false,
          });
        });

        test('should fail when given 21', () => {
          const result = isBelow21.safeParse(21);
          expect(result).toEqual({
            error: ['Failed on LT'],
            success: false,
          });
        });

        test('should pass when given an integer under 21', () => {
          const result = isBelow21.safeParse(12);
          expect(result).toEqual({
            data: 12,
            success: true,
          });
        });
      });

      describe('NEGATIVE', () => {
        const freezerTemp = new validator.int().negative();

        test('should fail when given an integer above 0', () => {
          const result = freezerTemp.safeParse(1);
          expect(result).toEqual({
            error: ['Failed on NEGATIVE'],
            success: false,
          });
        });

        test('should pass when given an integer below 0', () => {
          const result = freezerTemp.safeParse(-18);
          expect(result).toEqual({
            data: -18,
            success: true,
          });
        });
      });

      describe('POSITIVE', () => {
        const jeepiesIQ = new validator.int().positive();

        test('should fail when given an integer below 0', () => {
          const result = jeepiesIQ.safeParse(-17);
          expect(result).toEqual({
            error: ['Failed on POSITIVE'],
            success: false,
          });
        });

        test('should pass when given an integer below 0', () => {
          const result = jeepiesIQ.safeParse(7);
          expect(result).toEqual({
            data: 7,
            success: true,
          });
        });
      });

      describe('FINITE', () => {
        const isFinite = new validator.int().finite();

        test('should fail when given an infinite number', () => {
          const result = isFinite.safeParse(Infinity);
          expect(result).toEqual({
            error: ['Failed on FINITE'],
            success: false,
          })
        })

        test('should fail when given an infinite number', () => {
          const result = isFinite.safeParse(7);
          expect(result).toEqual({
            data: 7,
            success: true,
          })
        })
      });
    });

    describe('String', () => {
      describe('Equals', () => {
        const username = new validator.str().equals('jeepies');

        test('should fail when not equal', () => {
          const result = username.safeParse('snook');
          expect(result).toEqual({
            error: ['Failed on EQUALS'],
            success: false,
          });
        });

        test('should pass when equal', () => {
          const result = username.safeParse('jeepies');
          expect(result).toEqual({
            data: 'jeepies',
            success: true,
          });
        });
      });

      describe('MIN', () => {
        const password = new validator.str().min(4);

        test('should fail when given a string below the minimum length', () => {
          const result = password.safeParse('pwd');
          expect(result).toEqual({
            error: ['Failed on MIN'],
            success: false,
          });
        });

        test('should fail when given a string equal too the minimum length', () => {
          const result = password.safeParse('pass');
          expect(result).toEqual({
            error: ['Failed on MIN'],
            success: false,
          });
        });

        test('should pass when given a string above the minimum length', () => {
          const result = password.safeParse('password');
          expect(result).toEqual({
            data: 'password',
            success: true,
          });
        });
      });

      describe('MAX', () => {
        const username = new validator.str().max(12);

        test('should fail when given a string above the maximum length', () => {
          const result = username.safeParse('iamasupercooluser');
          expect(result).toEqual({
            error: ['Failed on MAX'],
            success: false,
          });
        });

        test('should fail when given a string equal too the maximum length', () => {
          const result = username.safeParse('iamacooluser');
          expect(result).toEqual({
            error: ['Failed on MAX'],
            success: false,
          });
        });

        test('should pass when given a string above the minimum length', () => {
          const result = username.safeParse('jeepies');
          expect(result).toEqual({
            data: 'jeepies',
            success: true,
          });
        });
      });

      describe('INCLUDES', () => {
        const token = new validator.str().includes('TOKEN_');

        test('should fail when given a string that doesnt include the needle', () => {
          const result = token.safeParse('cm8uf8o2j000008jl19g3c1vv');
          expect(result).toEqual({
            error: ['Failed on INCLUDES'],
            success: false,
          });
        });

        test('should pass when given a string that contains the needle', () => {
          const result = token.safeParse('TOKEN_cm8uf9ri4000108jl16v4e836');
          expect(result).toEqual({
            data: 'TOKEN_cm8uf9ri4000108jl16v4e836',
            success: true,
          });
        });
      });

      describe('LENGTH', () => {
        const oneTimePassword = new validator.str().length(5);

        test('should fail when given a string shorter than required', () => {
          const result = oneTimePassword.safeParse('pass');
          expect(result).toEqual({
            error: ['Failed on LENGTH'],
            success: false,
          });
        });

        test('should fail when given a string longer than required', () => {
          const result = oneTimePassword.safeParse('password');
          expect(result).toEqual({
            error: ['Failed on LENGTH'],
            success: false,
          });
        });

        test('should pass when given a string of the required length', () => {
          const result = oneTimePassword.safeParse('fives');
          expect(result).toEqual({
            data: 'fives',
            success: true,
          });
        });
      });

      describe('STARTS_WITH', () => {
        const nameStartsWith = new validator.str().starts_with('Jay');

        test('should fail when given a string that does not start with the needle', () => {
          const result = nameStartsWith.safeParse('J Davis');
          expect(result).toEqual({
            error: ['Failed on STARTS_WITH'],
            success: false,
          });
        });

        test('should pass when given a string that does start with the needle', () => {
          const result = nameStartsWith.safeParse('Jay Davis');
          expect(result).toEqual({
            data: 'Jay Davis',
            success: true,
          });
        });
      });

      describe('ENDS_WITH', () => {
        const emailEndsWith = new validator.str().ends_with('@jeepies.codes');

        test('should fail when given a string that does not end with the needle', () => {
          const result = emailEndsWith.safeParse('steve@github.com');
          expect(result).toEqual({
            error: ['Failed on ENDS_WITH'],
            success: false,
          });
        });

        test('should pass when given a string that does end with the needle', () => {
          const result = emailEndsWith.safeParse('jay@jeepies.codes');
          expect(result).toEqual({
            data: 'jay@jeepies.codes',
            success: true,
          });
        });
      });

      describe('REGEX', () => {
        const isValidUUID = new validator.str().regex("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}");
        
        test('should fail when given a string that does not match regex', () => {
          const result = isValidUUID.safeParse('jeepies');
          expect(result).toEqual({
            error: ['Failed on REGEX'],
            success: false,
          })
        })

        test('should pass when given a string that does match regex', () => {
          const result = isValidUUID.safeParse('2b71e220-1979-4a29-993d-025da1671fe2');
          expect(result).toEqual({
            data: "2b71e220-1979-4a29-993d-025da1671fe2",
            success: true,
          })
        })
      });
    });
  });

  describe('Custom error message', () => {
    const username = new validator.str().equals('jeepies', { error_message: 'Incorrect username!' });

    test('should fail and display custom error message', () => {
      const result = username.safeParse('jay');
      expect(result).toEqual({
        error: ['Incorrect username!'],
        success: false,
      });
    });
  });
});
