const comecar = document.querySelector(".comecar button");
const informacoes = document.querySelector(".informacoes");
const exit_btn = informacoes.querySelector(".botoes .sair");
const continue_btn = informacoes.querySelector(".botoes .recomecar");
const quiz = document.querySelector(".quiz");
const resultado = document.querySelector(".resultado");
const lista_opcao = document.querySelector(".lista_opcao");

comecar.onclick = ()=>{
    informacoes.classList.add("ativarInfo");
}

exit_btn.onclick = ()=>{
    informacoes.classList.remove("ativarInfo");
}

continue_btn.onclick = ()=>{
    informacoes.classList.remove("ativarInfo"); 
    quiz.classList.add("ativarQuiz");
    showQuetions(0); 
    queCounter(1); 
	altImages(1);
	
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = resultado.querySelector(".botoes .recomecar");
const quit_quiz = resultado.querySelector(".botoes .sair");

restart_quiz.onclick = ()=>{
    quiz.classList.add("ativarQuiz"); 
    resultado.classList.remove("ativarResultado");
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
	altImages(que_numb);
    clearInterval(counter); 
    clearInterval(counterLine); 
}

quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const proximo = document.querySelector("footer .proximo");
const bottom_ques_counter = document.querySelector("footer .nQuestoes");

proximo.onclick = ()=>{
    proximo.classList.remove("show");
	if(que_count < questoes.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count);
        queCounter(que_numb); 
		altImages(que_numb);
        clearInterval(counter); 
        clearInterval(counterLine); 
    }else{
        clearInterval(counter);
        clearInterval(counterLine); 
        showResult(); 
    }
}

function showQuetions(index){
    const tQuestoes = document.querySelector(".tQuestoes");

    let que_tag = '<span>'+ questoes[index].numb + ". " + questoes[index].question +'</span>';
    if (questoes[index].options.length == 5){
	let option_tag = '<div class="option"><span>'+ questoes[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questoes[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questoes[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questoes[index].options[3] +'</span></div>'
	+ '<div class="option"><span>'+ questoes[index].options[4] +'</span></div>';
	tQuestoes.innerHTML = que_tag; 
    lista_opcao.innerHTML = option_tag; 
	}
	else if (questoes[index].options.length == 3){
	let option_tag = '<div class="option"><span>'+ questoes[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questoes[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questoes[index].options[2] +'</span></div>';
	tQuestoes.innerHTML = que_tag; 
    lista_opcao.innerHTML = option_tag; 
	}
	else{
	let option_tag = '<div class="option"><span>'+ questoes[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questoes[index].options[1] +'</span></div>';
    tQuestoes.innerHTML = que_tag;
    lista_opcao.innerHTML = option_tag; 
	}
	
    
    const option = lista_opcao.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questoes[que_count].answer; 
    const allOptions = lista_opcao.children.length;
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(lista_opcao.children[i].textContent == correcAns){ 
                lista_opcao.children[i].setAttribute("class", "option correct"); 
                lista_opcao.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        lista_opcao.children[i].classList.add("disabled"); 
    }
    proximo.classList.add("show"); 
}

function showResult(){
    informacoes.classList.remove("ativarInfo"); 
    quiz.classList.remove("ativarQuiz"); 
    resultado.classList.add("ativarResultado");
    const scoreText = resultado.querySelector(".resultado_texto");
	
	const element = [];
		element[0] = document.querySelector('.resultado .gifR1');
		element[1] = document.querySelector('.resultado .gifR2');
		element[2] = document.querySelector('.resultado .gifR3');
		element[3] = document.querySelector('.resultado .gifR4');
			
			for(i=0; i<4; i++){
					element[i].style.visibility = 'hidden';
			}
	
    if (userScore == 14){ 
		element[0].style.visibility = 'visible';
		let scoreTag = '<span>Incrível, você acertou '+ userScore +' de '+ questoes.length +' questões. Você sabe muito sobre o Covid-19! </span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 8 && userScore < 14){ 
		element[1].style.visibility = 'visible';
		let scoreTag = '<span>Muito bem, você acertou '+ userScore +' de '+ questoes.length +' questões. Você sabe bem sobre o Covid-19! </span>';
        scoreText.innerHTML = scoreTag;
    }
	else if(userScore <=8 &&  userScore > 4){ 
		element[2].style.visibility = 'visible';
		let scoreTag = '<span>Você acertou '+ userScore +' de '+ questoes.length +' questões. Você sabe pouco sobre a Covid-19, você deveria aprender um pouco mais para sua própria saúde! </span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
		element[3].style.visibility = 'visible';
		let scoreTag = '<span>Infelizmente você acertou '+ userScore +' de '+ questoes.length +' questões. Seria ideal você aprender mais sobre o Covid-19, para sua própria saúde! </span>';
        scoreText.innerHTML = scoreTag;
    }
}

function queCounter(index){
	let totalQueCounTag = '<span>'+ index +' de '+ questoes.length +' Questões</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}


function altImages(index){
	const element = [];
		element[0] = document.querySelector('.quiz .imagem1');
		element[1] = document.querySelector('.quiz .imagem2');
		element[2] = document.querySelector('.quiz .imagem3');
		element[3] = document.querySelector('.quiz .imagem4');
		element[4] = document.querySelector('.quiz .imagem5');
		element[5] = document.querySelector('.quiz .imagem6');
		element[6] = document.querySelector('.quiz .imagem7');
		element[7] = document.querySelector('.quiz .imagem8');
		element[8] = document.querySelector('.quiz .imagem9');
		element[9] = document.querySelector('.quiz .imagem10');
		element[10] = document.querySelector('.quiz .imagem11');
		element[11] = document.querySelector('.quiz .imagem12');
		element[12] = document.querySelector('.quiz .imagem13');
		element[13] = document.querySelector('.quiz .imagem14');
		
		element[14] = document.querySelector('.quiz .site1');
		element[15] = document.querySelector('.quiz .site2');
		element[16] = document.querySelector('.quiz .site3');
		element[17] = document.querySelector('.quiz .site4');
		element[18] = document.querySelector('.quiz .site5');
		element[19] = document.querySelector('.quiz .site6');
		element[20] = document.querySelector('.quiz .site7');
		element[21] = document.querySelector('.quiz .site8');
		element[22] = document.querySelector('.quiz .site9');
		element[23] = document.querySelector('.quiz .site10');
		element[24] = document.querySelector('.quiz .site11');
		element[25] = document.querySelector('.quiz .site12');
		element[26] = document.querySelector('.quiz .site13');
		element[27] = document.querySelector('.quiz .site14');
	

		element[13].style.visibility = 'hidden';
		element[27].style.visibility = 'hidden';
		element[14].style.visibility = 'visible';

var x = 0;
	for(i=0; i<questoes.length; i++){
		if (index==(i+1)){
		element[i].style.visibility = 'visible';
		element[i-1].style.visibility = 'hidden';
			if (i==1){
				element[15].style.visibility = 'visible';
				element[14].style.visibility = 'hidden';
			}
			else if(i==2){
				element[16].style.visibility = 'visible';
				element[15].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}
			else if(i==3){
				element[17].style.visibility = 'visible';
				element[16].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}	
			else if(i==4){
				element[18].style.visibility = 'visible';
				element[17].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}	
			else if(i==5){
				element[19].style.visibility = 'visible';
				element[18].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}	
			else if(i==6){
				element[20].style.visibility = 'visible';
				element[19].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}	
			else if(i==7){
				element[21].style.visibility = 'visible';
				element[20].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}	
			else if(i==8){
				element[22].style.visibility = 'visible';
				element[21].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}	
			else if(i==9){
				element[23].style.visibility = 'visible';
				element[22].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}			
			else if(i==10){
				element[24].style.visibility = 'visible';
				element[23].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}	
			else if(i==11){
				element[25].style.visibility = 'visible';
				element[24].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}	
			else if(i==12){
				element[26].style.visibility = 'visible';
				element[25].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}		
			else{
				element[27].style.visibility = 'visible';
				element[26].style.visibility = 'hidden';
				element[14].style.visibility = 'hidden';
			}	
		x= x+1;
		}
		
	}
}