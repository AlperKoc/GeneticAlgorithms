var population;
var lifeSpan = 500;
var lifeP;
var count = 0;
var target;
var generation = 1;
var maxForce = 0.2;
var obstacles = [];

var averageFitness = 0;
var bestFitness = 0;

var timeText;
var generationText;
var averageFitnessText;
var bestFitnessText;
var sliderText;

var slider;
var sliderVal;
function segments_intersect(x1,y1, x2,y2, x3,y3, x4,y4) {
  ta_nom = (y3-y4)*(x1-x3) + (x4-x3)*(y1-y3);
  tb_nom = (y1-y2)*(x1-x3) + (x2-x1)*(y1-y3);
  t_denom = (x4-x3) * (y1-y2) - (x1-x2)*(y4-y3);
  
  if (t_denom === 0) {
    return false;
  } else {
    var ta = ta_nom / t_denom;
    var tb = tb_nom / t_denom;
      if (0 <= ta && ta <= 1 && 0 <= tb && tb <= 1) {
        return true;
      } else {
        return false;
      }
  }
}

function setup() {
  timeText = createP("Time: ")
  generationText = createP("Generation: ");
  averageFitnessText = createP("Average Fitness: ")
  bestFitnessText = createP("Best Fitness: ");
  

  createCanvas(400, 400);
  createP();
  slider = createSlider(1, 6, 1, 1);
  sliderText = createP("0");
  rocket = new Rocket();
  population = new Population();
  target = createVector(width / 2, 50);

  obstacles.push(new Obstacle(0, floor(height/3), floor(width*2/3)-20, 10));
  obstacles.push(new Obstacle(width - floor(width*2/3)+20, floor(height*2/3), floor(width*2/3)-20, 10));
}

function draw() {
  background(50);
  sliderVal = slider.value();
  sliderText = sliderText.html(sliderVal.toString());
  for(let i = 0; i < sliderVal; ++i) {
    population.run();
  
    timeText.html("Time: " + count);
    generationText.html("Generation: " + generation);
    bestFitnessText.html("Best Fitness: " + bestFitness);
    averageFitnessText.html("Average Fitness: " + averageFitness);
  
    count++;
    if (count == lifeSpan) {
      population.evaluate();
      population.selection();
      generation++;
      count = 0;
    }
    fill(255)
    for (let i = 0; i < obstacles.length; ++i) {
      const obstacle = obstacles[i];
      obstacle.show();
    }
  
    ellipse(target.x, target.y, 16, 16);
    population.run();
    timeText.html("Time: " + count);
    generationText.html("Generation: " + generation);
  
    count++;
    if (count == lifeSpan) {
      population.evaluate();
      population.selection();
      generation++;
      count = 0;
    }
    fill(255)
    for (let i = 0; i < obstacles.length; ++i) {
      const obstacle = obstacles[i];
      obstacle.show();
    }
  
    ellipse(target.x, target.y, 16, 16);
  }
}
