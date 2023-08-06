// a function that takes multiple func as argument
// and returns a function that will pass a value through
// those functions

const salary = (p) => p.salary;
const addBouns = n => n + 1000;
const gross = g => g - g * 0.3;

const res = pipe(salary, addBouns, gross)({salary: 1000})

function pipe(...args) {
    return function(val) {
        args.forEach(function (fn) {
            val = fn(val)
        })
        return val;
    }
}

const ojj = {
    a: {
        b: (a, b, c) => a + b + c,
        c: (a, b, c) => a + b - c
    },
    d: (a, b, c) => a - b - c,
    e: true
}

function pipe2(obj) {
    return function g(...args) {
        Object.keys(obj).forEach(function checkFunc(key) {
            if(typeof obj[key] == "function") {
                obj[key] = obj[key](...args);
            } else if(obj[key] && typeof obj[key] == "object") {
                obj[key] = pipe2(obj[key])(...args);
            }
        })
        return obj;
    }
}

console.log(pipe2(ojj)(1, 1, 1));