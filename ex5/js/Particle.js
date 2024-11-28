export default class Particle {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.size = 4;
    this.fadeSpeed = 0.02;
    this.color = "blue";

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
      y: 0.5,
    };

    // Additional properties
    this.radius = 5;
    this.maxSpeed = 30;
    this.orientation = 0; // in radians

    this.initialized = false;
    this.isVisible = true;
  }

  setup() {
    if (this.initialized == false) {
      this.draw();
      this.initialized = true;
      setTimeout(() => {
        this.isVisible = false;
      }, "5000");
    }
  }

  draw() {
    if (this.isVisible == true) {
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();

      this.update();
      this.applyForce({ x: 0, y: 0.5 });
    }
  }

  // Apply force to the particle
  applyForce(force) {
    this.acceleration.x += force.x;
    this.acceleration.y += force.y;
  }

  // Update particle physics
  update() {
    // Update velocity by adding acceleration
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    // Limit speed
    const speed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y
    );
    if (speed > this.maxSpeed) {
      this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
      this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
    }

    // Update position by adding velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Handle screen boundaries (rebounds at 45 degrees)
    if (this.position.x > window.innerWidth) {
      this.position.x = window.innerWidth; // Éviter de dépasser la largeur
      this.velocity.x *= -Math.sqrt(2) / 2; // Bascule de direction à 45 degrés
      this.velocity.y *= Math.sqrt(2) / 2; // Bascule de direction à 45 degrés
    } else if (this.position.x < 0) {
      this.position.x = 0; // Éviter de dépasser la largeur
      this.velocity.x *= -Math.sqrt(2) / 2; // Bascule de direction à 45 degrés
      this.velocity.y *= Math.sqrt(2) / 2; // Bascule de direction à 45 degrés
    }

    if (this.position.y > window.innerHeight) {
      this.position.y = window.innerHeight; // Éviter de dépasser la hauteur
      this.velocity.x *= Math.sqrt(2) / 2; // Bascule de direction à 45 degrés
      this.velocity.y *= -Math.sqrt(2) / 2; // Bascule de direction à 45 degrés
    } else if (this.position.y < 0) {
      this.position.y = 0; // Éviter de dépasser la hauteur
      this.velocity.x *= Math.sqrt(2) / 2; // Bascule de direction à 45 degrés
      this.velocity.y *= -Math.sqrt(2) / 2; // Bascule de direction à 45 degrés
    }

    // Reset acceleration
    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }
}
