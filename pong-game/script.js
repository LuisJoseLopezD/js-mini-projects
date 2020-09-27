// select the canvas
const canvas = document.getElementById("pong");

// Apply methods and props
const context = canvas.getContext("2d");

// user paddle
const user = {
	x: 0,
	y: canvas.height/2 - 100/2,
	width: 10,
	height: 100,
	color: "WHITE",
	score: 0
}

// computer paddle
const computer = {
	x: canvas.width -10,
	y: canvas.height/2 - 100/2,
	width: 10,
	height: 100,
	color: "WHITE",
	score: 0
}

// draw rect function
function drawRect(x,y,w,h,color){
	context.fillStyle = color;
	context.fillRect(x,y,w,h);
}

// the net
const net = {
	x: canvas.width/2 -1,
	y: 0,
	width: 2,
	height: 10,
	color: "WHITE"
}

function drawNet(){
	for(let i = 0; i <= canvas.height; i+=15){
		drawRect(net.x, net.y+i, net.width, net.height, net.color);
	}
}

// the ball
const ball = {
	x: canvas.width/2,
	y: canvas.height/2,
	radius: 10,
	speed: 5,
	velocityX: 5,
	velocityY: 5,
	color: "WHITE"
}

function drawBall(x,y,r,color){
	context.fillStyle = color;
	context.beginPath();
	context.arc(x,y,r,0,Math.PI*2,false);
	context.closePath();
	context.fill();
}

// the ball center
const ballCenter = {
	x: canvas.width/2,
	y: canvas.height/2,
	radius: 30,
	color: "WHITE"
}

function drawBallCenter(x,y,r,color){
	context.fillStyle = color;
	context.beginPath();
	context.arc(x,y,r,0,Math.PI*2,false);
	context.closePath();
	context.fill();
}

// draw score function
function drawScore(text,x,y,color){
	context.fillStyle = color;
	context.font = "45px fantasy";
	context.fillText(text,x,y);
}

// render function
function render(){
	// clear the canvas
	drawRect(0, 0, canvas.width, canvas.height, "GREEN")

	// draw the net
	drawNet();

	// draw score
	drawScore(user.score,canvas.width/4,canvas.height/5,"WHITE");
	drawScore(computer.score,3*canvas.width/4,canvas.height/5,"WHITE");

	// draw the user and computer paddle
	drawRect(user.x, user.y, user.width, user.height, user.color);
	drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);	

	// draw the ball
	drawBall(ball.x, ball.y, ball.radius, ball.color);

	// draw ball center
	drawBallCenter(ballCenter.x, ballCenter.y, ballCenter.radius, ballCenter.color);
}

// control de user paddle
canvas.addEventListener("mousemove", movePaddle);
function movePaddle(evt){
	let rect = canvas.getBoundingClientRect();

	user.y = evt.clientY - rect.top - user.height/2;
}

// Collisions
function collision(b,p){
	b.top = b.y - b.radius;
	b.bottom = b.y + b.radius;
	b.left = b.x - b.radius;
	b.right = b.x + b.radius;
	
	p.top = p.y;
	p.bottom = p.y + p.height;
	p.left =p.x;
	p.right =p.x + p.width;

	return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

//reset ball
function resetBall(){
	ball.x = canvas.width/2;
	ball.y = canvas.height/2;

	ball.speed = 5;
	ball.velocityX = -ball.velocityX;
}

// update function moves, score
function update(){
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;

	// simple AI to control computer paddle
	let computerLevel = 0.1;
	computer.y += (ball.y - (computer.y + computer.height/2))*computerLevel;

	if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
		ball.velocityY = -ball.velocityY;
	}

	let player = (ball.x < canvas.width/2) ? user : computer;
	
	if(collision(ball,player)){
		// where the ball hit the player
		let collidePoint = ball.y - (player.y + player.height/2)

		// normalization
		collidePoint = collidePoint/(player.height/2);

		//the angle in radians
		let angleRad = collidePoint*Math.PI/4;

		// X direction of the ball where it's hits
		let direction = (ball.x < canvas.width/2) ? 1 : -1;

		// change velocity x and y
		ball.velocityX = direction*ball.speed*Math.cos(angleRad);
		ball.velocityY = 			ball.speed*Math.sin(angleRad);

		// everytime the ball hit the paddle, we encrese it speeds
		ball.speed += 0.5;
	}

	//update the score
	if(ball.x - ball.radius < 0){
		//computer won
		computer.score++;
		resetBall();
	}else if(ball.x + ball.radius > canvas.width){
		//the user scores
		user.score++
		resetBall();
	}
}

// function game 
function game(){
	update();
	render();
}

// loop
const framePerSecond = 50;
setInterval(game,1000/framePerSecond);