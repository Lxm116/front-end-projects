function cascade () {
    document.querySelector('button').classList.add('button-animation')
    document.querySelector('button').style.backgroundColor = "white";
    document.querySelector('button').style.color = "black";

    document.querySelector('.prop-div').classList.remove('display-div');
    document.querySelector('.prop-div').classList.add('div-toggle');


    

}






document.querySelector('button').addEventListener('click', cascade);