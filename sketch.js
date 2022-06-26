const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, ground, cannon;
var balls = [];
var shots = 4
var pigs = 0
var pig1,pig2,pig3,pigImg
var block1,block2,block3

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  pigImg = loadImage("./assets/Pig1.png")
}

function setup() {
  canvas = createCanvas(1350, 650);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  pig1 = createSprite(600,620,10,10)
  pig1.addImage(pigImg)
  pig1.scale = 0.15

  pig2 = createSprite(1250,310,10,10)
  pig2.addImage(pigImg)
  pig2.scale = 0.15

  pig3 = createSprite(1000,465,10,10)
  pig3.addImage(pigImg)
  pig3.scale = 0.15

  block1 = createSprite(1250,560,40,150)
  block2 = createSprite(1250,408,40,150)
  block3 = createSprite(1000,560,40,150)

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  cannon = new Cannon(80, 575, 130, 100, angle);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  for (var i = 0; i < balls.length; i++) {
    showAngryBird(balls[i], i);
  }

  if(shots <= 0){
    background(255)
    shots = 0
    textSize(75)
    fill("red")
    text("Game Over",500,300)
    textSize(30)
    text("Pigs Killed : "+ pigs,600,400)
  }

  cannon.display();

  textSize(35)
  fill("red")
  text("Remaining Shots : " + shots ,10,30)

  textSize(50)
  fill("red")
  text("By Bewin" ,10,70)

  drawSprites()
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var angrybird = new Bird(cannon.x, cannon.y);
    angrybird.trajectory = [];
    Matter.Body.setAngle(angrybird.body, cannon.angle);
    balls.push(angrybird);
}
}

function showAngryBird(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
        ball.remove(index);
      
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
    shots = shots - 1
  }
}
