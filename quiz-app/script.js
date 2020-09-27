let position = 0, correct = 0; 

// array who hold all the questions
const questions = [
    [ "The sum of 2+2 is?", "4", "3", "1","A" ],
    [ "The sum of 2+3 is?", "4", "3", "5","C" ],
    [ "The sum of 2+4 is?", "4", "6", "3","C" ],
    [ "The sum of 2+1 is?", "4", "3", "1","B" ],
    [ "The sum of 2+0 is?", "2", "3", "5","A" ]
];

let get = (x) => document.getElementById(x);

let quetions1by1 = () => {
    let test = get("test");
    	if (position >= questions.length){
			test.innerHTML = "<h3>You got "+correct+" of "+questions.length+" questions correct<h3><br>";
			get("status").innerHTML = "Test Completed";
			position = 0;
			correct = 0;
			get("test").innerHTML += "<h3>Make the test again:<h3><br>";
			get("test").innerHTML += "<button type='button' class='btn btn-success' onclick='quetions1by1()'>Submit</button>";
			return false;
		}
    get("status").innerHTML = "Question " +(position+1)+" of "+questions.length;
    let question = questions[position][0];
    let aA = questions[position][1];
    let aB = questions[position][2];
    let aC = questions[position][3];
    test.innerHTML = "<h3>"+question+"</h3>";
    test.innerHTML += "<input type='radio' name='choices' value='A'> "+aA+"<br>";
    test.innerHTML += "<input type='radio' name='choices' value='B'> "+aB+"<br>";
    test.innerHTML += "<input type='radio' name='choices' value='C'> "+aC+"<br><br>";
    // += because we are appending a new element instead will be equal to that element
    test.innerHTML += "<button type='button' class='btn btn-success' onclick='checkAnswer()'>Submit</button>";
};

const checkAnswer = () => {
	var choices = document.getElementsByName("choices");
	for(var i=0;i<choices.length; i++){
		if(choices[i].checked){
			var choice = choices[i].value;
		}
	}
	if(choice==questions[position][4]){
		correct++; //the score will increase
	}
	position++; //next question
	quetions1by1();
}

window.addEventListener("load",quetions1by1,false);