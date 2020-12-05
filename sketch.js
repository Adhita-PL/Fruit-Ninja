var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword, swordImage;
var pattern;

function preload(){
  
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png"); // p
  fruit2 = loadImage("fruit2.png"); // a
  fruit3 = loadImage("fruit3.png"); // p
  fruit4 = loadImage("fruit4.png"); // b
  
  enemy = loadImage("alien1.png")
  enemy2 = loadImage("alien2.png")
  
  gameoverImage = loadImage("gameover.png");
  
  knifeSwooshSound = loadSound("KnifeStab.mp3");
  gameOverSound = loadSound("game-over.mp3");
}

function setup(){
  bg = loadImage("Background.png");
  createCanvas(500, 400);
  score = 0;
  
  gameover = createSprite(250,100,20,20);
  gameover.addImage(gameoverImage); 
  gameover.scale=1;
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage); 
  sword.scale=0.7;
  
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw(){
  background(bg);
  if(gameState === PLAY) {
      gameover.visible = false;
      score.visible = true;
      sword.x = World.mouseX;
      sword.y = World.mouseY;
    
      fill("white");
      textSize(15);
      stroke("black");
      strokeWeight("5");
      text("Score: "+ score, 420,30);
    
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 1;
    }
      if (enemyGroup.isTouching(sword)) {
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        gameOverSound.play();
        gameState = END;
    } 
      fruits();
      Enemy();
   } else if(gameState === END) {
      gameover.visible = true;
      gameover.y = 100;
      gameover.x = 250;
      fruitGroup.visible = false;
      sword.visible = false;
     
      fill("white");
      textSize(25);
      stroke("black");
      strokeWeight("5");
      text("Score: "+ score, 200,150);
  }        
  
  
  drawSprites(); 
}
function fruits() {
  if (frameCount % 60 === 0){
   position = Math.round(random(1,2));
   var fruit = createSprite(500,200,20,20);
    if(position==1) {
      fruit.x=500;
      fruit.velocityX = -(7+(score/4));
      } else if(position==2) {
        fruit.x=0;
        fruit.velocityX = (7+(score/4));
    }
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
     fruit.scale = 0.2;
     fruit.setLifetime=100;
     
      fruitGroup.add(fruit);
   }
}
function Enemy() {
 if (frameCount % 200 === 0){
   position = Math.round(random(1,2));
   var enemy1 = createSprite(500,200,10,40);
   if(position==1) {
      enemy1.x=500;
      enemy1.velocityX = -(7+(score/10));
      } else if(position==2) {
        enemy1.x=0;
        enemy1.velocityX = (7+(score/10));
    }
  
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: enemy1.addImage(enemy);
              break;
      case 2: enemy1.addImage(enemy2);
            break;
      default: break;
    }
     enemy1.scale = 0.7;
     enemy1.setLifetime=50;
     
      enemyGroup.add(enemy1);
   } 
}

