/** 
 * Паттерн Фасад предоставляет унифицированный интерфейс
 * к группе интерфейсов подсистемы. 
 * Фасад определяет высокоуровневый интерфейс, 
 * упрощающий работу с подсистемой.
 */

class HoneTheaterFacade {
  amplifier: Amplifier;
  tuner: Tuner;
  dvdPlayer: DVDPlayer;
  cdPlayer: CDPlayer;
  projector: Projector;
  theatreLight: TheaterLight;
  homeScreen: HomeScreen;
  popcornPopper: PopcornPopper;

  constructor(
    amplifier: Amplifier,
    tuner: Tuner,
    dvdPlayer: DVDPlayer,
    cdPlayer: CDPlayer,
    projector: Projector,
    theatreLight: TheaterLight,
    homeScreen: HomeScreen,
    popcornPopper: PopcornPopper,
  ) {
    this.amplifier = amplifier;
    this.tuner = tuner;
    this.dvdPlayer = dvdPlayer;
    this.cdPlayer = cdPlayer;
    this.projector = projector;
    this.theatreLight = theatreLight;
    this.homeScreen = homeScreen;
    this.popcornPopper = popcornPopper;
  }

  watchMovie() {
    this.popcornPopper.on()
    this.popcornPopper.pop()
    this.theatreLight.dim(10);
    this.homeScreen.down()
    this.projector.on()
    this.projector.wideScreenMode()
    this.amplifier.on()
    this.amplifier.setDVD()
    this.amplifier.setSurroundOn()
    this.amplifier.setVolume(5)
    this.dvdPlayer.on()
    this.dvdPlayer.play()
  }

  endMovie() {
    this.popcornPopper.off()
    this.theatreLight.on()
    this.homeScreen.up()
    this.projector.off()
    this.amplifier.off()
    this.dvdPlayer.stop()
    this.dvdPlayer.eject()
    this.dvdPlayer.off()
  }
}

class Amplifier {
  on() {}

  off() {}

  setDVD() {}

  setSurroundOn() {}

  setVolume(volume: number) {}
}

class Tuner {
  on() {}

  off() {}
}

class DVDPlayer {
  on() {}

  off() {}

  play() {}

  stop() {}

  eject() {}
}

class CDPlayer {
  on() {}

  off() {}
}

class HomeScreen {
  up() {}

  down() {}
}

class PopcornPopper {
  on() {}

  off() {}

  pop() {}
}

class TheaterLight {
  on() {}

  off() {}

  dim(light: number) {}
}

class Projector {
  on() {}

  off() {}

  wideScreenMode() {}
}
