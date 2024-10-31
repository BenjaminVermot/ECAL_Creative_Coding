import Circle from "./Circle.js";

export default class App {
  constructor() {
    this.canvas;
    this.ctx;
    this.margin;
    this.movers = [];
    this.createCanvas();

    // deuxième étape : dessiner le canvas
    this.setup();
    this.draw();
  }

  createCanvas(width = window.innerWidth, height = window.innerHeight) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
  }

  setup() {
    let x = 6;
    let y = 3;

    this.margin = this.width / x / 2;
    this.padding = 20;

    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        let m = new Circle(
          this.ctx,
          i * (this.width / x) + this.margin,
          j * (this.height / y) + this.margin,
          5,
          x,
          y,
          this.margin
        );
        this.movers.push(m);
      }
    }

    for (let i = 0; i < this.movers.length; i++) {
      this.movers[i].setup();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.movers.length; i++) {
      this.movers[i].draw(this.ctx, i);
      this.movers[i].move();
    }

    // transformer le canvas en flip book
    requestAnimationFrame(this.draw.bind(this));
  }
}
