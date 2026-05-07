// Problem 1
function filterEvenNumbers(numbers: number[]): number[] {
    const evens: number[] = [];
    for (const num of numbers) {
        if (num % 2 === 0) {
            evens.push(num);
        }
    }
    return evens;
}


// Problem 2
function reverseString(text: string): string {
    let reversed = "";
    for (let i = text.length - 1; i >= 0; i--) {
        reversed += text[i];
    }
    return reversed;
}


// Problem 3
type StringOrNumber = string | number;

function checkType(value: StringOrNumber): string {
    if (typeof value === "string") {
        return "String";
    }
    return "Number";
}


// Problem 4
function getProperty<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}


// Problem 5
interface Book {
    title: string;
    author: string;
    publishedYear: number;
}

function toggleReadStatus(book: Book): Book & { isRead: boolean } {
    return {
        ...book,
        isRead: true
    };
}


// Problem 6
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    grade: string;

    constructor(name: string, age: number, grade: string) {
        super(name, age);
        this.grade = grade;
    }

    getDetails(): string {
        return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }
}


// Problem 7
function getIntersection(firstArray: number[], secondArray: number[]): number[] {
    const result: number[] = [];
    for (const item of firstArray) {
        if (secondArray.includes(item) && !result.includes(item)) {
            result.push(item);
        }
    }
    return result;
}
