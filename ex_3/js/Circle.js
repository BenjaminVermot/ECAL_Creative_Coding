import DrawingTool from "./DrawingTool.js";
import Orbiter from "./Orbiter.js";

export default class Circle {
  constructor(ctx, x, y, radius, rowAmount, columnAmount, margin) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "black";
    this.colors = ["#4658FF", "#FF46E0", "#99F65F"];
    this.randomColorIndex = Math.floor(Math.random() * 3);
    this.randomAngle = Math.floor(Math.random() * 360);
    this.angleX = this.randomAngle;
    this.angleY = this.randomAngle;
    this.speedX = 1;
    this.speedY = 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.center = {
      x: x,
      y: y,
    };

    this.rowAmount = rowAmount;
    this.columnAmount = columnAmount;
    this.padding = 40;
    this.motion_radiusX = margin - this.padding;
    this.motion_radiusY = margin - this.padding;

    this.drawingTools = new DrawingTool(ctx);

    this.orbiter = new Orbiter(
      this.ctx,
      this.x,
      this.y,
      5,
      this.randomColorIndex
    );
  }

  setup() {
    this.angle = Math.random(40);
  }

  draw(ctx, num) {
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    // ctx.fill();

    ctx.fillStyle = this.colors[this.randomColorIndex];
    ctx.font = `32px Poppins`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${num}`, this.x, this.y);

    // this.drawingTools.addPoint(this.x, this.y);
    // this.drawingTools.draw("blue");

    this.orbiter.move();
    this.orbiter.draw(ctx, num);
  }

  move() {
    this.x =
      this.center.x +
      Math.cos((this.angleX * Math.PI) / 180) * this.motion_radiusX;
    this.y =
      this.center.y +
      Math.sin((this.angleY * Math.PI) / 180) * this.motion_radiusY;

    this.angleX += this.speedX;
    this.angleY += this.speedY;

    this.orbiter.x = this.x;
    this.orbiter.y = this.y;
  }
}
