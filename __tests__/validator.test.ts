import { beforeEach, describe, expect, test } from "@jest/globals";

import validator from '../src/payload-validator';

describe('🧪 Validator Tests', () => {
    describe('Primitive: str', () => {
        describe('String Length Validation', () => {
            const username = new validator.str()
                .min(4).max(8);

            test('should fail when given a string that exceeds the max length', () => {
                const result = username.safeParse('superlongusername');
                expect(result).toEqual({
                    success: false,
                    error: [
                        "MAX_LEN"
                    ]
                })
            })

            test('should fail when given a string that deceeds the max length', () => {
                const result = username.safeParse('jay');
                expect(result).toEqual({
                    success: false,
                    error: [
                        "MIN_LEN"
                    ]
                })
            })

            test('should pass on a string that follows all of the rules', () => {
                const result = username.safeParse('user1');
                expect(result).toEqual({
                    success: true,
                    data: 'user1'
                })
            })
        });
    });
    describe('Primitive: int', () => {
        describe('Integer Value Validation', () => {
            describe('GTE and LTE', () => {
                const age = new validator.int().gte(18).lte(100);
                test('should fail when given an int that exceeds the max value', () => {
                    const result = age.safeParse(101);
                    expect(result).toEqual({
                        success: false,
                        error: [
                            "LESS_THAN_EQUALS"
                        ]
                    })
                })

                test('should fail when given an int that deceeds the max value', () => {
                    const result = age.safeParse(4);
                    expect(result).toEqual({
                        success: false,
                        error: [
                            "GREATER_THAN_EQUALS"
                        ]
                    })
                })

                test('should pass on a number that follows all of the rules', () => {
                    const result = age.safeParse(18);
                    expect(result).toEqual({
                        success: true,
                        data: 18
                    })
                })
            })
            describe('GT and LT', () => {
                const daysInYear = new validator.int().gt(0).lt(366);

                test('should fail when given an int that exceeds the max value', () => {
                    const result = daysInYear.safeParse(730);
                    expect(result).toEqual({
                        success: false,
                        error: [
                            "LESS_THAN"
                        ]
                    })
                })

                test('should fail when given an int that deceeds the max value', () => {
                    const result = daysInYear.safeParse(-1);
                    expect(result).toEqual({
                        success: false,
                        error: [
                            "GREATER_THAN"
                        ]
                    })
                })

                test('should pass on a number that follows all of the rules', () => {
                    const result = daysInYear.safeParse(52);
                    expect(result).toEqual({
                        success: true,
                        data: 52
                    })
                })
            });
        });
    });
});