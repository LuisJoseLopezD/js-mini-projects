const canvas = document.getElementById("snake");

const ctx = canvas.getContext("2d");

// unit box
const box = 32;

// images method
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//snake array
let snake = [];

snake[0] = {
	x: 9*box,
	y: 10*box
}

//the food
let food = {
	x: Math.floor(Math.random()*17+1)*box,
	y: Math.floor(Math.random()*15+3)*box
}

// Math.floor devuelve el máximo entero menor a un número

//the score
let score = 0;

// Control the snake
document.addEventListener("keydown", direction);

let d;

function direction(evt){
	if(event.keyCode == 37 && d != "RIGHT"){		
		d = "LEFT";
	}else if(event.keyCode == 38 && d != "DOWN"){
		d = "UP";
	}else if(event.keyCode == 39 && d != "LEFT"){
		d = "RIGHT";
	}else if(event.keyCode == 40 && d != "UP"){
		d = "DOWN";
	}
}

// check collision 
function collision(head,array){
	for(let i = 0; i <array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y){
			return true;
		} 
	}
	return false;
}

// Drawing everything
function draw(){
	ctx.drawImage(ground,0,0);

	for( let i=0; i<snake.length; i++){
		ctx.fillStyle = (i == 0 )? "green" : "white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
	}

	ctx.drawImage(foodImg, food.x, food.y);

	//old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	//the direction
	if(d=="LEFT") snakeX -= box;
	if(d=="UP") snakeY -= box;
	if(d=="RIGHT") snakeX += box;
	if(d=="DOWN") snakeY += box;

	//eating the food
	if(snakeX == food.x && snakeY == food.y){
		score++;
		food = {
			x: Math.floor(Math.random()*17+1)*box,
			y: Math.floor(Math.random()*15+3)*box
		}
	// we don't remove the tail
	}else{
		snake.pop();
		// we remove the tail
	}

	//add new head
	let newHead = {
		x:snakeX,
		y:snakeY
	}

	//game over
	if (snakeX < box || snakeX >17*box || snakeY < 3*box || snakeY >17*box || collision(newHead, snake)){
		clearInterval(game);
	}

	snake.unshift(newHead);

	//the score
	ctx.fillStyle = "white";
	ctx.font = "45px changa one";
	ctx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,100);