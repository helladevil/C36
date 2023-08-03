var ballon,ballonImage1,ballonImage2;
// crea aquí la base de datos y la variable de posición 
var database;
var position;
var height = 0;

function preload(){
  bg =loadImage("Images/cityImage.png");
  ballonImage1=loadAnimation("Images/hotairballon01.png");
  balloonImage2=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
  "Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
  "Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png");
 }

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  ballon=createSprite(250,650,250,650);("hotairballon",ballonImage1);
  ballon.scale=0.5;

  var alturaDeGlobo = database.ref("ballon/height")
  alturaDeGlobo.on("value",readHeight,showError)
  textSize(20); 
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    ballon.loadAnimation("hotairballon01");
    updateheight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    ballon.loadAnimation("hotairballon01");
    updateheight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    ballon.loadAnimation("hotairballon01");
    updateHeight(0,-10);
    ballon.scale = ballon.scale-0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    ballon.loadAnimation("hotairballon01");
    updateheight(0,10);
    ballon.scale = ballon.scale+0.005;
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Usa las flechas del teclado para mover el globo aerostático!",40,40);

}


function updateHeight(x,y){
  database.ref('/ballon/height').update({
    'x': height.x + x ,
    'y': height.y + y
  })
}



function readHeight(data){
  // Asigna el valor de "data" como la altura
  height = data; 
  // Asigna el valor de "X" e "y" de la altura a las posiciones "x" e "y" respectivas del globo
  position = data.val();
  
  ballon.x = position.x ;
  ballon.y = position.y ;

}

function showError(){
  console.log("Error la escribir en la base de datos");
}
