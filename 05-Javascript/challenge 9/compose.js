// compose: right → left
const compose = (...fns) => {
  return (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);
};

// pipe: left → right
const pipe = (...fns) => {
  return (value) =>
    fns.reduce((acc, fn) => fn(acc), value);
};

//Output Check

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(addOne, double, square);
console.log(composed(3));
// square(3) = 9 → double(9) = 18 → addOne(18) = 19

const piped = pipe(square, double, addOne);
console.log(piped(3));
// square(3) = 9 → double(9) = 18 → addOne(18) = 19
