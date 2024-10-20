/**
 * Паттерн Декоратор динамически наделяет объект новыми
 * возможностями и является гибкой альтернативой
 * субклассированию в области расширения функциональности.
 *
 * @format
 */

interface Beverage {
  description: string;

  cost: number;
}

class HouseBlend implements Beverage {
  #description: string = 'HouseBlend';

  get cost(): number {
    return 1;
  }

  get description() {
    return this.#description
  }
}

class DarkRoast implements Beverage {
  #description: string = 'DarkRoast';

  get cost(): number {
    return 1;
  }
  get description() {
    return this.#description
  }
}

class Espresso implements Beverage {
  #description: string = 'Espresso';

  get cost(): number {
    return 1;
  }
  get description() {
    return this.#description
  }
}

class Decaf implements Beverage {
  #description: string = 'Decaf';

  get cost(): number {
    return 1;
  }
  get description() {
    return this.#description
  }
}

interface CondimentDecorator {
  description: string;

  cost: number;
}

class Milk implements CondimentDecorator {
  #description: string = ", Milk";
  #cost = 1;

  beverage: Beverage;

  constructor(beverage: Beverage) {
    this.beverage = beverage;
  }

  get description(): string {
    return this.beverage.description + this.#description;
  }

  get cost() {
    return this.beverage.cost + this.#cost;
  }
}

class Mocha implements CondimentDecorator {
  #description: string = ", Mocha";
  #cost = 1;

  beverage: Beverage;

  constructor(beverage: Beverage) {
    this.beverage = beverage;
  }

  get description() {
    return this.beverage.description + this.#description
  }

  get cost() {
    return this.beverage.cost + this.#cost;
  }
}
class Soy implements CondimentDecorator {
  #description: string = ", Soy";

  #cost = 1;

  beverage: Beverage;

  constructor(beverage: Beverage) {
    this.beverage = beverage;
  }

  get description() {
    return this.beverage.description + this.#description
  }

  get cost() {
    return this.beverage.cost + this.#cost;
  }
}
class Whip implements CondimentDecorator {
  #description: string = ", Whip";

  #cost = 1;

  beverage: Beverage;

  constructor(beverage: Beverage) {
    this.beverage = beverage;
  }

  get description() {
    return this.beverage.description + this.#description
  }

  get cost() {
    return this.beverage.cost + this.#cost;
  }
}

function main() {
  const b1 = new Mocha(new Mocha(new Espresso()));

  const b2 = new Soy(new Whip(new Mocha(new DarkRoast())))
}