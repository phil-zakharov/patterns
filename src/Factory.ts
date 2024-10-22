/**
 * Паттерн Фабричный Метод определяет интерфейс создания
 * объекта, но позволяет субклассам выбрать класс создаваемо-го экземпляра.
 * Таким образом, Фабричный Метод делегирует
 * операцию создания экземпляра субклассам.
 *
 * @format
 */

abstract class OrderPizza {
  abstract createPizza(type: string): Pizza;

  orderPizza(type: string) {
    const pizza = this.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
  }
}

class NYPizzaStore extends OrderPizza {
  createPizza(type: string): Pizza {
    const NYFactory = new NYPizzaIngredientFactory()

    if (type === 'cheese') {
      return new CheesePizza(NYFactory);
    } else if (type === 'pepperoni') {
      return new PepperoniPizza(NYFactory);
    } else if (type === 'clam') {
      return new ClamPizza(NYFactory);
    }

    throw new Error();
  }
}

class ChicagoPizzaStore extends OrderPizza {
  createPizza(type: string): Pizza {
    const ChicagoFactory = new ChicagoPizzaIngredientFactory()
    
    if (type === 'cheese') {
      return new CheesePizza(ChicagoFactory);
    } else if (type === 'pepperoni') {
      return new PepperoniPizza(ChicagoFactory);
    } else if (type === 'clam') {
      return new ClamPizza(ChicagoFactory);
    }

    throw new Error();
  }
}

interface PizzaIngredientFactory {
  createDough(): void;
  createSauce(): void;
  createCheese(): void;
  createVeggies(): void;
  createPepperoni(): void;
  createClam(): void;
}

class NYPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough(): void {}
  createSauce(): void {}
  createCheese(): void {}
  createVeggies(): void {}
  createPepperoni(): void {}
  createClam(): void {}
}

class ChicagoPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough(): void {}
  createSauce(): void {}
  createCheese(): void {}
  createVeggies(): void {}
  createPepperoni(): void {}
  createClam(): void {}
}

abstract class Pizza {
  name: string = "";
  dough: string = "";
  sauce: string = "";
  veggies: string[] = ['']
  cheese: string = "";
  pepperoni: string = "";

  abstract prepare(): void;

  bake()  {

  };
  cut()  {

  };
  box()  {

  };
}

class CheesePizza extends Pizza {
  pizzaIngredientFactor: PizzaIngredientFactory;

  constructor(pizzaIngredientFactor: PizzaIngredientFactory) {
    super();
    this.pizzaIngredientFactor = pizzaIngredientFactor;
  }

  prepare(): void {
    this.pizzaIngredientFactor.createDough()
    this.pizzaIngredientFactor.createSauce();
    this.pizzaIngredientFactor.createCheese();
  }
}

class PepperoniPizza extends Pizza {
  pizzaIngredientFactor: PizzaIngredientFactory;

  constructor(pizzaIngredientFactor: PizzaIngredientFactory) {
    super();
    this.pizzaIngredientFactor = pizzaIngredientFactor;
  }

  prepare(): void {
    this.pizzaIngredientFactor.createDough()
    this.pizzaIngredientFactor.createSauce();
    this.pizzaIngredientFactor.createCheese();
    this.pizzaIngredientFactor.createClam()
  }
}

class ClamPizza extends Pizza {
  pizzaIngredientFactor: PizzaIngredientFactory;

  constructor(pizzaIngredientFactor: PizzaIngredientFactory) {
    super();
    this.pizzaIngredientFactor = pizzaIngredientFactor;
  }

  prepare(): void {
    this.pizzaIngredientFactor.createDough()
    this.pizzaIngredientFactor.createSauce();
    this.pizzaIngredientFactor.createCheese();
    this.pizzaIngredientFactor.createClam()
  }
}