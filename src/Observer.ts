/**
 * Паттерн Наблюдатель определяет отношение
 * «один-ко-многим» между объектами таким образом,
 * что при изменении состояния одного объекта происходит
 * автоматическое оповещение и обновление всех зависимых объектов.
 *
 * @format
 */

interface Observable {
  observers: Set<Observer>;

  registerObserver(observer: Observer): void;

  removeObserver(observer: Observer): void;

  notifyObserver(): void;
}

interface Observer {
  update(observable: Observable): void;
}

class WeatherData implements Observable {
  observers = new Set<Observer>();

  temperature: number = 10;

  humidity: number = 10;

  pressure: number = 10;

  registerObserver(observer: Observer): void {
    this.observers.add(observer)
  }

  removeObserver(observer: Observer): void {
    this.observers.delete(observer)
  }

  notifyObserver(): void {
    this.observers.forEach((ob) => ob.update(this))
  }
}

class ForecastDisplay implements Observer {
  update(obs: Observable): void {
    if (obs instanceof WeatherData) {
      console.log(obs.temperature)
    }
  }
}
