const TILE_WIDTH = 100;
const TILE_HEIGHT = 50;
const BOT_WIDTH = 60;
const BOT_HEIGHT = 80;
const GRID_SIZE = 10;
const MAX_TILE_HEIGHT = 80;

let grid = [
  [14, 23, 23, 23, 23, 23, 23, 23, 23, 13],
  [21, 32, 33, 33, 28, 33, 28, 33, 31, 20],
  [21, 34,  0,  0, 25, 33, 30,  1, 34, 20],
  [21, 34,  0,  0, 34,  1,  1, 10, 34, 20],
  [21, 25, 33, 33, 24, 33, 33, 33, 27, 20],
  [21, 34,  4,  7, 34, 18, 17, 10, 34, 20],
  [21, 34,  4,  7, 34, 16, 19, 10, 34, 20],
  [21, 34,  6,  8, 34, 10, 10, 10, 34, 20],
  [21, 29, 33, 33, 26, 33, 33, 33, 30, 20],
  [11, 22, 22, 22, 22, 22, 22, 22, 22, 12]
];


let tile_images = []
let comandQuery = [];
let x_start ;
let y_start ;
let botSprite;
let bot = {
  x: 0,  
  y: 0,  
  direction: 0,  
  z: 0   
};

function draw_tile(img, x, y) {
  let x_screen = x_start + (x - y) * TILE_WIDTH/2;
  let y_screen = y_start + (x + y) * TILE_HEIGHT/2;
  let z_offset = MAX_TILE_HEIGHT - img.height;
  
  image(img, x_screen, y_screen + z_offset);
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    x_start = width/2 - TILE_WIDTH/2; 
    y_start = 50;
    botSprite = loadImage("./assets/botty_sample.png")
    for (let i = 0; i <= 34; i++) {
    tile_images.push(loadImage("./tiles/tile-" + i + ".png"));
  }
}

function draw_grid() {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      draw_tile(tile_images[grid[j][i]], i, j);
    }
  }
}
function draw_bot() {
  let x_screen = x_start + (bot.x - bot.y) * TILE_WIDTH / 2;
  let y_screen = y_start + (bot.x + bot.y) * TILE_HEIGHT / 2;
  
  y_screen -= BOT_HEIGHT - TILE_HEIGHT;
  
  y_screen -= bot.z * 10;
  
  image(botSprite, x_screen - BOT_WIDTH/2 + TILE_WIDTH/2, y_screen, BOT_WIDTH, BOT_HEIGHT);
}

function draw() {
  background("black");
  draw_grid();
  draw_bot();
}

const buttons = document.querySelectorAll('.image-button');
const mainMethod = document.getElementById('main-method')

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(event) {
  console.log(event.target);
  const buttonValue = event.currentTarget.value;
  console.log("Valor do botão:",buttonValue);
   comandQuery.push(buttonValue);
   console.log('Current Array:', comandQuery);
   updateMainMethod();
}

function updateMainMethod() {
    mainMethod.innerHTML = '';
    comandQuery.forEach((comand, index) => {

        const comandoElement = document.createElement('div');
        comandoElement.className = 'image-button';
        const imgElement = document.createElement('img');
        
        switch(comand) {
            case 'frente':
                imgElement.src = './assets/comandos/arrow_up.png';
                imgElement.alt = 'avançar';
                break;
            case 'direita':
                imgElement.src = './assets/comandos/arrow_right.png';
                imgElement.alt = 'virar direita';
                break;
            case 'esquerda':
                imgElement.src = './assets/comandos/arrow_left.png';
                imgElement.alt = 'virar esquerda';
                break;
            case 'pulo':
                imgElement.src = './assets/comandos/jump.png';
                imgElement.alt = 'pular';
                break;
            case 'acender':
                imgElement.src = './assets/comandos/lightbulb.png';
                imgElement.alt = 'acender luz';
                break;
        }
        comandoElement.appendChild(imgElement);
        mainMethod.appendChild(comandoElement);
    });
}