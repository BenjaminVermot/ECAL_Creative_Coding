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
      x: Math.random() * 10,
      y: Math.random() * 10,
    };

    // Additional properties
    this.radius = 5;
    this.maxSpeed = 3;
    this.orientation = 0; // in radians
    this.isBlue = false;
  }

  attractToMouse(target) {
    const force = {
      x: target.x - this.position.x,
      y: target.y - this.position.y,
    };

    // Calculate distance
    const distance = Math.sqrt(force.x ** 2 + force.y ** 2);

    // Normalize the force vector
    if (distance > 0) {
      force.x /= distance;
      force.y /= distance;
    }

    // Scale the force by a factor (e.g., strength)
    const strength = 0.5; // Adjust this value to control the pull strength
    force.x *= strength;
    force.y *= strength;

    // Apply the force
    this.applyForce(force);
  }

  repelFromOther(other) {
    const force = {
      x: this.position.x - other.position.x,
      y: this.position.y - other.position.y,
    };

    const distance = Math.sqrt(force.x ** 2 + force.y ** 2);
    const minDistance = this.radius * 4; // Minimum allowed distance (no overlap)

    if (distance < minDistance && distance > 0) {
      // Normalize the force vector
      force.x /= distance;
      force.y /= distance;

      // Scale the force inversely proportional to the distance
      const strength = 1 - distance / minDistance; // Stronger force when closer
      force.x *= strength;
      force.y *= strength;

      this.applyForce(force);
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

    // Wrap around screen edges
    if (this.position.x > window.innerWidth) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = window.innerWidth;
    }

    if (this.position.y > window.innerHeight) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = window.innerHeight;
    }

    // Calculate orientation based on velocity direction
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.orientation = Math.atan2(this.velocity.y, this.velocity.x);
    }

    // Reset acceleration
    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }

  // Draw the particle
  draw(ctx) {
    ctx.save();

    // Move to particle position and rotate
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.orientation);

    // Draw particle as a triangle to show orientation
    ctx.beginPath();
    ctx.moveTo(this.radius * 2, 0);
    ctx.lineTo(-this.radius, -this.radius);
    ctx.lineTo(-this.radius, this.radius);
    ctx.closePath();

    if (!this.isBlue) {
      ctx.fillStyle = "#4564FF";
    } else {
      ctx.fillStyle = "#FF1971";
    }

    ctx.fill();

    ctx.restore();
  }

  isOverSVG(hiddenCtx) {
    // Obtenir la couleur du pixel sous la particule
    const pixel = hiddenCtx.getImageData(
      this.position.x,
      this.position.y,
      1,
      1
    ).data;

    // Si le canal alpha est > 0, la particule est sur le SVG
    return pixel[3] > 0;
  }
}
