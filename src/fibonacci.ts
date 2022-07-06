export const computeFibonacciNumber = (position: number | null, recursion: boolean = false, isRecursive: boolean = false): number => {
    if (position === 0) {
        return 0;
    }
    if (position === 1 || position === 2) {
        return 1;
    }

    if (position < 0) {
        return computeNegativeFibonacci(position);
    }
    let notNullPosition = position;
    if (notNullPosition === null) {
        notNullPosition = 1;   
    }
    if (notNullPosition <= 2) {
        return 1;
    }

    let smallFibonacciNumber = 1;
    let largeFibonacciNumber = 1;
    
    if (recursion) {
        return recursiveFibonacci(1, 1, position - 2);
    }

    if (isRecursive) return negative_recursiveFibonacci(position);

    let i = 1;
    let j = 1;

    let currentPosition = 2;
    while (currentPosition < notNullPosition && currentPosition < position) {
        const temp = i;
        i = j;
        j += temp;
        const nextFibonacciNumber = smallFibonacciNumber + largeFibonacciNumber;
        smallFibonacciNumber = largeFibonacciNumber;
        largeFibonacciNumber = nextFibonacciNumber;
        currentPosition++;
    }
    return largeFibonacciNumber;
};

const computeNegativeFibonacci = (position: number): number => {
    if (position >= 0) {
        throw new Error(`Position must be less than zero! Received: ${position}.`);
    }
    const resultIsNegative = position % 2 === 0;
    const absoluteResult = computeFibonacciNumber(-position);
    return resultIsNegative ? absoluteResult * -1 : absoluteResult;
}

export const computeFibonacciArray = (start: number, endInclusive: number): number[] => {
    const inputArray = [...Array(endInclusive - start + 1).keys()].map(i => i + start);
    return inputArray.map(x => computeFibonacciNumber(x));
}

const recursiveFibonacci = (previous: number, current: number, stepsLeft: number): number => {
    if (stepsLeft < 0) {
        return 1;
    }
    switch (stepsLeft) {
        case 0:
            return current;
        default:
            return recursiveFibonacci(current, previous + current, stepsLeft - 1);
    }
}

const negative_recursiveFibonacci = (initialPosition: number, left: number = 0, right: number = 1, position?: number): number => {
    const currentPosition = position ?? initialPosition;
    if (initialPosition === 0) return 0;
    if (currentPosition === 0) return left;
    if (initialPosition > 0) {
        return negative_recursiveFibonacci(initialPosition, right, left + right, currentPosition - 1);
    } else {
        return negative_recursiveFibonacci(initialPosition, right - left, left, currentPosition + 1);
    }
}
