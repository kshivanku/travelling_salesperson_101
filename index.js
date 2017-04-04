var cities = [];
var totalCities = 10;
var recDist;
var bestEver;

function setup(){
  createCanvas(400, 300);
  for(var i = 0 ; i < totalCities ; i++){
    var v = createVector(random(width), random(height));
    cities[i] = v;
  }
  recDist = calDist(cities);
  bestEver = cities.slice();
}

function draw(){
  background(0);

  noFill();
  stroke(255);
  strokeWeight(1);
  beginShape();
  for(var i = 0 ; i < cities.length ; i++){
    vertex(cities[i].x, cities[i].y);
  }
  endShape();

  stroke(255, 0, 255);
  strokeWeight(4);
  beginShape();
  for(var i = 0 ; i < bestEver.length ; i++){
    vertex(bestEver[i].x, bestEver[i].y);
  }
  endShape();

  fill(255);
  noStroke();
  for(var i = 0 ; i < cities.length ; i++){
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  var i = floor(random(cities.length));
  var j = floor(random(cities.length));
  swap(cities, i , j);
  var d = calDist(cities);
  if(d < recDist){
    recDist = d;
    bestEver = cities.slice();
    console.log(recDist);
  }
}

//It randomly swaps the array so it may never stumble upon the optimal solution and will never know if it has checked all possibilities
function swap(a, i , j){
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calDist(points){
  var sum = 0;
  for(var i = 0 ; i < points.length-1 ; i++){
    var d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    sum += d;
  }
  return sum;
}
