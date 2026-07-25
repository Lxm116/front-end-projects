const questions = [
  {
    question: "What is the basic functional unit of life?",
    options: ["Tissue", "Organ", "Bone", "Cell"],
    answerIndex: 3
  },
  {
    question: "What is the best electrical conductor?",
    options: ["Copper", "Silver", "Iron", "Aluminium"],
    answerIndex: 1
  },
  {
    question: "What unit is electrical resistance measured in?",
    options: ["Coulombs", "Farads", "Ohms", "Volts"],
    answerIndex: 2
  },
  {
    question: "What is the smallest infectious particle?",
    options: ["Virus", "Bacteria", "Fungi", "Protozoa"],
    answerIndex: 0
  },
  {
    question: "What is the basic functional unit of life?",
    options: ["Tissue", "Organ", "Bone", "Cell"],
    answerIndex: 3
  }
];

let score = 0;
let currentQuestion = 0;


//Switch the first page
function switchPage2() { 
    document.querySelector('#first-page').classList.add('inactive'); 
    document.querySelector('#second-page').classList.remove('inactive'); 
}
document.querySelector('.first-page-button').addEventListener('click', switchPage2);



//Changing the questions
function changeQuestion() {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll('.option');

    document.querySelector('.second-page-h2').innerHTML = q.question;

    buttons.forEach((btn, index) => {
        btn.innerText = q.options[index];

        // reset styles of the new buttons
        btn.classList.remove('the-answer', 'correct-answer-box', 'wrong-answer-box');
        btn.classList.add('answer-box');

        // set correct answer to the button with the same as the index button
        if (index === q.answerIndex) {
            btn.classList.add('the-answer');
        }
    });
}


let hasAnswered = false;

function clickLogic(event) {
    const btn = event.target.closest('button');
    if (!btn || hasAnswered) return;

    hasAnswered = true;

    const correctBtn = document.querySelector('.the-answer');

    // show correct answer
    correctBtn.classList.add('correct-answer-box');
    correctBtn.classList.remove('answer-box');

    if (btn === correctBtn) {
        score++;
    } else {
        btn.classList.add('wrong-answer-box');
        btn.classList.remove('answer-box')
    }

    document.querySelector('.score-count').innerHTML = score;
}

document.querySelector('.next').addEventListener('click', function () {
    if (!hasAnswered) return; // prevent skipping

    currentQuestion++;
    

    if (currentQuestion < questions.length) {
        changeQuestion();
        document.querySelector('.question-count').innerHTML = currentQuestion+1;
        hasAnswered = false;
    } else {
        document.querySelector('.score-conditional').innerHTML= score;
        if (score > 3) {
            document.querySelector('.advice-conditional').innerHTML = "Good Job";

        } else if (score === 5) {
            document.querySelector('.advice-conditional').innerHTML = "Perfect";

        }
        else {
            document.querySelector('.advice-conditional').innerHTML = "Keep Practicing";

        }
        document.querySelector('#second-page').classList.add('inactive');
        document.querySelector('#third-page').classList.remove('inactive');

    }
});

function activate() {
    for (let i=0; i<4; i++) {
        document.querySelectorAll('.option')[i].addEventListener('click', clickLogic);
    }
}

activate();










