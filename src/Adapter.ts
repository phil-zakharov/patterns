/**
 * Паттерн Адаптер преобразует интерфейс класса к другому интерфейсу, 
 * на который рассчитан клиент. Адаптер обеспечивает
 * совместную работу классов, невозможную в обычных условиях
 * из-за несовместимости интерфейсов.
 */

class OldEnumeration {
  hasMoreElements() {}

  nextElement() {}
}

class NewIterator {
  hasNext() {}

  next() {}

  remove() {}
}

class UnsupportedOperationError extends Error {

}

class Adapter {
  enumeration: OldEnumeration

  constructor (enumeration: OldEnumeration) {
    this.enumeration = enumeration
  }

  hasNext() {
    return this.enumeration.hasMoreElements()
  }

  next() {
    return this.enumeration.nextElement()
  }

  remove() {
    throw new UnsupportedOperationError()
  }
}
