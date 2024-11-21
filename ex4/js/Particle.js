export default class Particle {
  constructor(x, y) {
    // Position
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

    // Additional properties
    this.radius = 5;
    this.maxSpeed = 3;
    this.orientation = 0; // in radians
    this.color = "blue";
  }

  clicking() {
    this.isClicking = true;
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

    // Calculate orientation based on velocity direction
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.orientation = Math.atan2(this.velocity.y, this.velocity.x);
    }

    // Reset acceleration
    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }

  applyForceTowardsMouse(mouseX, mouseY, force) {
    // Calculer la direction vers la souris
    const dx = mouseX - this.position.x;
    const dy = mouseY - this.position.y;

    // Calculer la distance
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normaliser le vecteur directionnel
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    // Appliquer la force dans cette direction
    if (distance < 200) {
      if (this.isClicking == false) {
        this.applyForce({
          x: normalizedDx * force,
          y: normalizedDy * force,
        });
      } else {
        this.applyForce({
          x: normalizedDx * -force,
          y: normalizedDy * -force,
        });
      }
    }
  }

  // Draw the particle
  draw(ctx) {
    ctx.save();

    // Move to particle position and rotate

    // Draw particle as a triangle to show orientation
    // ctx.beginPath();
    ctx.font = `30px Poppins`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.color;
    ctx.fillText(`DVD`, this.position.x, this.position.y);
    // ctx.moveTo(this.radius * 2, 0);
    ctx.closePath();

    ctx.rotate(this.orientation);
    ctx.translate(this.position.x, this.position.y);

    ctx.restore();
  }
}
