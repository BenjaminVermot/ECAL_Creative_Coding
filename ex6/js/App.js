import BaseApp from "../js/BaseApp";

export default class App extends BaseApp {
  constructor() {
    super();
    this.audioFile = "./ryoji.mp3";
    this.audio = new Audio(this.audioFile);
    this.audio.controls = true;
    document.body.appendChild(this.audio);
    this.isPlaying = false;
    this.init();
    this.colors = ["white", "black"];
    this.colorIndex = 0;
  }

  init() {
    document.addEventListener("click", (e) => {
      if (!this.audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.setup();
      }

      const position_souris_x = e.clientX;
      const pourcentage = position_souris_x / window.innerWidth;
      this.audio.currentTime = this.audio.duration * pourcentage;
      if (this.isPlaying == true) {
        this.audio.pause();
        this.isPlaying = false;
      } else {
        this.audio.play();
        this.isPlaying = true;
      }
    });
  }

  setup() {
    // on récupère le contexte audio
    this.audioContext = new AudioContext();
    // on crée un noeu source
    this.source = this.audioContext.createMediaElementSource(this.audio);
    // on  crée un noeu d'analyse
    this.analyser = this.audioContext.createAnalyser();
    // on crée un noeu destination
    this.destination = this.audioContext.destination;
    // on connecte le noeu source à l'analyseur
    this.source.connect(this.analyser);
    this.analyser.connect(this.destination);
    // on défini la taille du buffer ("résolution du son")
    this.analyser.fftSize = 256;
    //on crée un tableau de donnée pour l'analyse de fréquences
    this.dataArray = new Uint8Array(this.analyser.fftSize);
    this.waveArray = new Uint8Array(this.analyser.fftSize);

    this.draw();
  }

  analyseFrequencies() {
    this.analyser.getByteFrequencyData(this.dataArray);
  }

  analyseWaveform() {
    this.analyser.getByteTimeDomainData(this.waveArray);
  }

  draw() {
    this.analyseFrequencies();
    this.analyseWaveform();

    //this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height / 2);
    for (let i = 0; i < this.waveArray.length; i++) {
      const y = (this.waveArray[i] / 128) * this.height - this.height / 2;
      // this.ctx.lineTo(i * (this.width / this.waveArray.length), y);
      let randomArc = Math.random() * (Math.PI * 2 - Math.PI / 2) + Math.PI;
      let randomSize = Math.random() * (10 - 1) + 1;
      this.ctx.arc(
        i * (this.width / this.waveArray.length),
        y,
        randomSize,
        0,
        randomArc
      );
    }
    this.colorIndex = Math.floor(Math.random() * 2);
    this.ctx.stroke();
    this.ctx.strokeStyle = this.colors[this.colorIndex];
    this.ctx.lineWidth = 0.5;

    requestAnimationFrame(this.draw.bind(this));
  }
}
