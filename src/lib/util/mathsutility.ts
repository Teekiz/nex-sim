export function getLcm(denominators: number[]): number {
    if (denominators.length === 0) return 1;
    return denominators.reduce((acc, val) => lcm(acc, val));
}

function lcm(a: number,b: number): number {
    return Math.abs(a * b) / gcd(a, b);
}

function gcd(a: number,b: number): number{
    if (b === 0) return a;
    return gcd(b, a % b);
}
