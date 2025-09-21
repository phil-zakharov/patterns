import { Mutex } from '../async/Mutex';

// здесь реализовано как IIFE, может быть отдельным модулем, нужно чтобы не было доступа к busy
const writeFile = (() => {
  let busy = false;

  return (...args) => {
    return new Promise((resolve, reject) => {
      if (busy) {
        reject(new Error("busy"));
        return;
      }

      busy = true;

      setTimeout(() => {
        busy = false;
        resolve(...args);
      }, 1000);
    });
  };
})();

const mutex = new Mutex()
const writeFileQueued = async (...args) => {
  const release = await mutex.acquire()
  await writeFile(...args);
  release()
};

// тестовые вызовы
console.time("1");
writeFileQueued("foo", "bar").then(() => {
  console.timeEnd("1"); // ~ 1 секунда
});

console.time("2");
writeFileQueued("foo", "baz").then(() => {
  console.timeEnd("2"); // ~ 2 секунды
});

console.time("3");
writeFileQueued("foo").then(() => {
  console.timeEnd("3"); // ~ 3 секунды
});

console.time("4");
writeFileQueued("baz").then(() => {
  console.timeEnd("4"); // ~ 4 секунды
});