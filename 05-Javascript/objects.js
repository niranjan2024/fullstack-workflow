
//1st Problem
const book = {
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  pages: 310,
  isRead: true,
  getSummary() {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  }
};

console.log(book.title);        
console.log(book.getSummary());


//2nd Probelm
function getProperty(obj, path) {
  const keys = path.split(".");
  let current = obj;

  for (let key of keys) {
    if (current == null || !(key in current)) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}

//Output Check
const user = {
  name: 'Alice',
  address: {
    city: 'Seattle',
    zip: '98101'
  }
};

console.log(getProperty(user, 'name'));             // 'Alice'
console.log(getProperty(user, 'address.city'));     // 'Seattle'
console.log(getProperty(user, 'address.country'));  // undefined
console.log(getProperty(user, 'phone.number'));     // undefined

//3rd Probelm
const counter = {
  count: 0,
  increment() {
    this.count++;
  },
  decrement() {
    this.count--;
  },
  reset() {
    this.count = 0;
  },
  getCount() {
    return this.count;
  }
};

counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
counter.decrement();
console.log(counter.getCount()); // 1
counter.reset();
console.log(counter.getCount()); // 0


//4th Problem
function createCalculator() {
  let value = 0;

  return {
    add(n) {
      value += n;
      return this; // enable chaining
    },
    subtract(n) {
      value -= n;
      return this;
    },
    multiply(n) {
      value *= n;
      return this;
    },
    divide(n) {
      if (n !== 0) value /= n;
      return this;
    },
    reset() {
      value = 0;
      return this;
    },
    getResult() {
      return value;
    }
  };
}

const calc = createCalculator();

const result = calc
  .add(10)
  .subtract(2)
  .multiply(3)
  .divide(4)
  .getResult();

console.log(result); // 6


//5th Problem
const product = {
    id: 101,
    name: 'Laptop',
    price: 999,
    specs: {
        ram: '16GB',
        storage: '512GB SSD'
    }
};

const { name } = product;
const { price } = product;
const { specs: { ram } } = product;

//Output Check
console.log(name);  // 'Laptop'
console.log(price); // 999
console.log(ram);   // '16GB'


//6th Probelm
const config = { theme: 'dark', fontSize: 14 };
const { theme: colorTheme, fontSize, language = 'en', debugMode = false } = config;

//Output Check
console.log(colorTheme); // 'dark'
console.log(fontSize);   // 14
console.log(language);   // 'en'
console.log(debugMode);  // false


//7th Probelm
const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'editor' }
];

function formatUser({ name, email, role = 'user' }) {
  return `${name} (${role}): ${email}`;
}

//Output Check
users.forEach(user => console.log(formatUser(user)));

// Alice (admin): alice@example.com
// Bob (user): bob@example.com
// Charlie (editor): charlie@example.com


//8th Problem
const defaults = { theme: 'light', notifications: true, language: 'en' };
const userPrefs = { theme: 'dark', fontSize: 16 };

const finalSettings = {
  ...defaults,
  ...userPrefs,
  timestamp: new Date()
};

//output Check
console.log(finalSettings);
/*
{
  theme: 'dark',
  notifications: true,
  language: 'en',
  fontSize: 16,
  timestamp: 2025-01-01T10:00:00.000Z
}
*/

//9th Problem
const students = [
    { id: 1, name: 'Alice', scores: [85, 90, 78] },
    { id: 2, name: 'Bob', scores: [70, 75, 80] },
    { id: 3, name: 'Charlie', scores: [90, 95, 88] }
];

function transformStudents(students) {
  return students.reduce((result, { name, scores }) => {
    const average =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;

    result[name] = Number(average.toFixed(2));
    return result;
  }, {});
}

//Output Check
console.log(transformStudents(students));
/*
{
  Alice: 84.33,
  Bob: 75,
  Charlie: 91
}
*/
