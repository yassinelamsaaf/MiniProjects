let [seconds,minutes,hours] = [0,0,0];
let displayTime = document.getElementById("displayTime");
let timer = null;
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const stopBtn = document.getElementById('stopBtn');
const start = document.querySelector('.start');

function stopwatch(){
    seconds++;
    if(seconds== 60){
        seconds=0;
        minutes++;
        if(minutes== 60){
            minutes=0;
            hours++;
        }
    }

    let h = hours < 10 ? "0"+hours : hours;
    let m = minutes < 10 ? "0"+minutes : minutes;
    let s = seconds < 10 ? "0"+seconds : seconds;

    displayTime.innerHTML = h + ":" + m + ":" +s ;
}

function watchStart(){
    console.log(timer);
    if(timer!==null){
        clearInterval(timer);
        timer = null;
        start.src = "images/start.png";
        return ;
        
    }
    start.src = "images/stop.png";
    stopwatch();
    timer = setInterval(stopwatch,1000);
}
function watchStop(){
    clearInterval(timer);
    console.log(timer);
    timer = null;
    start.src = "images/start.png";
}
function watchReset(){
    clearInterval(timer);
    [seconds,minutes,hours] = [0,0,0];
    displayTime.innerHTML = "00:00:00";
    console.log(timer);
    timer = null;
}
/*
startBtn.addEventListener("mouseenter",()=>{
    startBtn.style.transform = "scale(1.1)";


});
startBtn.addEventListener("mouseleave",()=>{
    startBtn.style.transform = "scale(1)";


});
resetBtn.addEventListener("mouseenter",()=>{
    resetBtn.style.transform = "scale(1.1)";


});
resetBtn.addEventListener("mouseleave",()=>{
   
    resetBtn.style.transform = "scale(1)";


});
stopBtn.addEventListener("mouseenter",()=>{
   
    stopBtn.style.transform = "scale(1.1)";

    
    


});
stopBtn.addEventListener("mouseleave",()=>{
   
    stopBtn.style.transform = "scale(1)";

    

});
*/