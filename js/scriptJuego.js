
var arraysCircles = [];
var cont = 0;
var dy = 3;
var dx = -3;
var path = [];
var canvas;
var n;
var ctx;

var circles = [];
var salir = 0;
var bola = 0;
var mouse = { x: 0, y: 0 }
var lastTime = 0;
var hit = "hit";

function requestMyAnimationFrame(callback, time) {
	var t = time || 16;
	var currTime = new Date().getTime();
	var timeToCall = Math.max(0, t - (currTime - lastTime));
	var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
	lastTime = currTime + timeToCall;
	return id;
}
window.onload = function () {
	document.getElementById('meta').disabled = true;
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	if (document.getElementById('first')) {
		window.addEventListener("mousemove", function (e) {
			mouse.x = e.layerX || e.offsetX;
			mouse.y = e.layerY || e.offsetY;
		});
		n = 5;
	}
	if (document.getElementById('second')) {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		window.addEventListener("mousemove", function (e) {
			mouse.x = e.layerX || e.offsetX;
			mouse.y = e.layerY || e.offsetY;
		});
		n = 10;
	}
	if (document.getElementById('third')) {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		window.addEventListener("mousemove", function (e) {
			mouse.x = e.layerX || e.offsetX;
			mouse.y = e.layerY || e.offsetY;
		});
		n = 15;
	}
}


function getCoord(x, y) {
	return "(" + x + ", " + y + ")";
}


function Circle(x, y, r, b, s, c) {
	this.x = x;
	this.y = y;
	this.radius = r;
	this.bounciness = b;
	this.speed = s;
	this.color = c;
	this.dx = 0;
	this.dy = 0;
	this.drawnPos = "";
	this.fill = function () {
		ctx.beginPath();
		ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();
	}

	this.clear = function () {
		ctx.fillStyle = "white";
		this.fill();
	}

	this.draw = function () {
		if (this.drawnPos !== getCoord(this.x, this.y)) {
			ctx.fillStyle = this.color;
			this.fill();
		}
	}

	this.inside = function () {
		if (this.x < 0) {
			this.x = 0;
			this.dx *= -1 * this.bounciness;
		}
		else if (this.x + this.radius * 2 > canvas.width) {
			this.x = canvas.width - this.radius * 2;
			this.dx *= -1 * this.bounciness;
		}
		if (this.y < 0) {
			this.y = 0;
			this.dx *= -1 * this.bounciness;
		}
		else if (this.y + this.radius * 2 > canvas.height) {
			this.y = canvas.height - this.radius * 2;
			this.dx *= -1 * this.bounciness;
		}
	}
	this.seguirMouse = function () {
		var cX = Math.round(this.x + this.radius);
		var cY = Math.round(this.y + this.radius);
		if (cX < mouse.x) {
			this.dx += this.speed;
		}
		else if (cX > mouse.x) {
			this.dx -= this.speed;
		}
		if (cY < mouse.y) {
			this.dy += this.speed;
		}
		else if (cY > mouse.y) {
			this.dy -= this.speed;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);

		this.r += Math.random();

	}
}



function gameOverAction() {
	console.log('Sonido Exitoso!');
	alert("Juego Terminado");
	document.getElementById('player').play();
	alert("Volviendo a la primera pantalla");
	window.location = "index.html";
}

function gameNotStartedAction(error) {
	alert('El usuario debe hacer click en el punto gris para iniciar!');
	console.log(error);
	console.log(error.name);
	console.log(error.message);
}

function crearCirculos(i) {

	var x = Math.random() * canvas.width;
	var y = Math.random() * canvas.height;
	var r = getRandomRadius();
	var c = crearColor();
	var minBoun = 0.5 + (n / n - 1);
	var maxBoun = 0.6 + (n / n - 1);

	var minSpeed = 0.3 + (n / n - 1);
	var maxSpeed = 0.5 + (n / n - 1);
	circles[i] = new Circle(x, y, r, Math.random() * (maxBoun - minBoun) + minBoun, Math.random() * (maxSpeed - minSpeed) + minSpeed, c);
}
function makeCircles(n) {
	for (var i = 0; i < n; i++) {
		crearCirculos(i);
	}
}
function drawC() {
	var j = 0;
	for (var i = 0; j < circles.length; i++) {
		if (circles[i]) {
			circles[i].draw();
			j++;
		}
	}
}
function clearC() {
	var j = 0;
	for (var i = 0; j < circles.length; i++) {
		if (circles[i]) {
			circles[i].clear();
			j++;
		}
	}
}
function updateC() {
	var j = 0;
	for (var i = 0; j < circles.length; i++) {
		if (circles[i]) {
			circles[i].inside();
			circles[i].seguirMouse();
			j++;
		}
	}
}
function update() {
	requestMyAnimationFrame(update, 10);
	updateC();
}
function draw() {
	requestMyAnimationFrame(draw, 1000 / 60);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawC();
}


function iniciar() {
	document.getElementById('meta').disabled = false;
	makeCircles(n);
	update();
	draw();
	salio();
	comprobacion();
}

function salio() {
	canvas.onmouseleave = function () {
		if (mouse.x > 610 && mouse.y < 50) {
			meta.onmouseenter = function () {
				//Verifica que se sale del canvas pero entra al boton
			}
		}
		else {
			if (bola == 0 && salir != 1) {
				document.location.reload(true);
				alert("Ha perdido por salirse del borde.");
				salir = 1;
			}
		}
	};
}
function comprobacion() {
	canvas.onmousemove = function () {
		for (var i = 0; i < n; i++) {
			//circles[i].x + circles[i].radius * 2 = punto más a la derecha
			//circles[i].y + circles[i].radius * 2 = punto más abajo
			//circles[i].x = punto más a la izquierda
			//cirlces[i].y = punto más arriba
			if (mouse.x > circles[i].x && mouse.x < circles[i].x + circles[i].radius * 2 && mouse.y > circles[i].y && mouse.y < circles[i].y + circles[i].radius * 2) {
				if (salir == 0 && bola != 1) {
					document.location.reload(true);
					alert("Ha perdido por tocar un circulo.");
					bola = 1;
				}
			}
		}
	}
}



function meta1() {
	window.alert("Pasando al Nivel 2");
	window.location = "index2.html";
}
function meta2() {
	window.alert("Pasando al Nivel 3");
	window.location = "index3.html";
}
function meta3() {
	gameOverAction();
}
function volver() {
	window.location = "index.html";
}

function getRandomArbitrary() {
	return Math.random() * 10;
}
function getRandomRadius() {
	return Math.random() * (100 - 1) + 10
}
function crearColor() {
	var colores = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
	var rojo = "";
	var azul = "";
	var verde = "";
	var newColor = "";
	rojo = colores[aleatorio()] + colores[aleatorio()];
	azul = colores[aleatorio()] + colores[aleatorio()];
	verde = colores[aleatorio()] + colores[aleatorio()];
	newColor = "#" + rojo + azul + verde;
	return newColor;
}

function aleatorio() {
	return Math.floor((Math.random() * 16));
}
