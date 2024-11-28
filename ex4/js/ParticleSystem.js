import Particle from "./Particle";

export default class ParticleSystem {
  constructor() {
    this.particles = []; // Number of particles to create per click
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isClicking = false;
  }

  createParticles(amount) {
    for (let i = 0; i < amount; i++) {
      const particle = new Particle(
        Math.random() * this.width,
        Math.random() * this.height
      );

      // // Give each particle a random initial velocity
      // const angle = Math.random() * Math.PI * 2;
      // const magnitude = Math.random() * 20; // Random initial speed

      // particle.velocity.x = Math.cos(angle) * magnitude;
      // particle.velocity.y = Math.sin(angle) * magnitude;

      this.particles.push(particle);
    }
  }

  update(x, y, mouseX, mouseY, force) {
    for (const particle of this.particles) {
      // Add some gravity or other forces here if desired
      particle.applyForce({ x: x, y: y }); // Example: gravity
      particle.applyForceTowardsMouse(mouseX, mouseY, force); // Example: gravity
      particle.applyRandomTurning(Math.random() * (0.2 - -0.2) + -0.2); // Example: gravity
      particle.update();
    }
  }

  draw(ctx) {
    for (const particle of this.particles) {
      particle.draw(ctx);
    }
  }
}
