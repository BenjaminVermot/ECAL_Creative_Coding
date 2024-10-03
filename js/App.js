import Letter from "./Letter.js"

export default class App{

  constructor()
  {
    this.canvas;
    this.ctx;
    this.letters = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.charArray = ["1"];
    this.mouseX;
    this.mouseY;
  }

  createCanvas(width, height)
  {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });

    this.canvas.addEventListener("mousemove", this.updateMousePosition.bind(this));
  }

  animate(x,y)
  {
    
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.width, this.height);

    let rayon = 20;
    let spaceX = this.width / x;
    let spaceY = this.height / y;

    this.letters = [];


    for(let i=0; i < x; i++){
      for(let j=0; j < y; j++){
        const randomIndex = Math.floor(Math.random() * this.charArray.length);
        let l = new Letter(this.ctx,(i * spaceX), (j * spaceY + rayon), this.charArray[randomIndex]);
        this.letters.push(l);
      }
    }

    for(let i = 0; i < this.letters.length; i++)
    {
      this.letters[i].draw();
      this.letters[i].calculateDistance(this.mouseX, this.mouseY);
      this.letters[i].updateFontSize();
      this.letters[i].updateFontColor();
    }
    requestAnimationFrame(this.animate.bind(this, x, y));
  }

  updateMousePosition(event) {
      let rect = this.canvas.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
      console.log(this.mouseX,this.mouseY);
  }

}


  

  // createGrid(x,y)
  // {
  //   let rayon = 30;
  //   let spaceX = window.innerWidth / x;
  //   let spaceY = window.innerHeight / y;

  //   for(let i=0; i < x; i++){
  //     for(let j=0; j < y; j++){
  //       let l = new Letter(this.ctx,(i * spaceX), (j * spaceY + rayon), Math.random() * (50 - 10) + 10, "1", "#6355FF")
  //       letters.push(l);
  //     }
  //   }

  //   for(let i = 0; i < letters.length; i++)
  //   {
  //   letters[i].draw();
  //   }

  // }

  // createGrid(x,y)
  // {
  //   let rayon = 30;
  //   let spaceX = window.innerWidth / x;
  //   let spaceY = window.innerHeight / y;

  //   for(let i=0; i < x; i++){
  //     for(let j=0; j < y; j++){
  //       let l = new Letter(this.ctx,(i * spaceX), (j * spaceY + rayon), 20 + i + j, "1", `rgb(${i * 12}, 0, 0)`)
  //       letters.push(l);
  //     }
  //   }

  //   for(let i = 0; i < letters.length; i++)
  //   {
  //   letters[i].draw();
  //   }

  // }

  //   createGrid(x,y)
  // {
  //   let rayon = 30;
  //   let spaceX = window.innerWidth / x;
  //   let spaceY = window.innerHeight / y;

  //   for(let i=0; i < x; i++){
  //     for(let j=0; j < y; j++){
  //       let l = new Letter(this.ctx,(i * spaceX), (j * spaceY + rayon), 20 + i + j, "1", `rgb(${i * 12}, 0, 0)`)
  //       letters.push(l);
  //     }
  //   }

  //   for(let i = 0; i < letters.length; i++)
  //   {
  //   letters[i].draw();
  //   }

  // }






