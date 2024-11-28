export default class Mover {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.letter = "!";
    this.x = x;
    this.y = y;
    this.color = "white";
    this.scale = 2;

    this.position = {
      x: x || 0,
      y: y || 0,
    };

    // Velocity
    this.velocity = {
      x: 0,
      y: 0,
    };

    // Acceleration
    this.acceleration = {
      x: 0,
      y: 0,
    };

    this.maxSpeed = 3;
    this.orientation = 0; // in radians
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.letter, 0, 0);
    this.ctx.textAlign = "center";
    this.ctx.fill();
    this.ctx.restore();
  }
}
