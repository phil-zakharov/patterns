abstract class CaffeineBeverage {
  prepareRecipe() {
    this.boilWater()
    this.brew()
    this.pourInCup()
    this.addCondiments()
  };

  boilWater() {}

  pourInCup() {}

  abstract brew(): void;

  abstract addCondiments(): void;
}

class Coffee extends CaffeineBeverage {
  brew() {}

  addCondiments() {}
}

class Tea extends CaffeineBeverage {
  brew() {}

  addCondiments() {}
}