export default class DrawingTool {
  constructor(ctx) {
    this.ctx = ctx;
    this.allPoints = [];
  }

  addPoint(x, y) {
    this.allPoints.push({ x, y });
  }

  draw(color) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(this.allPoints[0].x, this.allPoints[0].y);
    for (let i = 1; i < this.allPoints.length; i++) {
      this.ctx.lineTo(this.allPoints[i].x, this.allPoints[i].y);
    }
    this.ctx.stroke();
  }
}
