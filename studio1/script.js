(function(){

    'use strict';
    console.log('reading js');

    const btnRestart = document.querySelector(".btn-restart");
    const timeSpan = document.querySelector(".time");
    const progressBar = document.querySelector(".progress-inner");

    const time = 5;//seconds

    

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
            btnRestart.id = "visible";
            countDown = 2;
            progressBar.style.width = "0%";
            timeSpan.innerHTML = "Game Over";
        }
    },1000);

    

    btnRestart.addEventListener('click', function(){
            btnRestart.id = "hidden";

            
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
                    checkColors(progressWidth) 
                } else {
                    clearInterval(countDown);
                    btnRestart.id = "visible";
                    progressBar.style.width = "0%";
                    timeSpan.innerHTML = "Game Over";
                }
            },1000);
        })
    

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const checkColors = function(width){
        if(width > 60){
            progressBar.style.background = "green";
        } else if (width > 30){
            progressBar.style.background = "yellow";
        } else {
            progressBar.style.background = "red";
        }
    }

}())