var cities = [];
var totalCities = 6;
var order = [];
var count = 1;
var totalPermutations;
var recDist;
var bestEver;


function setup(){
  createCanvas(400, 600);
  for(var i = 0 ; i < totalCities ; i++){
    var v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;
  }
  recDist = calDist(cities, order);
  bestEver = order.slice();
  totalPermutations = factorial(totalCities);
}

function draw(){
  background(0);
  noFill();
  stroke(255, 100);
  strokeWeight(1);
  beginShape();
  for(var i = 0 ; i < order.length ; i++){
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  stroke(255, 0, 255);
  strokeWeight(4);
  beginShape();
  for(var i = 0 ; i < bestEver.length ; i++){
    var city = cities[bestEver[i]];
    vertex(city.x, city.y);
  }
  endShape();

  fill(255);
  noStroke();
  for(var i = 0 ; i < cities.length ; i++){
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  var d = calDist(cities, order);
  if(d < recDist){
    recDist = d;
    bestEver = order.slice();
  }
  textSize(32);
  var percent = 100 * (count / totalPermutations);
  text(nf(percent, 0, 2) + '% complete', 20, height - 100);

  nextOrder();
}

function calDist(points, order){
  var sum = 0;
  for(var i = 0 ; i < order.length - 1 ; i++){
    var cityA = points[order[i]];
    var cityB = points[order[i + 1]];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}


function nextOrder(){
  //STEP 1
  var largestI = -1;
  for (var i = 0 ; i < order.length - 1 ; i++){
    if(order[i] < order[i + 1]){
      largestI = i;
    }
  }
  if(largestI == -1) {
    console.log("finished");
    noLoop();
  }

  //STEP2
  var largestJ = largestI;
  for(var j = largestI + 1 ; j < order.length ; j++){
    if(order[largestI] < order[j]){
      largestJ = j;
    }
  }

  //STEP3
  swap(order, largestI, largestJ);

  //STEP4
  var subVals = order.splice(largestI + 1);
  var reverse_subVals = subVals.reverse();
  order = order.concat(reverse_subVals);

  count++;
}

function swap(a, i , j){
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function factorial(n){
  if(n == 1) {
    return 1;
  }
  else{
    return n * factorial(n - 1);
  }
}
