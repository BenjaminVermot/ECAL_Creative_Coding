export default class Circle {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx;
    this.posX = x;
    this.posY = y;
    this.velX = 0;
    this.velY = 0;
    this.originX = x;
    this.originY = y;
    this.targetPosX = x;
    this.targetPosY = y;
    this.radius = radius;
    this.color = "black";
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();

    console.log(this.posY);
  }

  updatePosX(newPos) {
    this.posX = newPos;
  }
  updatePosY(newPos) {
    this.posY = newPos;
  }

  move() {
    //const distToTargetX = this.targetPosX - this.posX;
    const distToTargetY = this.targetPosY - this.posY;
    const springForce = 150;
    const springDamping = 10;
    //const forceX = distToTargetX * springForce - this.velX * springDamping;
    const forceY = distToTargetY * springForce - this.velY * springDamping;
    //this.velX += forceX;
    this.velY += forceY;
    //this.posX += this.velX;
    this.posY += this.velY;
  }
}
