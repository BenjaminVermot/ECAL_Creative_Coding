export default class Letter{
    constructor(_context, _posX, _posY, _char){
        this.ctx = _context;
        this.posX = _posX;
        this.posY = _posY;
        this.char = _char;
        this.defaultSize = 50;
        this.color;
        this.distance;
        this.circleSize = 300;
    }

    draw(){
        
        this.ctx.font = `${this.size}px neue-haas-grotesk-display`;
        this.ctx.textAlign = "center";
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
        this.ctx.font = `${this.distance / 10}px Mondwest`;
      }
      else{
        this.ctx.font = `${this.defaultSize}px Mondwest`;
      }
    }

    updateFontColor(){
      
      

      if(this.distance < this.circleSize){
        this.color = `rgb(255,0,0)`
      }
      else{
        this.color = `#2A3FFF`
      }

      if(this.distance < this.circleSize/2){
        this.color = `rgb(5,235,20)`
      }

      this.ctx.fillStyle = this.color;
    }

}