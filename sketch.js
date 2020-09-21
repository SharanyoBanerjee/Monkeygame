var invisibleGround;
var monkey , monkey_running
var bananaImage,  obstacleImage
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var background,backGroundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backGroundImage = loadImage("bg nat.png")
 
}



function setup() {
  
  backGround = createSprite(200,200,350,400);
  backGround.velocityX = -4;
  backGround.addImage(backGroundImage);
  backGround.scale = 5;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  //console.log(ground.x)
  
  invisibleGround = createSprite(200,340,400,10);
  invisibleGround.visible = false;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
 
 FoodGroup = createGroup();
 obstacleGroup = createGroup();
  
}


function draw() {
  background("white")
  
  if (backGround.x < 100){
      backGround.x = backGround.width/2;
    }

  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")&& monkey.y >= 299){
    monkey.velocityY = -12;
    
  }
  
  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach();
    score = score+1;
     }
  if(monkey.isTouching(obstacleGroup)){
     score = 0;
  }
  
  //console.log(monkey.y)
  monkey.velocityY = monkey.velocityY+0.8;
  food();
  spawnObstacles();
  monkey.collide(invisibleGround);
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black")
  text("Score:"+score,300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("SurvivalTime:"+survivalTime,100,50);
  }


function food() {
  if(World.frameCount%80===0) {
  
  var banana = createSprite(390,300,20,20)
  banana.y = Math.round(random(190,250))
  banana.addImage(bananaImage);
  banana.scale = 0.08;
  banana.velocityX = -4;
  banana.Lifetime = 100;
  FoodGroup.add(banana)
 }
}
function spawnObstacles() {
  if (frameCount % 300 === 0) {
  var obstacle = createSprite(395,320,30,30);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.17;
  obstacle.velocityX = -4
  obstacle.Lifetime = 300;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  obstacleGroup.add(obstacle)
 }
}



