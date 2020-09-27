var images = ['images/a.jpg','images/b.jpg','images/c.jpg'];

var n = 0;
function next(){
	var slider = document.getElementById('slider');
	n++;                      
	// cuando n=3 llega a la maxima lenght que es 3 
	// por lo tanto debe ser cambiado a 0 para volver a comenzar
	if(n >= images.length){
		n = 0;
	}
	slider.src = images[n];
}

function prev(){
	var slider = document.getElementById('slider');
	n--; 
	//n-- es solo un contador
	// si por ejemplo n=2, cuando presionamos el boton prev, n disminuira a 1 y asi sucesivamente
	if(n < 0){
		n = images.length-1;
	}
	slider.src = images[n];
}

/* 

next()

Comenzamos con n=0 porque estamos en la primera imagen y 0 es la primera posicion del array. Ahora le ordenamos al programa que si n es mayor o igual a la longitud maxima del array vuelva de nuevo a ser 0, lo cual le estamos indicando numericamente que vuelva a la primera imagen.

slider.src = images[n] ese .src que esta allí es una propiedad que establece
o devuelve una url de un archivo externo. Es lo que hace que cuando el usuario
haga click en el boton aparezca una nueva imagen, es decir que le va a asignar la nueva url de la imagen al array "images" a través de sus posiciones.

También necesita estar por fuera de la funcion para hacer el cambio de imagen porque sino nada más lo haría cuando n>=images.lenght y queremos que cuando n = 1 la imagen haga un cambio de url.

prev()

ok n disminuye en -1, como n siempre seguirá siendo menor que 0, la condicion if se ejecutara cada vez que le demos click al boton, lo que sucede despues es que a n se le asignará el valor n = images.lenght-1 lo cual sabemos que el lenght es igual 3, por lo tanto n se convertira ahora en n = 2, y cambia la imagen a la posicion 2 del array ... la última imagen

Recuerda que if no es una ciclo, es una condición y ya.

*/
