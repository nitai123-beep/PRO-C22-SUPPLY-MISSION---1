const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var helicopter,helicopterIMG;
var ground,groundanim; 
var z1,z2,z3,z4,z1A,z2A,z3A,z4A;
var edges;
var packageanim,package;
var count=0;
var gameState="play";
var bg;
var zGroup,pGroup;
var gameOver,gOanim;
var engine,world;


function preload()
{
	helicopterIMG=loadImage("helicopter right.png")
	helicopterleft = loadImage("helicopter left.png")
	packageanim=loadImage("package.png")
	z1A = loadAnimation("zom1ver1.png","zom1ver2.png","zom1ver3.png","zom1ver4.png")
	z2A = loadAnimation("zom2ver1.png","zom2ver2.png","zom2ver3.png","zom2ver4.png")
	z3A = loadAnimation("zom3ver1.png","zom3ver2.png","zom3var3.png","zom3ver4.png")
	z4A = loadAnimation("zom4ver1.png","zom4ver2.png","zom4ver3.png","zom4ver4.png")
	groundanim = loadAnimation("ground.png")
    bg = loadImage ("background1.jpeg")
	gOanim = loadImage("Game Over.png")

}

function setup() {
	createCanvas(800, 700);
	engine = Engine.create();
    world = engine.world;

	var package_options ={
		restitution:1
		}
		
		package = Bodies.rectangle (165,165,50,50,package_options);
		World.add(world,package);
			

		var ground_options ={
        isStatic: true

		}

	ground=Bodies.rectangle (width/2, height-35, width,10,ground_options);
	World.add(world,ground);
	if (keyDown ("b")) {

		Matter.Body.setStatic( package,false);
		
		}
	//ground.addAnimation("t1",groundanim);
	//ground.scale=1.2;

helicopter = createSprite(400,150,50,50);
helicopter.addAnimation("t2",helicopterIMG);
helicopter.scale=0.16;

gameOver = createSprite(200,350,50,50);
gameOver.addAnimation("t7",gOanim);
gameOver.visible=false;

zGroup = createGroup();
pGroup = createGroup();




}



function draw() {
 
	
background(bg);
Engine.update(engine);
  stroke("white");
  textSize(28);
  fill ("white");
  text("Score:"+count,650,50);
  stroke("white");
	textSize(28);
	fill ("black");
	text("Press Space",50,50);
	
    rectMode(CENTER);

	rect(ground.position.x,ground.position.y,800,70);

  if (gameState==="play"){

	
	if(keyDown("a")){

helicopter.velocityX=-9;
helicopter.addAnimation("t2",helicopterleft);

}

if(keyDown("DOWN_ARROW")){
	rectMode(CENTER);
	rect(helicopter.position.x,package.position.y,50,50);
}




package22();
if (zGroup.isTouching(pGroup)){
gameState="end"; 


}



}






if (gameState==="end"){
	

	
	zGroup.setLifetimeEach(-1);
	pGroup.setLifetimeEach(-1);
	pGroup.setVelocityYEach(0);
	zGroup.setVelocityXEach(0);
	helicopter.velocityX=0;
	gameOver.visible=true;
	stroke("white");
	textSize(28);
	fill ("white");
	text("Press Space",400,350);
		  
if (keyDown("space")){
	
	reset();
}
}



edges = createEdgeSprites();
helicopter.collide(edges[1]);
helicopter.collide(edges[0]);
zombie();

  drawSprites();
 
}

function zombie(){
if (frameCount%150===0){
z1 = createSprite(-20,590,10,10);
z1.addAnimation("t3",z1A);
z1.velocityX=7;
z1.lifetime=150;
zGroup.add(z1);
}

if (frameCount%120===0){
z2 = createSprite(-20,570,10,10);
z2.addAnimation("t4",z2A);
z2.velocityX=7;
z2.lifetime=150;
zGroup.add(z2);
}


if (frameCount%190===0){
z3 = createSprite(820,570,10,10);
z3.addAnimation("t5",z3A);
z3.velocityX=-7;
z3.lifetime=150;
zGroup.add(z3);
}


if (frameCount%220===0){
z4 = createSprite(820,570,10,10);
z4.addAnimation("t6",z4A);
z4.velocityX=-7;
z4.lifetime=150;
zGroup.add(z4);
}


}

function reset(){
	 gameState="play";
	 count=0;
	 zGroup.setLifetimeEach(0);
	 pGroup.setLifetimeEach(0);
	gameOver.visible=false;
}


function package22(){


//if (keyWentUp("space")){
	
//package = Bodies.rectangle (helicopter.x,165,50,50,package_options);
//World.add(world,package);
//package.addAnimation("t7",packageanim);
//package.scale=0.2;
//package.velocityY=9;

//	pGroup.add(package);	
//}
	
if (pGroup.isTouching(ground)){

	pGroup.setLifetimeEach(0);
	
count=count+10;
		
	}
		


}
