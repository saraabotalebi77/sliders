const next_btn = document.querySelector(".next-btn");
const prev_btn = document.querySelector(".prev-btn");
const slides_wrapper =  document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
let activeIndex = 3;
let timer = null;


const addActiveClass = (index)=>{
    for(let i=0 ; i<slides.length ; i++){
        slides[i].classList.remove("activeSlide");
    }
    if(index==1){
        slides[index].classList.add("activeSlide");
        slides[slides.length-5].classList.add("activeSlide");
    }else if(index==slides.length-2){
        slides[index].classList.add("activeSlide");
        slides[4].classList.add("activeSlide");
    }else{
        slides[index].classList.add("activeSlide");
    }
}
const updateActiveIndex = (index,type)=>{
    if(type=="next"){
        activeIndex = index>=slides.length-3 ? 3 : index+1;
    }else if(type=="prev"){
        activeIndex = index<=0 ? slides.length-3 : index-1;
    }
    else if(type=="next_transitionend"){
        activeIndex = 3;
    }
    else if(type=="prev_transitionend"){
        activeIndex = slides.length-6;
    }
    if(window.innerWidth<=768){
        slides_wrapper.style.transform = `translateX(-${(activeIndex+1)*100}%`;
    }
    else{
        slides_wrapper.style.transform = `translateX(-${((activeIndex)*35) + 2.5}%)`;
    }
    addActiveClass(activeIndex+1);
}
const handleThrottle = (type)=>{
    updateActiveIndex  (activeIndex,type);
    slides_wrapper.style.transition = "transform 0.4s";
    setTimer();
}
const throttle = (handleThrottle,delay,type)=>{
    let lastInvoke = null;
    return()=>{
        if(lastInvoke+delay < Date.now()){
            handleThrottle(type);
            lastInvoke = Date.now();
        }
    }
}
next_btn.onclick = throttle(handleThrottle,500,"next");
prev_btn.onclick = throttle(handleThrottle,500,"prev");

slides_wrapper.addEventListener("transitionend",()=>{
    slides_wrapper.style.transition = "transform 0s";
    if(activeIndex==slides.length-3){
        updateActiveIndex(activeIndex,"next_transitionend");
    }else if(activeIndex==0){
        updateActiveIndex(activeIndex,"prev_transitionend");
    }
})

const setTimer = ()=>{
    if(timer){
        clearInterval(timer);
    }
    timer = setInterval(()=>{
        updateActiveIndex(activeIndex,"next");
        slides_wrapper.style.transition = "transform 0.4s";

    },3000);
}
setTimer();