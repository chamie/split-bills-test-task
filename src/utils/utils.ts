export const sortBy = <T, K extends keyof T>(array: readonly T[], keySelector: K | ((elem: T) => any)) => {
    const mutableCopy = [...array];
    if (typeof (keySelector) === 'function') {
        return mutableCopy.sort((a, b) => keySelector(a) < keySelector(b) ? -1 : 1);
    }

    return mutableCopy.sort((a, b) => a[keySelector] < b[keySelector] ? -1 : 1);
}

export const moneyRound = (amount: number) => Math.round(amount * 100) / 100;