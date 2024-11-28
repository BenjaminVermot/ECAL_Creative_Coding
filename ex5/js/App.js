import BaseApp from "./BaseApp";
import Letter from "./Letter";
import Particle from "./Particle";
import Webcam from "./Webcam";

export default class App extends BaseApp {
  constructor() {
    super();
    this.ctx.willReadFrequently = true;
    this.ctx.font = "14px monospace";
    this.letters = [];
    this.movers = [];
    this.pixelcolors = [];
    this.webcam = new Webcam();
    this.init();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  loadImage(src) {
    return new Promise((resolve) => {
      this.image = new Images();
      this.image.onload = resolve;
      this.image.src = src;
    });
  }

  loadVideo(src) {
    return new Promise((resolve) => {
      this.image = new Webcam();
      this.image.onload = resolve;
      this.image.src = src;
    });
  }

  init() {
    //charger l'image MAIS le "await" indique qu'il faut attendre que l'action soit finie avant de lire la suite du code. Ca veut dire que la foction est asynchorne d'ou le async
    //Async et await fonctionnent obligatoireemnt ensemble
    // await this.loadVideo();

    //Init a grid of letters
    this.gridResolution = 120;
    for (let i = 0; i < this.gridResolution; i++) {
      for (let j = 0; j < this.gridResolution; j++) {
        this.letters.push(
          new Letter(
            this.ctx,
            "B",
            (i * 1200) / this.gridResolution,
            (j * 1200) / this.gridResolution
          )
        );
      }
    }

    this.draw();
  }

  draw() {
    this.ctx.drawImage(this.webcam.video, 0, 0, 1200, 1200);
    //recuperer les informations de couleurs d'un point précis sur l'image
    const pixels = this.ctx.getImageData(0, 0, 1200, 1200).data;
    this.ctx.fillStyle = "black";

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.letters.forEach((letter) => {
      letter.draw();
      const i = (letter.y * 1200 + letter.x) * 4;
      //letter.color = `rgb(${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]})`;
      letter.scale = this.getLuminance([
        pixels[i],
        pixels[i + 1],
        pixels[i + 2],
      ]);

      let brightColor = "green";
      let brightness = this.getLuminance([
        pixels[i],
        pixels[i + 1],
        pixels[i + 2],
      ]);
      if (brightness > 0.3) {
        letter.color = "#0913CF";
      }

      if (brightness > 0.5) {
        letter.color = "#4AFF13";
        letter.letter = "!";
      }

      if (brightness > 0.65) {
        letter.color = "#FFF200";
        letter.letter = "X";
      }

      if (brightness > 0.8) {
        letter.color = "#C40000";
      }

      if (brightness > 0.95) {
        let r = Math.floor(Math.random() * 2000);
        if (r == 30) {
          let n = new Particle(this.ctx, letter.x, letter.y);
          this.movers.push(n);
          n.setup();
        }
        letter.on();
      } else {
        letter.off();
      }

      if (brightness < 0.1) {
        letter.color = "black";
      }
    });

    this.movers.forEach((mover) => {
      mover.draw();
    });

    requestAnimationFrame(() => this.draw());
  }

  getLuminance(rgb) {
    return (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  }
}
