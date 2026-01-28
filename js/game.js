const TILE_WIDTH = 100;
const TILE_HEIGHT = 50;
const BOT_WIDTH = 60;
const BOT_HEIGHT = 80;
const GRID_SIZE = 5;
const MAX_TILE_HEIGHT = 80;


let currentLevel = 0;
let levels = [
  [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 10, 1, 1],
  ],
  [
    [1, 5, 1, 1, 1],
    [1, 5, 5, 10, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ],
  [
    [1, 5, 5, 5, 10],
    [1, 1, 1, 5, 1],
    [10, 1, 1, 5, 1],
    [1, 1, 1, 5, 1],
    [1, 1, 1, 1, 1],
  ]
];

let grid = [];

let tile_images = [];
let comandQuery = [];
let x_start;
let y_start;
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
  x_start = width / 2 - TILE_WIDTH / 2;
  y_start = 50;
  botSprite = loadImage("./assets/botty_sample.png");
  
  for (let i = 0; i <= 34; i++) {
    tile_images.push(loadImage("./tiles/tile-" + i + ".png"));
  }
  
  loadLevel();
}

function loadLevel() {
  grid = [];
  for (let row of levels[currentLevel]) {
    grid.push([...row]);
  }
  
  bot.x = 0;
  bot.y = 0;
  bot.direction = 0;
  bot.z = 0;
  
  comandQuery = [];
  mainMethod.innerHTML = '';
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
  
  image(botSprite, x_screen - BOT_WIDTH / 2 + TILE_WIDTH / 2, y_screen, BOT_WIDTH, BOT_HEIGHT);
}

function draw() {
  background("black");
  draw_grid();
  draw_bot();
}

const buttons = document.querySelectorAll('.image-button');
const mainMethod = document.getElementById('main-method');

buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(event) {
  const buttonValue = event.currentTarget.value;
  comandQuery.push(buttonValue);
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

function moveFoward() {
  let newX = bot.x;
  let newY = bot.y + 1;
  
  if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
    let currentTile = grid[bot.y][bot.x];
    let targetTile = grid[newY][newX];
    if (targetTile === 5 && currentTile !== 5) {
      return;
    }
    if (currentTile === 5 && targetTile !== 5) {
      return;
    }
    
    bot.x = newX;
    bot.y = newY;
  }
}

function moveRight() {
  let newX = bot.x - 1;
  let newY = bot.y;
  
  if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
    let currentTile = grid[bot.y][bot.x];
    let targetTile = grid[newY][newX];
    
    if ((targetTile === 5 && currentTile !== 5) || 
        (currentTile === 5 && targetTile !== 5)) {
      return;
    }
    
    bot.x = newX;
  }
}

function moverLeft() {
  let newX = bot.x + 1;
  let newY = bot.y;
  
  if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
    let currentTile = grid[bot.y][bot.x];
    let targetTile = grid[newY][newX];

    if ((targetTile === 5 && currentTile !== 5) || 
        (currentTile === 5 && targetTile !== 5)) {
      return;
    }

    bot.x = newX;
  }
}

function jump() {
  let newX = bot.x;
  let newY = bot.y + 1;
  
  if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
    let currentTile = grid[bot.y][bot.x];
    let targetTile = grid[newY][newX];
    
    if ((targetTile === 5 && currentTile !== 5) || 
        (currentTile === 5 && targetTile !== 5) ||
        (targetTile !== 5 && currentTile !== 5)) {
      bot.x = newX;
      bot.y = newY;
    }
  }
}

async function playMovements() {
  const comandsExecution = [...comandQuery];
  const delayBetweenMovements = 500;
  
  for (let i = 0; i < comandsExecution.length; i++) {
    const comand = comandsExecution[i];
    
    switch(comand) {
      case 'frente':
        moveFoward();
        break;
      case 'direita':
        moveRight();
        break;
      case 'esquerda':
        moverLeft();
        break;
      case 'pulo':
        jump();
        break;
      case 'acender':
        switchLight();
        break;
    }
    if (i < comandsExecution.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayBetweenMovements));
    }
  }
}

function switchLight() {
  let currentTile = grid[bot.y][bot.x];
  
  if (currentTile === 10) {
    grid[bot.y][bot.x] = 15;
      if (currentLevel < levels.length - 1) {
        currentLevel++;
        setTimeout(() => {
          alert("Fase concluida com sucesso!")
          loadLevel();
        }, 500);
      }
    
  }
}

function stopGame() {
  currentLevel = 0;
  loadLevel();
}