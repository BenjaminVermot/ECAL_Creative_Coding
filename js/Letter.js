export default class Letter{
    constructor(_context, _posX, _posY, _char){
        this.ctx = _context;
        this.posX = _posX;
        this.posY = _posY;
        this.char = _char;
        this.defaultSize = 30;
        this.color;
        this.distance;
        this.circleSize = 300;
    }

    draw(){
        
        this.ctx.font = `${this.size}px neue-haas-grotesk-display`;
        this.ctx.textAlign = "left";
        this.ctx.fillText(this.char, this.posX, this.posY);
    }   

    calculateDistance(mouseX, mouseY) {
      this.distance = Math.sqrt(
        Math.pow(mouseX - this.posX, 2) + Math.pow(mouseY - this.posY, 2)
      );
      return this.distance;
    }

    updateFontSize(){
      if(this.distance < this.circleSize){
        this.ctx.font = `${this.distance / 10}px neue-haas-grotesk-display`;
      }
      else{
        this.ctx.font = `${this.defaultSize}px neue-haas-grotesk-display`;
      }
    }

    updateFontColor(){
      
      

      if(this.distance < this.circleSize){
        this.color = `#00E0FF`
      }
      else{
        this.color = `#2A3FFF`
      }

      this.ctx.fillStyle = this.color;
    }

}