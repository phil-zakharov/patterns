/**
 * Паттерн "Стратегия"
 * Паттерн Стратегия определяет семейство алгоритмов,
 * инкапсулирует каждый из них и обеспечивает их взаимозаменяемость.
 * Он позволяет модифицировать алгоритмы независимо
 * от их использования на стороне клиента.
 *
 * @format
 */

interface FlyBehavior {
  fly(): void;
}

class FlyWithWings implements FlyBehavior {
  fly(): void {}
}

class FlyNoWay implements FlyBehavior {
  fly(): void {}
}

interface QuackBehavior {
  quack(): void;
}

class QuietQuack implements QuackBehavior {
  quack(): void {}
}

class LoudQuack implements QuackBehavior {
  quack(): void {}
}

interface Duck {
  fly: FlyBehavior;
  quack: QuackBehavior;
}

class RedHeadDuck implements Duck {
  fly: FlyBehavior;
  quack: QuackBehavior;

  constructor() {
    this.fly = new FlyWithWings();
    this.quack = new QuietQuack();
  }
}

class MallardDuck implements Duck {
  fly: FlyBehavior;
  quack: QuackBehavior;

  constructor() {
    this.fly = new FlyNoWay();
    this.quack = new LoudQuack();
  }
}
