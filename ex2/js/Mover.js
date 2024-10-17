import Easing from "../js/Easing.js";

export default class Mover {
  constructor(ctx, x, y, w, h, r) {
    this.ctx = ctx;
    this.posX = x;
    this.posY = y;
    this.targetX = x;
    this.targetY = y;
    this.originX = x;
    this.originY = y;
    this.width = w;
    this.height = h;
    this.radius = r;
    this.color;
    this.colors = ["rgb(5, 235, 20)", "#2A3FFF", "rgb(255,0,0)"];
    this.easing = new Easing();
    this.isMovingRight = true;
    this.displacementAmount;
    this.displacementToCenter;

    this.speed = 0.01;
    this.timing = 0;
  }

  draw(num) {
    this.ctx.font = `30px Mondwest`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(`${num}`, this.posX, this.posY);
  }

  move() {
    this.timing += this.speed;
    this.posX =
      this.originX +
      (this.targetX - this.originX) * this.easing.elasticOut(this.timing);
    this.posY =
      this.originY +
      (this.targetY - this.originY) * this.easing.elasticOut(this.timing);
  }

  reset(w) {
    this.color = this.randomColor();
    this.displacementAmount = this.getRandomArbitrary(45, w - 45);
    console.log("reset");

    this.targetX = this.displacementAmount;

    this.targetY = this.posY; // Pas de déplacement en y
    this.originX = this.posX; // Réinitialisation à la position actuelle
    this.originY = this.posY;
    this.timing = 0; // Remise à zéro du timing
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  randomColor() {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }

  goBackToCenter() {
    console.log("GoBack");
  }
}
