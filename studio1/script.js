(function(){

    'use strict';
    console.log('reading js');

    const btnRestart = document.querySelector(".btn-restart");
    let timeSpan = document.querySelector(".time");
    const progressBar = document.querySelector(".progress-inner");
    const progressContainer = document.querySelector(".progress");
    const timeLabel = document.querySelector("h3");
    const pageBG = document.querySelector("body");
    const btnSubmit = document.querySelector("#submit");

    const time = 30;//seconds
    const start = "#598392";
    const end = "#D00000";

    /* D00000 */

    let interval = time;
    timeSpan.innerHTML = interval + "s";

    var countDown = setInterval(() => {
        progressBar.style.transition = `width 1s linear, background-color ${time/3}s ease`;
        interval--;
        console.log(`countdown: ${countDown}, interval: ${interval}`);
        

        let progressWidth = (interval / time) * 100;

        if(interval > 0){
            progressBar.style.width = progressWidth + "%";
            timeSpan.innerHTML = interval + "s";
            checkColors(progressWidth); 
        } else {
            clearInterval(countDown);
            progressContainer.style.marginBottom = "63px";
            btnRestart.id = "visible";
            countDown = 2;
            progressBar.style.width = "0%";
            pageBG.style.background = `${end}`;
            timeLabel.innerHTML = `<span class="time">Time's up!</span>`;
        }
    },1000);

    

    btnRestart.addEventListener('click', function(){
        event.preventDefault();
            pageBG.style.background = `${start}`;
            btnRestart.id = "hidden";
            progressContainer.style.marginBottom = "20px";
            timeLabel.innerHTML = `Time till deadline: <span class="time">60s</span>`;
            timeSpan = document.querySelector(".time");
            interval = time;
            progressBar.style.width = "100%";
            timeSpan.innerHTML = interval + "s"; 

            progressBar.style.transition = "width 0.5s ease, background-color 0.2s linear";

            progressBar.style.background = "green";

            sleep(1).then(() => { progressBar.style.transition = `width 1s linear, background-color ${time/3}s linear`; });
            
            
            var countDown = setInterval(() => {
                interval--;
                console.log(`countdown: ${countDown}, interval: ${interval}`);
        
                let progressWidth = (interval / time) * 100;
        
                if(interval > 0){
                    progressBar.style.width = progressWidth + "%";
                    timeSpan.innerHTML = interval + "s";
                    checkColors(progressWidth); 
                } else {
                    clearInterval(countDown);
                    progressContainer.style.marginBottom = "63px";
                    btnRestart.id = "visible"; 
                    progressBar.style.width = "0%";
                    pageBG.style.background = `${end}`;
                    timeLabel.innerHTML = `<span class="time">Time's up!</span>`;
                }
            },1000);
        })
    

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const checkColors = function(width){
        if(width > (2/3*100)){
            progressBar.style.background = "#007B5F";
        } else if (width > (1/3*100)){
            progressBar.style.background = "#F7D417";
        } else {
            progressBar.style.background = "#CC292B";
        }
    }

    const myForm = document.querySelector('#myform');
    const madlib = document.querySelector('#madlib');
    const formData = document.querySelectorAll("input[type=text]");
    const error = document.querySelector("#error");
    
    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        processFormData(formData);
    });

    function processFormData(formData){
        const words = [];
        const emptyfields = [];
        let counter = 0;

        for (const eachWord of formData){
            if(eachWord.value){
                words.push(eachWord.value);
            } else { 
                emptyfields.push(counter);
            }
            counter++;
            
        }
        if (emptyfields.length > 0) {
            showErrors(formData, emptyfields);
        } else {
            clearInterval(countDown);
            document.querySelector('body').scrollTop = 0;
            document.getElementById('overlay').className = 'visible';
            makeMadlib(words);

        }
    }    

    function showErrors(formData, emptyfields){
        const errorId = formData[emptyfields[0]].id;
        const errorText = `Please fill out this field ${errorId}`;
        error.innerHTML = errorText;
        document.querySelector(`#${errorId}`).focus();
    }

    function makeMadlib(words){
        const myText = `I had a big project due on ${words[0]}, but instead of working, I decided to ${words[1]}. I spent the entire day ${words[2]} and watching ${words[3]}. When I finally sat down to work, I realized I needed ${words[4]} more ${words[5]}. Panic set in as I tried to focus, but my phone kept buzzing with ${words[6]} notifications. By midnight, I felt completely ${words[7]} and wished I had started earlier. Next time, I promise to ${words[8]} instead of procrastinating!`;
        madlib.innerHTML = myText;
        for (const eachField of formData) {
            eachField.value = '';
        }
    }

    // closing the overlay
    document.querySelector('.close').addEventListener('click', function(){
        event.preventDefault();
        document.getElementById('overlay').className = 'hidden';
    })

    document.addEventListener('keydown', function(event){
        if (event.key == 'Escape'){
            document.getElementById('overlay').className = 'hidden';
        }
    })

}())