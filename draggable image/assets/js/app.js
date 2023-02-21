//initial references
const container = document.querySelector(".container");
const slideshow = document.querySelector(".slideshow");
let outerContainer = container.getBoundingClientRect();
let innerContainer = slideshow.getBoundingClientRect();

//slider variables 
let startX = 0 , active = false;

const events = {
    mouse : {
        down :"mousedown",
        up : "mouseup",
        move : "mousemove",
    },
    touch : {
        down : "touchstart",
        up : "touchend",
        move :"touchmove",
    }
}
let deviceType = "";
const isTouchDevice = ()=>{
    try{
        document.createEvent("TouchEvent");
        deviceType = "touch"
        return true;
    }catch(e){
        deviceType ="mouse";
        return false;
    }
}
isTouchDevice();

//mousedown & touchstart event
container.addEventListener(events[deviceType].down,(e)=>{
    active = true;
    startX = (isTouchDevice() 
    ?e.touches[0].clientX 
    :e.clientX) - outerContainer.left - slideshow.offsetLeft;
    container.style.cursor = "grabbing";
})
//mouseup & touchend event
container.addEventListener(events[deviceType].up,()=>{
    active = false;
    container.style.cursor = "grab";
})
//mousemove & touchmove
container.addEventListener(events[deviceType].move,(e)=>{
    if(active){
        const currentX = (isTouchDevice() 
        ?e.touches[0].clientX 
        :e.clientX) - outerContainer.left ;
        slideshow.style.left = `${currentX-startX}px`;
        specifySlideshowLeftPosition();
    }
})

const specifySlideshowLeftPosition = ()=>{
    innerContainer = slideshow.getBoundingClientRect();
    outerContainer = container.getBoundingClientRect();
    if(parseInt(slideshow.style.left) >=0){
        slideshow.style.left = "0px";
    }else if(innerContainer.right < outerContainer.right){
        slideshow.style.left = `-${innerContainer.width - outerContainer.width}px`;
    }
}