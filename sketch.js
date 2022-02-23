var carlos;
var esquare;
var etriangle;
var ground;
var platform1;
var platform2;
var shop;
var coin;
var score = 0
var flag = 0

function preload()
{
 Esquare = loadImage("RedTriangle.png")
 Ishop = loadImage("GameShop.png")
 Icoin = loadImage("GoldCoin.png")
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);

  carlos = createSprite(500,643,50,50);
  carlos.shapeColor = "cyan"

 // esquare = createSprite(500,200,400,20);

  etriangle = createSprite(500,639,400,20);
  etriangle.addImage(Esquare);
  etriangle.scale = 0.1;

  ground = createSprite(width/2,height-20,1100,500)
  ground.shapeColor = "white";

  platform1 = createSprite(600,400,200,40);
  platform2 = createSprite(1200,400,200,40)
  platform1.shapeColor = "white"
  platform2.shapeColor = "white"

  shop = createSprite(900,570,200,200)
  shop.addImage(Ishop);
  shop.scale = 0.5

  coinsgroup = new Group()
}

function draw() 
{
  background("black")
  drawSprites()
  textSize(30)
  fill("red")
  text("Score ="+score,width/2,200)
  coins()

  if(keyDown("space")){
    carlos.velocityY = -10
  }
  if(keyDown(LEFT_ARROW)){
    carlos.x = carlos.x-5
    etriangle.x = carlos.x-200
  }
  if(keyDown(RIGHT_ARROW)){
    carlos.x = carlos.x+5
    etriangle.x = carlos.x-100
    etriangle.y = carlos.y-30
  }
  if(carlos.x > width/2 ){
    etriangle.x = carlos.x-400 
  etriangle.y = carlos.y-10
  }
  else if(carlos.x < width/2-50){
    etriangle.x = carlos.x-300
    etriangle.y = carlos.y-20
  }
  else{
    etriangle.velocityX = -10
    etriangle.velocityY = 10
  }
  carlos.velocityY = carlos.velocityY+0.8
  carlos.collide(ground)
  carlos.collide(platform1)
  carlos.collide(platform2)

  if(carlos.isTouching(coinsgroup)){
    coinsgroup.destroyEach()
    score = score+5
  }
  if(frameCount == 1000){
    flag = 1
  }
  if(flag == 1){
    if(score == 50){
      text("You Win!",width/2,height/2)
    }
    else{text("You didn't collect enough coins..",width/2, height/2)}
  }
  if(carlos.isTouching(shop)){
   // buying()
  }
}

function buying(){
  swal({
    title: `Buy Upgrades Here.`,
    text: "Using the coin you have aquired, buy upgrades for the enemy's ahead.",
    confirmButtonText: "Ok"
  });

}

function coins(){
  if(frameCount%100==0){
    coin = createSprite(200,200,100,100)
    coin.x = Math.round(random(100,width-200))
    coin.y = Math.round(random(100,height/2))  
    coin.addImage(Icoin)
    coin.lifetime = 100;
    coin.scale = 0.02
    coinsgroup.add(coin)
  }
}





