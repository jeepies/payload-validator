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
});