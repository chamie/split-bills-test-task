import * as Utils from './utils';

type TestType = {
    num: number,
    str: string,
    obj: {
        num: number,
        str: string,
    }
}

const getDefaultArray = (): TestType[] => [
    {
        num: 4,
        str: "4",
        obj: {
            num: 4,
            str: "4"
        }
    },
    {
        num: 1,
        str: "4",
        obj: {
            num: 4,
            str: "4"
        }
    },
    {
        num: 4,
        str: "1",
        obj: {
            num: 4,
            str: "4"
        }
    },
    {
        num: 4,
        str: "4",
        obj: {
            num: 1,
            str: "4"
        }
    },
    {
        num: 4,
        str: "4",
        obj: {
            num: 4,
            str: "1"
        }
    },
];

describe("sortBy function", () => {

    describe('sort by field name', () => {
        it('number', () => {
            // Arrange
            const testArray = getDefaultArray();

            // Act
            const sortedArray = Utils.sortBy(testArray, 'num');

            // Assert
            expect(sortedArray).not.toBe(testArray);
            expect(sortedArray[0]).toEqual({
                num: 1,
                str: "4",
                obj: {
                    num: 4,
                    str: "4"
                }
            });
        });

        it('string', () => {
            // Arrange
            const testArray = getDefaultArray();

            // Act
            const sortedArray = Utils.sortBy(testArray, 'str');

            // Assert
            expect(sortedArray).not.toBe(testArray);
            expect(sortedArray[0]).toEqual({
                num: 4,
                str: "1",
                obj: {
                    num: 4,
                    str: "4"
                }
            });
        });
    })

    describe('sort by value provided by keySelector', () => {
        it('number', () => {
            // Arrange
            const testArray = getDefaultArray();

            // Act
            const sortedArray = Utils.sortBy(testArray, element => element.num);

            // Assert
            expect(sortedArray).not.toBe(testArray);
            expect(sortedArray[0]).toEqual({
                num: 1,
                str: "4",
                obj: {
                    num: 4,
                    str: "4"
                }
            });
        });

        it('string', () => {
            // Arrange
            const testArray = getDefaultArray();

            // Act
            const sortedArray = Utils.sortBy(testArray, element => element.str);

            // Assert
            expect(sortedArray).not.toBe(testArray);
            expect(sortedArray[0]).toEqual({
                num: 4,
                str: "1",
                obj: {
                    num: 4,
                    str: "4"
                }
            });
        });

        describe('nested object property', () => {
            it('number', () => {
                // Arrange
                const testArray = getDefaultArray();

                // Act
                const sortedArray = Utils.sortBy(testArray, element => element.obj.num);

                // Assert
                expect(sortedArray).not.toBe(testArray);
                expect(sortedArray[0]).toEqual({
                    num: 4,
                    str: "4",
                    obj: {
                        num: 1,
                        str: "4"
                    }
                });
            });

            it('string', () => {
                // Arrange
                const testArray = getDefaultArray();

                // Act
                const sortedArray = Utils.sortBy(testArray, element => element.obj.str);

                // Assert
                expect(sortedArray).not.toBe(testArray);
                expect(sortedArray[0]).toEqual({
                    num: 4,
                    str: "4",
                    obj: {
                        num: 4,
                        str: "1"
                    }
                });
            });
        })


    })
});

describe("moneyRound function", () => {
    it('rounds to 2 digits after the decimal point', () => {
        // Arrange
        const testValue = Math.random() * 10000;

        // Act
        const roundedValue = Utils.moneyRound(testValue).toString();

        // Assert
        expect(roundedValue).toMatch(/\d+\.\d{2}/i);
    });

    it('rounds correctly up', () => {
        // Arrange
        const testValue = 2342.455;

        // Act
        const roundedValue = Utils.moneyRound(testValue);

        // Assert
        expect(roundedValue).toBe(2342.46);
    });

    it('rounds correctly down', () => {
        // Arrange
        const testValue = 2342.453;

        // Act
        const roundedValue = Utils.moneyRound(testValue);

        // Assert
        expect(roundedValue).toBe(2342.45);
    });
})