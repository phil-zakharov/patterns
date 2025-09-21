export class Mutex {
  #locked = false;
  #queue: Function[] = [];

  acquire(): Promise<Function> {
    if (!this.#locked) {
      this.#locked = true;

      return Promise.resolve(this.#release.bind(this))
    }

    return new Promise(resolve => this.#queue.push(resolve))
  }

  #release() {
    if (this.#queue.length > 0) {
      const resolve = this.#queue.shift();
      resolve?.(this.#release.bind(this))
    } else {
      this.#locked = false;
    }
  }
}