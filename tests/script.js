(function(){

    'use strict'
    console.log('reading js');

    let sliders = document.querySelectorAll('.slider');
    let resetTime = [0,400,300,200,100];

    sliders.forEach((slider,idxSlider) => {
        let images = slider.querySelectorAll('.img');
        console.log(images);
        /* let slider = document.querySelector('.slider'); */
        let current = 0;

        images.forEach((img, idx) =>{
            img.style.backgroundImage = `url(./images/slider${idxSlider+1}/${idx+1}.jpg)`;
        })

        let { visibleId, hiddenId } = getIdByClass(slider);

        const myInterval = setInterval(function(){
            if (current < images.length){
                images[current].id = visibleId;
                current++;
            } else {
                for (let i = images.length-1; i > 0; i--){
                    setTimeout(function(){
                        images[i].id = hiddenId;
                    }, resetTime[i]);    
                }
                current = 0;
            }
        }, 2000);
        
    })


    // Helper function to get correct transition function 
    // based on slider class.
    function getIdByClass(slider) {
        let visibleId, hiddenId;
        
        if (slider.classList.contains('up')) {
            visibleId = 'img-visible-up';
            hiddenId = 'img-hidden-up';
        } else if (slider.classList.contains('down')) {
            visibleId = 'img-visible-down';
            hiddenId = 'img-hidden-down';
        } else if (slider.classList.contains('left')) {
            visibleId = 'img-visible-left';
            hiddenId = 'img-hidden-left';
        } else {
            visibleId = 'img-visible-right';
            hiddenId = 'img-hidden-right';
        }

        return { visibleId, hiddenId };
    }


})();