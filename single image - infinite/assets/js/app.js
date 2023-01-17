const carousel = document.querySelector(".carousel-slides");
const slides = document.querySelectorAll(".carousel-slides-img");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
let activeSlideIndex = 1;
let timerId = null;

const changeActiveSlide = (nextORprev)=>{
    if(nextORprev=="prev"){
        activeSlideIndex = activeSlideIndex<=0 ? 0 : activeSlideIndex-1;
    }else{
        activeSlideIndex = activeSlideIndex>=slides.length-1 ? slides.length-1 : activeSlideIndex+1;
    }
    carousel.style.transform = `translateX(${-100*activeSlideIndex}%)`;
    carousel.style.transition = "transform 0.5s ease-in-out";
}

const setTimer = ()=>{
    clearInterval(timerId);
    timerId = setInterval(()=>{
        changeActiveSlide()
    },4000)
}
setTimer();

nextBtn.onclick = ()=>{
    changeActiveSlide();
    setTimer();
}

prevBtn.onclick = ()=>{
    changeActiveSlide("prev")
    setTimer();
}

carousel.ontransitionend = ()=>{
    if(slides[activeSlideIndex].id=="last-clone"){
        console.log("last-clone")
        carousel.style.transition = "none";
        activeSlideIndex = slides.length-2;
        carousel.style.transform = `translateX(${-100*activeSlideIndex}%)`;
    }
    else if(slides[activeSlideIndex].id=="first-clone"){
        console.log("first-clone")
        carousel.style.transition = "none";
        activeSlideIndex = 1;
        carousel.style.transform = `translateX(${-100*activeSlideIndex}%)`;
    }
}