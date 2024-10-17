import Mover from "../js/Mover.js";

export default class App {
  constructor() {
    this.canvas;
    this.ctx;
    this.margin = 40;
    this.movers = [];
    this.moverAmount = 60;
    this.moverIndex = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.setup();
    this.draw();
    this.initInteraction();
  }

  setup() {
    this.createCanvas(window.innerWidth, window.innerHeight);
    this.instantiateMovers();

    for (let i = 0; i < this.movers.length; i++) {
      this.movers[i].reset(this.width);
    }

    let myTimeOut = setTimeout(this.goBack, 1000);
  }

  goBack() {
    for (let i = 0; i < this.movers.length; i++) {
      this.movers[i].goBackToCenter();
    }
  }

  initInteraction() {
    document.addEventListener("click", (e) => {
      for (let i = 0; i < this.movers.length; i++) {
        this.movers[i].reset(this.width);
      }
    });
  }

  draw() {
    //clear canvas
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.movers.length; i++) {
      this.movers[i].draw(i + 1);
      this.movers[i].move();
    }
    //loop back
    requestAnimationFrame(this.draw.bind(this));
  }

  createCanvas(width, height) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.body.appendChild(this.canvas);

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
  }

  instantiateMovers() {
    for (let i = 0; i < this.moverAmount; i++) {
      //set width
      //set height
      let s = (this.canvas.height - 2 * this.margin) / this.moverAmount;

      let m = new Mover(
        this.ctx,
        this.width / 2,
        this.margin + s * i,
        30,
        30,
        15
      );
      this.movers.push(m);
    }
  }

  // startMoving() {
  //   console.log(this.moverIndex);
  //   let i = 0;

  //   if (i < this.moverAmount) {
  //     this.movers[i].reset();
  //   }
  //   if (i >= this.moverAmount) {
  //     i = 0;
  //     this.movers[i].reset();
  //   }
  //   i++;
  // }
}
