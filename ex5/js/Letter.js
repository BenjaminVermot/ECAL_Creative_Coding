export default class Letter {
  constructor(ctx, letter, x, y) {
    this.ctx = ctx;
    this.letter = letter;
    this.x = x;
    this.y = y;
    this.color = "white";
    this.scale = 1;
    this.isOn = false;

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
    if (this.isOn == false) {
      this.letter = ".";
    } else {
      this.letter = "o";
      this.color = "white";
    }
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.letter, 0, 0);
    this.ctx.textAlign = "center";
    this.ctx.fill();
    this.ctx.restore();
  }

  on() {
    this.isOn = true;
  }
  off() {
    this.isOn = false;
  }
}
