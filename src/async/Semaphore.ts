export class Semaphore {
  #maxConcurrent: number;
  #current = 0;
  #queue: Function[] = []

  constructor(maxConcurrent: number = 1) {
    this.#maxConcurrent = maxConcurrent
  }

  acquire(): Promise<Function> {
    if (this.#current < this.#maxConcurrent) {
      this.#current++;
      return Promise.resolve(this.#release.bind(this))
    }

    return new Promise((resolve) => this.#queue.push(resolve))
  }

  #release() {
    this.#current--;
    if (this.#queue.length > 0 && this.#current < this.#maxConcurrent) {
      const resolve = this.#queue.shift();
      resolve?.(this.#release.bind(this))      
    }
  }
}