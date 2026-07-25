
var quoteA = "Progress is progress no matter how small";
var authorA = "LXM";

var quoteB = "The only source of knowledge is experience";
var authorB = "Albert Einstein";

var quoteC = "You can't get away from yourself by moving from one place to another";
var authorC = "Ernest Hemmingway";

var quoteD = "It always seems impossible until it is done";
var authorD = "Nelson Mandela";

var quoteE = "If today were the last day of your life, would you want to do what you are about to do today?";
var authorE = "Steve Jobs";








function changeQuote() {
    var choice = Math.floor(Math.random() * 5) + 1;
    console.log(choice);

    if (choice === 1) {
        document.querySelector('.quote-p').innerText = quoteA;
        document.querySelector('.author-p').innerText = authorA;
    }
    else if (choice === 2) {
        document.querySelector('.quote-p').innerText = quoteB;
        document.querySelector('.author-p').innerText = authorB;
    }
    else if (choice === 3) {
        document.querySelector('.quote-p').innerText = quoteC;
        document.querySelector('.author-p').innerText = authorC;
    }
    else if (choice === 4) {
        document.querySelector('.quote-p').innerText = quoteD;
        document.querySelector('.author-p').innerText = authorD;
    }
    else if (choice === 5) {
        document.querySelector('.quote-p').innerText = quoteE;
        document.querySelector('.author-p').innerText = authorE;
    }

}

document.querySelector('button').addEventListener('click', changeQuote)