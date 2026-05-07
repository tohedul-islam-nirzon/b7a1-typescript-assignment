# Why any Hurts Type Safety and unknown Keeps Us Safe

## Introduction

TypeScript catches type mistakes before they reach runtime. The any type turns those checks off. The unknown type keeps the checks on but accepts values of any shape. For data we don't fully control, unknown is the right choice.

## The Problem With any

A value typed as any tells the compiler to stop checking. We lose autocomplete. We lose error messages. Bugs go straight to production.

```ts
let data: any = "hello";
data.toUpperCase();
data();
data.foo.bar.baz;
```

The first line runs fine. The second crashes because strings aren't callable. The third throws because foo doesn't exist. The compiler flags none of these.

People call any a type safety hole for a reason. Every guarantee TypeScript gives us drops the moment we reach for it.

## Why unknown Beats any

The unknown type accepts any value too. But we have to prove the shape before doing anything with the value.

```ts
let input: unknown = "hello";

input.toUpperCase();

if (typeof input === "string") {
    input.toUpperCase();
}
```

The first call won't compile. The second works because the typeof check tells the compiler we're holding a string inside the block.

## Type Narrowing in Practice

Narrowing is how we go from a loose type to a specific one with a runtime check.

For primitives, typeof handles the job:

```ts
function format(value: unknown): string {
    if (typeof value === "number") {
        return value.toFixed(2);
    }
    if (typeof value === "string") {
        return value.trim();
    }
    return "unsupported";
}
```

For class instances, instanceof works:

```ts
class ApiError extends Error {}

function handle(err: unknown) {
    if (err instanceof ApiError) {
        return err.message;
    }
    return "unknown error";
}
```

For object shapes, we write a custom guard:

```ts
interface User {
    id: number;
    name: string;
}

function isUser(value: unknown): value is User {
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value
    );
}

function greet(input: unknown) {
    if (isUser(input)) {
        return `Hi ${input.name}`;
    }
    return "Hi stranger";
}
```

The compiler trusts the guard inside the if block.

## When to Pick unknown

Reach for unknown whenever the data comes from outside our code:

- API responses
- Form input
- Third-party libraries
- Files we parse at runtime

Skip any unless we have no other option. A few extra lines of narrowing today saves us from tracking down a runtime crash next week.

## Closing

The any type weakens TypeScript. The unknown type keeps the type system honest while staying flexible. Pick unknown for unpredictable data and check the shape before using the value.
