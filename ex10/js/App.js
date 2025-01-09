import BaseApp from "../js/BaseApp";
import Particle from "../js/Particle";

export default class App extends BaseApp {
  constructor() {
    super();
    this.mouse = { x: this.width / 2, y: this.height / 2 };
    this.isClicking = false;
    this.hiddenCanvas = document.createElement("canvas");
    this.hiddenCanvas.width = this.width;
    this.hiddenCanvas.height = this.height;
    this.hiddenCtx = this.hiddenCanvas.getContext("2d");

    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    this.canvas.addEventListener("mousedown", (e) => {
      this.isClicking = true;
    });
    this.canvas.addEventListener("mouseup", (e) => {
      this.isClicking = false;
    });
    this.particles = [];
    this.particleNumber = 1000;

    this.svgImage = new Image();
    this.svgImage.src = "fish.svg"; // Chemin du fichier SVG
    this.svgImage.onload = () => {
      // Dessiner le SVG sur le canvas
      console.log("svg drawned");
      this.hiddenCtx.drawImage(this.svgImage, 0, 0, this.width, this.height);
    };

    this.init();
  }

  init() {
    console.log("init");
    this.spawnParticles();
    this.draw();
  }

  spawnParticles() {
    for (let i = 0; i < this.particleNumber; i++) {
      let n = new Particle(
        Math.random() * this.width,
        Math.random() * this.height
      );
      this.particles.push(n);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    console.log("draw");
    this.hiddenCtx.clearRect(0, 0, this.width, this.height);
    this.hiddenCtx.save();
    this.hiddenCtx.translate(-this.width / 4, -this.height / 4);
    this.hiddenCtx.fillStyle = "#21A6FF";
    this.hiddenCtx.drawImage(
      this.svgImage,
      this.width / 2,
      this.height / 2,
      this.width / 2,
      this.height / 2
    );
    this.hiddenCtx.restore();

    this.particles.forEach((particle) => {
      // Applique l'attraction vers la souris
      if (this.isClicking) {
        particle.attractToMouse(this.mouse);
      }

      // Applique la répulsion avec les autres particules
      this.particles.forEach((other) => {
        if (particle !== other) {
          particle.repelFromOther(other);
        }
      });

      // Vérifie si la particule est sur le SVG
      if (particle.isOverSVG(this.hiddenCtx)) {
        particle.isBlue = true; // Change la couleur si au-dessus du SVG
      } else {
        particle.isBlue = false; // Rétablit la couleur si en dehors
      }

      particle.update();
      particle.draw(this.ctx);
    });

    // transformer le canvas en flip book
    requestAnimationFrame(this.draw.bind(this));
  }
}
