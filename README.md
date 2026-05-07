# Assignment B7A1 - Advanced Problem Solving with TypeScript and OOP

This repository contains solutions for the seven TypeScript problems and two blog posts.

## Files

- `solutions.ts` - All seven problem solutions in a single file
- `blog-1.md` - Blog on `any` vs `unknown` and type narrowing
- `blog-2.md` - Blog on the four pillars of OOP in TypeScript

## How to Run

Install TypeScript if you do not already have it:

```bash
npm install -g typescript
```

Compile the solutions file:

```bash
tsc solutions.ts
```

This produces a `solutions.js` you can run with Node.

## Problems Covered

1. `filterEvenNumbers` - returns even numbers from a list
2. `reverseString` - reverses a string
3. `checkType` - type guard for string or number
4. `getProperty` - generic property accessor with key constraint
5. `toggleReadStatus` - adds an `isRead` flag to a `Book`
6. `Person` and `Student` - class with inheritance and `getDetails`
7. `getIntersection` - common elements between two arrays
