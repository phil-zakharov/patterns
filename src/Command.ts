/**
 * Паттерн Команда инкапсулирует запрос в виде
 * объекта, делая возможной параметризацию клиентских объектов с другими запросами,
 * организацию очереди или регистрацию запросов, а также поддержку отмены операций.
 *
 * @format
 */

class Light {
  on() {}
  off() {}
}

class GarageDoor {
  up() {}

  down() {}

  stop() {}

  lightOn() {}

  lightOff() {}
}

class Stereo {
  on() {}

  off() {}

  setCD() {}

  setDVD() {}

  setRadio() {}

  setVolume(volume: number) {}
}

type CB = () => void;

class RemoteControl {
  onCommands: Array<CB>;
  offCommands: Array<CB>;
  undoCommand: CB;

  constructor() {
    this.onCommands = Array.from({ length: 7 }, () => () => {});
    this.offCommands = Array.from({ length: 7 }, () => () => {});
    this.undoCommand = () => {};
  }

  setCommand(slot: number, onCommand: CB, offCommand: CB) {
    this.onCommands[slot] = onCommand;
    this.offCommands[slot] = offCommand;
  }

  onButtonWasPressed(slot: number) {
    this.onCommands[slot]();
    this.undoCommand = this.onCommands[slot];
  }

  offButtonWasPressed(slot: number) {
    this.onCommands[slot]();
    this.undoCommand = this.offCommands[slot];
  }

  undoButtonWasPressed() {
    this.undoCommand();
  }
}

class RemoteControlTest {
  main() {
    const remote = new RemoteControl(),
      light = new Light(),
      garageDoor = new GarageDoor(),
      stereo = new Stereo();

    remote.setCommand(0, light.on, light.off);
    remote.setCommand(1, garageDoor.up, garageDoor.down);
    remote.setCommand(2, stereo.on, stereo.off);

    remote.onButtonWasPressed(0);
    remote.offButtonWasPressed(1);
  }
}
