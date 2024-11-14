window.addEventListener('load', function () {
    'use strict';
    // Add JS here
    const sections = document.querySelectorAll('section');
    const headerP = document.querySelector('header p');
    let sectionTops = [];
    let pagetop;
    let counter = 1;
    let prevCounter = 1;
    let doneResizing;

    sections.forEach(function(eachSection){
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    });

    console.log(sectionTops);

    window.addEventListener('scroll', function(){
        pagetop = window.scrollY + 600;
        //console.log(pagetop);
        if (pagetop > sectionTops[counter]){
            counter++;
            //console.log(`scrolling down ${counter}`);
        } else if (counter > 1 && pagetop < sectionTops[counter - 1]){
            counter--;
            //console.log(`scrolling up ${counter}`);
        }

        if (counter != prevCounter){
            // do stuff to the page here
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
        onSectionChange();
    }

    function onSectionChange(){
        const style = `bgcolor${counter}`;
        document.querySelector('body').className = style;

        switch(counter){
            case 1: headerP.innerHTML = "The first section is on the page"; break;
            case 2: headerP.innerHTML = "The second section is on the page"; break;
            case 3: headerP.innerHTML = "The third section is on the page"; break;
            case 4: headerP.innerHTML = "The fourth section is on the page"; break;
            case 5: headerP.innerHTML = "The fifth section is on the page"; break;
            default: headerP.innerHTML = "Oooops something went wrong!"; break;
        }

        for (const eachPost of sections){
            eachPost.className = "offscreen";
        }
        document.querySelector(`#section0${counter}`).className = 'onscreen';
    }
    // duplicate the polaroids for seamless infinite loop
    var copy = this.document.querySelector('.polaroid-slide').cloneNode(true);
    this.document.querySelector(".polaroids").appendChild(copy);

});