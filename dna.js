function DNA(genes) {
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < lifeSpan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxForce);
    }
  }

  this.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }

    }
    return new DNA(newgenes);
  }
  this.mutation = function()
  {
    var mutationRate = 0.02;
    if (bestFitness > 20) {
      mutationRate = 0.05;
    }
    if (bestFitness >= 300) {
      mutationRate = 0.01;
    }
    if (bestFitness == 4000) {
      mutationRate = 0;
    }
    for (var i = 0; i < this.genes.length; i++) 
    {
      if(random(1)<mutationRate)
      {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxForce);
      }
    }
  }

}