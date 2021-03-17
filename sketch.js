//variables
var monkeyImage, monkey ;
var banana, bananaImage, jungle, jungleImage;
var stone, stoneImage;

//count
var count = 0;

var invisibleGround;
var over; 

//play
var PLAY = 1;

//end
var END = 0;

//game state
var gameState = PLAY;

//loading images
function preload()
{
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png", "Monkey_04.png",     "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  jungleImage = loadAnimation("jungle.jpg");
  
  bananaImage = loadAnimation("banana.png");
  stoneImage = loadAnimation("stone.png");

}

//setup
function setup() 
{
  //canvas
  createCanvas(400, 400);
  
  //jungle
  jungle = createSprite(200,200,400,400);

  //adding animation
  jungle.addAnimation("moving", jungleImage);

  //scale
  jungle.scale = 0.56

  //velocity
  jungle.velocityX = -4;
  
  //monkey
  monkey = createSprite(80,320,10,10);
  monkey.addAnimation("Running", monkeyImage);
  monkey.scale = 0.1
  
  //invisible ground
  invisibleGround = createSprite(200,360,400,20);
  invisibleGround.visible = false;
  
  //grouping
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  //over
  over = createSprite(200,200,400,400);
  over.visible = false
 
}

//draw
function draw() 
{
  //background design after game ends[EXTRA]
  background("skyblue");
  
  //PLAY
  if(gameState === PLAY)
  {
  //collide
  monkey.collide(invisibleGround);
    
  if (jungle.x<200)
  {
    //size
    jungle.x = jungle.width/4;
  }
    
  monkey.velocityY = monkey.velocityY+0.8;

  //calling functions
  spawnBanana();
  spawnStone();
  
  if (keyDown("space") && monkey.y>285)
  { 
    //jumping monkey
    monkey.velocityY = -12;
  }
  
  if (bananaGroup.isTouching(monkey))
  {
    //increment of score
    count = count+10; 

    //destroy
    bananaGroup.destroyEach();
  } 
 
 switch(count)
  {
    case 10 : monkey.scale = 0.12;
              break;
    case 20 : monkey.scale = 0.14;
              break;    
    case 30 : monkey.scale = 0.16;
              break;  
    case 40 : monkey.scale = 0.18;
              break;    
    default : break;   

  }            
  if (stoneGroup.isTouching(monkey) && monkey.scale<0.11)
  { 

    //chaning to game state end
    monkey.scale = 0.1
    count = 0;

    //destroy each
    stoneGroup.destroyEach();
    gameState  = END;
  }
    
   if (stoneGroup.isTouching(monkey))
   {

     monkey.scale = 0.1
     count = 0;

     //destroy each
     stoneGroup.destroyEach();
   }
  
  }  
  
  //END
  else if (gameState === END)
  {
    
    //destroy
    monkey.destroy();
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    jungle.destroy();
    over.visible = false;

    //game over

    //game over design[EXTRA]
    textSize(30);
    fill("red");
    stroke("black");
    stroke("green");

    //text
    text("GAME OVER!",130,200);
    
  }

  drawSprites();
  
  //PLAY
  if (gameState===PLAY)
  {

  //score text
  fill("brown");
  textSize(18);
  text("Score: " + count, 300,100);
  }
}  
 //spawning bananas
 function spawnBanana()
{
  if(frameCount % 60 === 0) 
  {

  //banana
  banana = createSprite(400,random(170,240));
  banana.addAnimation("flying", bananaImage);
  banana.velocityX = -6
    
  //scale and lifetime         
  banana.scale = 0.05;
  banana.lifetime = 300;

  //adding each obstacle to the group
  bananaGroup.add(banana);

    
  }
}

//spawning stones
function spawnStone()
{
  if(frameCount % 80 === 0) 
  {

  //stone
  stone = createSprite(400,340);
  stone.addAnimation("banana", stoneImage);
  stone.velocityX = -6
    
  //scale and lifetime          
  stone.scale = 0.09;
  stone.lifetime = 300;

  //adding each obstacle to the group
  stoneGroup.add(stone);
    
  }
}

