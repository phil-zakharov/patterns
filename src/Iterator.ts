/** @format */

class MenuItem {
  #name: string;
  #description: string;
  #vegetarian: boolean;
  #price: number;

  constructor(
    name: string,
    description: string,
    vegetarian: boolean,
    price: number,
  ) {
    this.#name = name;
    this.#description = description;
    this.#vegetarian = vegetarian;
    this.#price = price;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  get vegetarian() {
    return this.#vegetarian;
  }

  get price() {
    return this.#price;
  }
}

class PancakeHouseMenu implements IterableIterator<MenuItem, void, void> {
  menuItems: Set<MenuItem>;

  constructor() {
    this.menuItems = new Set();

    this.addItem(
      'K&B’s Pancake Breakfast',
      'Pancakes with scrambled eggs, and toast',
      true,
      2.99,
    );

    this.addItem(
      'Regular Pancake Breakfast',
      'Pancakes with fried eggs, sausage',
      false,
      2.99,
    );

    this.addItem(
      'Blueberry Pancakes',
      'Pancakes made with fresh blueberries',
      true,
      3.49,
    );

    this.addItem(
      'Waffles',
      'Waffles, with your choice of blueberries or strawberries',
      true,
      3.59,
    );
  }

  iterator: SetIterator<MenuItem> | null = null;

  [Symbol.iterator](): IterableIterator<MenuItem> {
    return this;
  }

  next(): IteratorResult<MenuItem> {
    if (!this.iterator) {
      this.iterator = this.menuItems.values()
    }
    const res =  this.iterator.next()

    if (res.done) {
      this.iterator = null;
    }

    return res
  }

  return?(value?: void | undefined): IteratorResult<MenuItem, any> {
    if (!this.iterator) {
      this.iterator = this.menuItems.values()
    }
    this.iterator.return?.()
    return { done: true, value: undefined }
  }

  throw?(e?: any): IteratorResult<MenuItem> {
    if (!this.iterator) {
      this.iterator = this.menuItems.values()
    }
    this.iterator.throw?.(e)
    return { done: true, value: undefined }
  }

  addItem(
    name: string,
    description: string,
    vegetarian: boolean,
    price: number,
  ) {
    this.menuItems.add(new MenuItem(name, description, vegetarian, price));
  }
}

class DinerMenu implements IterableIterator<MenuItem, void, void> {
  MAX_ITEMS = 6;

  numberOfItems = 0;

  menuItems: MenuItem[];

  constructor() {
    this.menuItems = [];

    this.addItem(
      'Vegetarian BL',
      '(Fakin’) Bacon with lettuce & tomato on whole wheat',
      true,
      2.99,
    );

    this.addItem(
      'BLT',
      'Bacon with lettuce & tomato on whole wheat',
      false,
      2.99,
    );

    this.addItem(
      'Soup of the day',
      'Soup of the day, with a side of potato salad',
      false,
      3.29,
    );

    this.addItem(
      'Hotdog',
      'A hot dog, with saurkraut, relish, onions, topped with cheese',
      false,
      3.05,
    );
  }
  cursor = 0;
  [Symbol.iterator](): IterableIterator<MenuItem, void, void> {
    return this
  }
  next(): IteratorResult<MenuItem, void> {
    if (this.cursor === this.menuItems.length) {
      return { done: true, value: undefined }
    }
    return { done: false, value: this.menuItems[this.cursor++]}
  }
  return?(value?: void | undefined): IteratorResult<MenuItem, void> {
    this.cursor = 0
    return { done: true, value: undefined }
  }
  throw?(e?: any): IteratorResult<MenuItem, void> {
    this.cursor = 0
    return { done: true, value: undefined }
  }

  addItem(
    name: string,
    description: string,
    vegetarian: boolean,
    price: number,
  ) {
    if (this.numberOfItems === this.MAX_ITEMS) {
      throw new Error('Sorry, menu is full! Can’t add item to menu')
    }
    this.numberOfItems++;
    this.menuItems.push(new MenuItem(name, description, vegetarian, price));
  }
}

class Menu {
  printMenu() {
    const phm = new PancakeHouseMenu()

    console.log('1')

    for (const menuItem of phm) {
      console.log(menuItem.name)
    }

    console.log('2')

    const dm = new DinerMenu();

    for (const menuItem of dm) {
      console.log(menuItem.name)
    }

    console.log('3')
  }
}

const menu = new Menu()

menu.printMenu()

const get = (obj: object, path: string, defaultValue: string) => {
  const keys = path.split(",");

  let currentObj = obj;

  for (const key of keys) {
    // @ts-ignore
    const value = currentObj[key];
    if (!value) {
      return defaultValue;
    }

    currentObj = value;
  }

  return currentObj;
}