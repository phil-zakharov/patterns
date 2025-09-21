export class ReadWriteLock {
  #readers = 0;
  #writers = 0;
  #waiters = [];

  acquireRead() {
    if (this.#waiters.length === 0 && this.#writers === 0) {
      this.#readers++;
      return () => this.#releaseRead()
    }

    return new Promise(resolve => {
      this.#waiters.push({ type: 'read', resolve })
    })
  }

  acquireWrite() {
    if (this.#writers === 0 && this.#readers === 0) {
      this.#writers++;
      return () => this.#releaseWrite()
    }

    return new Promise(resolve => {
      this.#waiters.push({ type: 'write', resolve })
    })
  }

  #releaseRead() {
    this.#readers--;

    if (this.#readers === 0) {
      this.#dispatch()
    }
  }

  #releaseWrite() {
    this.#writers--;
    if (this.#writers === 0) {
      this.#dispatch()
    }
  }

  #dispatch() {
    if (this.#readers || this.#writers) {
      return;
    }

    if (this.#waiters.length > 0) {
      const { type, resolve } = this.#waiters.shift();

      if (type === 'read') {
        this.#readers++;
        resolve(() => this.#releaseRead())
      }

      if (type === 'write') {
        this.#writers++;
        resolve(() => this.#releaseWrite())
      }
    }
  }


  // Удобная обёртка: выполнить fn под read-lock
  async runRead(fn) {
    const release = await this.acquireRead();
    try {
      return await fn();
    } finally {
      release();
    }
  }

  // Удобная обёртка: выполнить fn под write-lock
  async runWrite(fn) {
    const release = await this.acquireWrite();
    try {
      return await fn();
    } finally {
      release();
    }
  }
}