window.addEventListener('load', function () {
    'use strict';
    // Add JS here
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const resetTime = [0,300,250,200,150,100,50];
    let sectionTops = [];
    let pagetop;
    let counter = 1;
    let prevCounter = 1;
    let doneResizing;

    var interval = {
        // to keep a reference to all the intervals
        intervals : new Set(),
        
        // create another interval
        make(...args) {
            var newInterval = setInterval(...args);
            this.intervals.add(newInterval);
            return newInterval;
        },
    
        // clear a single interval
        clear(id) {
            this.intervals.delete(id);
            return clearInterval(id);
        },
    
        // clear all intervals
        clearAll() {
            for (var id of this.intervals) {
                this.clear(id);
            }
        }
    };


    sections.forEach(function(eachSection){
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    });

    console.log(sectionTops);

    window.addEventListener('scroll', function(){
        // console.log(window.scrollY);
        pagetop = window.scrollY + document.documentElement.clientHeight;
        //console.log(pagetop);
        if (pagetop > sectionTops[counter]){
            counter++;
            console.log(`scrolling down ${counter}`);
        } else if (counter > 1 && pagetop < sectionTops[counter - 1]){
            counter--;
            console.log(`scrolling up ${counter}`);
        }

        if (this.window.scrollY == 0){
            counter = 1;
        }

        if (counter != prevCounter){
            // do stuff to the page here
            interval.clearAll();
            onSectionChange();
            // reset counter for next section
            prevCounter = counter;
        }
    });

    window.addEventListener('resize', function(){
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function (){
            resetPagePosition();
        }, 500);
    });

    function resetPagePosition(){
        sectionTops = [];
        sections.forEach(function (eachSection){
            sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
        });
        const pagePosition = window.scrollY + sectionTops[0] + 10;
        counter = 0;
        sectionTops.forEach(function (eachSection){
            if (pagePosition > eachSection) { counter++; }
        });
        console.log(`counter is now ${counter}`);
        interval.clearAll();
        onSectionChange();
    }

    function onSectionChange(){
        console.log(`currently in section ${counter}`);

        const style = `bgcolor${counter}`;
        document.querySelector('body').className = style;

        document.querySelector(".progressbar").style.width = `calc(100vw*(${counter-1}/5))`;

        const section = document.querySelector(`#section0${counter}`)
        if (document.querySelector('.container-active')){
            document.querySelector('.container-active').className = 'container';
        }

        if (counter === 1){
            header.style.opacity = 0;
        } else {
            header.style.opacity = 100;
        }

        

        // whenver a section is change, trigger that section's sliders
        let sliders = section.querySelectorAll('.slider');

        sliders.forEach((slider,idxSlider) => {
            let images = slider.querySelectorAll('.img');
            //console.log(images);
            /* let slider = document.querySelector('.slider'); */
            let current = 0;

            let { visibleId, hiddenId } = getIdByClass(slider);

            /* if (images[0].id == visibleId && images[1].id == hiddenId){

            }
 */
            images.forEach((img, idx) =>{
                img.style.backgroundImage = `url(./images/section${counter}/slider${idxSlider+1}/${idx+1}.jpg)`;
                if (idx == 0){
                    images[idx].id = visibleId;
                } else {
                    /* if (images[1].id == visibleId){
                        images[1].id = visibleId;
                    }else{ */
                        images[idx].id = hiddenId;
                }
            })

            /* if (images[1].id != visibleId){
                setTimeout(function(){
                    images[1].id = visibleId;
                    current++;
                }, 1000);
            }
            */

            
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
            interval.intervals.add(myInterval);
            
        })

        if (counter === 3){
            document.querySelector('.container').className = 'container-active';
        }

        if (counter === 1){
            header.style.opacity = 0;
        }
/* 

        // change header in each section and make section specific changes
        switch(counter){
            case 1: headerP.innerHTML = `1`; break;
            case 2: headerP.innerHTML = `${counter}`; break;
            case 3: 
                headerP.innerHTML = `${counter}`; 
                document.querySelector('.container').className = 'container-active';
                break;
            case 4: headerP.innerHTML = `${counter}`; break;
            case 5: headerP.innerHTML = `${counter}`; break;
            case 6: headerP.innerHTML = `${counter}`; break;
            //case 7: headerP.innerHTML = "The seventh section is on the page"; break;
            default: headerP.innerHTML = "Oooops something went wrong!"; break;
        } */

        for (const eachPost of sections){
            eachPost.className = "offscreen";
        }
        document.querySelector(`#section0${counter}`).className = 'onscreen';
    }

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

    // duplicate the polaroids for seamless infinite loop
    let copy = this.document.querySelector('#polarslide1').cloneNode(true);
    this.document.querySelector("#polaroids1").appendChild(copy);

    copy = this.document.querySelector('#polarslide2').cloneNode(true);
    this.document.querySelector("#polaroids2").appendChild(copy);


    resetPagePosition();

});