import DrawingTool from "./DrawingTool.js";

export default class Orbiter {
  constructor(ctx, x, y, radius, c) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "black";
    this.lineColors = ["#4658FF", "#FF46E0", "#99F65F"];
    this.randomAngle = Math.floor(Math.random() * 360);
    this.angleX = this.randomAngle;
    this.angleY = this.randomAngle;
    this.colorIndex = c;

    this.speedX = Math.floor(Math.random() * (16 - 4) + 4);
    this.speedY = Math.floor(Math.random() * (16 - 4) + 4);
    this.center = {
      x: x,
      y: y,
    };

    this.motionRadius = Math.floor(Math.random() * (30 - 8) + 8);
    this.motion_radiusX = this.motionRadius;
    this.motion_radiusY = this.motionRadius;

    this.drawingTools = new DrawingTool(ctx);

    this.letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  }

  setup() {
    this.angle = Math.random(40);
  }

  draw(num) {
    this.ctx.fillStyle = this.lineColors[this.colorIndex];
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();

    this.drawingTools.addPoint(this.x, this.y);

    this.drawingTools.draw(this.lineColors[this.colorIndex]);
  }

  move() {
    this.x =
      this.x + Math.cos((this.angleX * Math.PI) / 180) * this.motion_radiusX;
    this.y =
      this.y + Math.sin((this.angleY * Math.PI) / 180) * this.motion_radiusY;

    this.angleX += this.speedX;
    this.angleY += this.speedY;
  }
}
