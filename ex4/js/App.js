import BaseApp from "./BaseApp";
import ParticleSystem from "./ParticleSystem";

export default class App extends BaseApp {
  constructor() {
    super();
    this.particleSystem = new ParticleSystem();

    // Initialiser la position du curseur de la souris
    this.mouseX = 0;
    this.mouseY = 0;

    // Ajouter les écouteurs d'événements
    this.canvas.addEventListener("mousemove", this.updateTarget.bind(this));
    this.canvas.addEventListener("click", this.inverse.bind(this));

    this.force = 3; // Force à appliquer pour déplacer les particules vers la souris
    this.setup();
    this.draw();

    this.strokeColor = "blue";
    this.isNegative = false;
  }

  setup() {
    // Créer des particules à la position du clic
    this.particleSystem.createParticles(200);
  }

  updateTarget(event) {
    // Mettre à jour les coordonnées de la souris
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  draw() {
    // Effacer le canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Mettre à jour et dessiner le système de particules
    this.particleSystem.update(0, 0, this.mouseX, this.mouseY, this.force);
    this.particleSystem.draw(this.ctx);
    this.drawCircle();

    // Continuer l'animation
    requestAnimationFrame(() => this.draw());
  }

  drawCircle() {
    this.r = 200;

    this.ctx.beginPath();
    this.ctx.arc(this.mouseX, this.mouseY, this.r, 0, 2 * Math.PI); // Définir l'arc (cercle)
    this.ctx.strokeStyle = this.strokeColor; // Couleur de remplissage
    this.ctx.stroke();
    this.ctx.closePath();
  }

  inverse() {
    if (this.isNegative == false) {
      this.strokeColor = "red";
      this.isNegative = true;
    } else {
      this.strokeColor = "blue";
      this.isNegative = false;
    }

    this.force = this.force * -1;
  }
}
