class _GameAudio {
  audioTracks = {};
  musicPlaying;

  preload(audioTracks, onload) {
    this.audioTracks = audioTracks;
    for (const url of Object.values(this.audioTracks)) {
      if (Array.isArray(url)) {
        for (const i in url) {
          var audio = new Audio();
          audio.addEventListener(
            "canplaythrough",
            () => {
              onload();
            },
            false
          );
          audio.src = url[i];
        }
      }
      var audio = new Audio();
      audio.addEventListener(
        "canplaythrough",
        () => {
          onload();
        },
        false
      );
      audio.src = url;
    }
  }

  playMusic(name) {
    if (!this.audioTracks[name]) {
      throw new Error("No Audio Track with this name");
    }
    if (Array.isArray(this.audioTracks[name])) {
      this.playMusicFromArray(name);
    } else {
      if (this.musicPlaying) {
        return;
      }

      this.musicPlaying = new Audio(this.audioTracks[name]);
      this.setMusicPlayingState();
      this.musicPlaying.play();
      this.musicPlaying.loop = true;
    }

  }

  playMusicFromArray(name) {
    if (this.musicPlaying) {
      this.musicPlaying.pause()
    }

    this.musicPlaying = new Audio(this.audioTracks[name][Math.floor(Math.random() * this.audioTracks[name].length)]);
    this.setMusicPlayingState();
    this.musicPlaying.addEventListener('ended', (event) => {
      this.playMusicFromArray(name);
    });
    this.musicPlaying.loop = false;
    this.musicPlaying.play();
  }

  playAudio(name, reps = 1) {
    if (!this.audioTracks[name]) {
      throw new Error("No Audio Track with this name");
    }

    for (let i = 0; i < reps; i++) {
      setTimeout(() => {
        let audio = new Audio(this.audioTracks[name]);
        audio.volume = this.getVolumeState();
        audio.play();
      }, 200 * i);
    }
  }


  setMusicPlayingState() {
    if (!this.getVolumeState()) {
      this.setVolumeState(0.10);
    }
    let muted = this.getMutedState();

    if (muted === true) {
      this.muteMusicVolume();
    } else {
      this.changeMusicVolume(this.getVolumeState());
    }
  }

  muteMusicVolume() {
    this.musicPlaying.volume = 0;
    this.setMutedState(true);
  }

  unMuteMusicVolume() {
    this.setMutedState(false);
    this.musicPlaying.volume = this.getVolumeState();
  }

  changeMusicVolume(newVolume) {
    this.musicPlaying.volume = newVolume;
    this.setVolumeState(newVolume);
    if (this.getMutedState()) {
      this.unMuteMusicVolume()
    }
  }

  getMutedState() {
    var isVolumeMuted = localStorage.getItem('isVolumeMuted') || false;
    return JSON.parse(isVolumeMuted);
  };

  setMutedState(option) {
    localStorage.setItem('isVolumeMuted', option);
  };

  getVolumeState() {
    var volume = localStorage.getItem('volume') || 1;
    return JSON.parse(volume);
  };

  setVolumeState(option) {
    localStorage.setItem('volume', option);
  };
}

const GameAudio = new _GameAudio();

export default GameAudio;
