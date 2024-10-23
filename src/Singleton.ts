/**
 * Паттерн Одиночка гарантирует, что класс имеет только 
 * один экземпляр, и предоставляет глобальную точку
 * доступа к этому экземпляру.
 */

class Singleton {
  static instance: Singleton | null = null;

  private constructor() {}

  static getInstance() {
    if (this.instance === null) {
      console.log('create instance')
      this.instance = new Singleton()
    }

    console.log('return instance')

    return this.instance
  }
}

const s = Singleton.getInstance()
const s1 = Singleton.getInstance()