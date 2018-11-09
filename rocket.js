function Rocket(dna) {
  this.pos = createVector(width / 2, height - 30);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
    obstacles.forEach(obstacle => {
      if(segments_intersect(this.pos.x,this.pos.y, target.x,target.y, obstacle.pos.x,obstacle.pos.y-10, obstacle.pos.x+obstacle.size.x, obstacle.pos.y+obstacle.size.y-20)){
        this.fitness /= 10;
      }
    });
    if(this.completed)
    {
      this.fitness *= 10;
    }
    if(this.crashed)
    {
      this.fitness /= 10;
    }
  }
  this.update = function() {

    var d = dist(this.pos.x,this.pos.y,target.x,target.y);
    if(d<10)
    {
        this.completed = true;
        this.pos = target.copy();
    }
    if((this.pos.x > width || this.pos.x < 0) || (this.pos.y > height || this.pos.y < 0))
    {
      this.crashed = true;
    }

    obstacles.forEach(obstacle => {
      if(this.pos.x > obstacle.pos.x && this.pos.x < obstacle.pos.x + obstacle.size.x && this.pos.y > obstacle.pos.y && this.pos.y < obstacle.pos.y + obstacle.size.y)
      {
        this.crashed = true;
      } 
    });

    this.applyForce(this.dna.genes[count]);
    if(!this.completed && !this.crashed)
    {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }

  }

  this.show = function() {
    strokeWeight(0.5);
    var obstacleCount = 0;
    obstacles.forEach(obstacle => {
      if(segments_intersect(this.pos.x,this.pos.y, target.x,target.y, obstacle.pos.x,obstacle.pos.y-10, obstacle.pos.x+obstacle.size.x, obstacle.pos.y+obstacle.size.y-20)){
        ++obstacleCount;
      }
    });
    switch(obstacleCount) {
      case 0:
        stroke(0,255,0);
        break;
      case 1:
        stroke(0,0,255);
        break;
      case 2:
        stroke(255,0,0);
        break;
      default:
        break;
    }
    
    line(this.pos.x,this.pos.y, target.x,target.y);
    noStroke();
    push();
    noStroke();
    fill(255, 150)
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 50, 10, 20);
    pop();
  }
}