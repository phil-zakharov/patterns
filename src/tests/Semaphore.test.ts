import { Semaphore } from '../async/Semaphore';

const sleep = (t: number) => new Promise(r => setTimeout(r, t))

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

const semaphore = new Semaphore(2)
const writeFileQueued = async (...args) => {
  const release = await semaphore.acquire()
  await sleep(1000);
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

console.time("5");
writeFileQueued("foo", "bar").then(() => {
  console.timeEnd("5"); // ~ 1 секунда
});

console.time("6");
writeFileQueued("foo", "baz").then(() => {
  console.timeEnd("6"); // ~ 2 секунды
});

console.time("7");
writeFileQueued("foo").then(() => {
  console.timeEnd("7"); // ~ 3 секунды
});

console.time("8");
writeFileQueued("baz").then(() => {
  console.timeEnd("8"); // ~ 4 секунды
});