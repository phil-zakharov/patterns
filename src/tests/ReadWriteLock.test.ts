import { ReadWriteLock } from '../async/ReadWriteLock';

const lock = new ReadWriteLock();
let value = 0;

async function reader(id) {
  await lock.runRead(async () => {
    console.log(`Reader ${id} sees value =`, value);
    await new Promise(r => setTimeout(r, 1000));
  });
}

async function writer(id) {
  await lock.runWrite(async () => {
    console.log(`Writer ${id} updating...`);
    await new Promise(r => setTimeout(r, 1000));
    value++;
    console.log(`Writer ${id} new value =`, value);
  });
}

async function main() {
  writer(-1);
  reader(1);
  reader(2);
  writer(1);
  reader(3);
  writer(2);
}

main();