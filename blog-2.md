# How OOP's Four Pillars Reduce Complexity in TypeScript

## Introduction

Big TypeScript codebases get messy fast. The four pillars of OOP, inheritance, polymorphism, abstraction, and encapsulation, give us tools to keep things tidy. Each pillar fixes a specific kind of mess we run into past a few thousand lines.

## Inheritance Removes Duplication

Inheritance lets one class reuse fields and methods from another. We write the shared parts once.

```ts
class Vehicle {
    brand: string;
    speed: number;

    constructor(brand: string, speed: number) {
        this.brand = brand;
        this.speed = speed;
    }

    describe(): string {
        return `${this.brand} moving at ${this.speed} km/h`;
    }
}

class ElectricCar extends Vehicle {
    batteryLevel: number;

    constructor(brand: string, speed: number, batteryLevel: number) {
        super(brand, speed);
        this.batteryLevel = batteryLevel;
    }
}
```

ElectricCar gets describe() for free. When we add Truck, Bike, or Bus later, the constructor logic doesn't need rewriting.

## Polymorphism Replaces Type Checks

Polymorphism lets different classes answer the same call in their own way. The caller doesn't care which subclass shows up.

```ts
class Shape {
    area(): number {
        return 0;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }
    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Square extends Shape {
    constructor(private side: number) {
        super();
    }
    area(): number {
        return this.side * this.side;
    }
}

const shapes: Shape[] = [new Circle(5), new Square(4)];
const total = shapes.reduce((sum, s) => sum + s.area(), 0);
```

The reduce loop knows nothing about Circle or Square. Adding Triangle later changes nothing in the loop.

## Abstraction Hides Detail

Abstraction shows the intent and hides the wiring. TypeScript supports the pattern through abstract classes and interfaces.

```ts
abstract class PaymentGateway {
    abstract pay(amount: number): string;

    log(amount: number): void {
        // shared logic
    }
}

class StripeGateway extends PaymentGateway {
    pay(amount: number): string {
        return `Charged ${amount} via Stripe`;
    }
}

class BkashGateway extends PaymentGateway {
    pay(amount: number): string {
        return `Charged ${amount} via Bkash`;
    }
}
```

Code calling pay() doesn't need to know about Stripe API keys or Bkash callbacks. Switching providers leaves the callers untouched.

## Encapsulation Protects State

Encapsulation hides internal data behind controlled access. We use private, protected, and readonly to set the rules.

```ts
class BankAccount {
    private balance: number = 0;

    deposit(amount: number): void {
        if (amount <= 0) throw new Error("invalid amount");
        this.balance += amount;
    }

    getBalance(): number {
        return this.balance;
    }
}
```

Outside code touches the balance only through deposit and getBalance. Negative deposits get rejected before they corrupt anything.

## Practical Impact at Scale

Each pillar handles a real problem:

- Inheritance removes duplicated constructors and helpers
- Polymorphism removes if-else chains based on type
- Abstraction lets us swap implementations without breaking callers
- Encapsulation keeps state changes predictable

Apply these on purpose and the bug count drops. Code reviews go faster too.

## When to Reach for Each

- Same fields showing up in many classes? Use inheritance.
- Switch on type in a function? Use polymorphism.
- Callers tied to vendor specifics? Use abstraction.
- State mutated from everywhere? Use encapsulation.

## Closing

The four pillars are targeted fixes for specific kinds of complexity. Use each one when the symptom matches. The codebase stays readable as the team grows.
