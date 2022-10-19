export const sortBy = <T, K extends keyof T>(array: T[], key: K | ((elem: T) => any)) => {
    const mutableCopy = [...array];
    if (typeof (key) === 'function') {
        return mutableCopy.sort((a, b) => key(a) < key(b) ? -1 : 1);
    }

    return mutableCopy.sort((a, b) => a[key] < b[key] ? -1 : 1);
}

export const moneyRound = (amount: number) => Math.round(amount * 100) / 100;