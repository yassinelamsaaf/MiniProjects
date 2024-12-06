let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains3 = document.getElementById('mountains3');
let mountains4 = document.getElementById('mountains4');
let river5 = document.getElementById('river5');
let boat6 = document.getElementById('boat6');
let yassine = document.querySelector('.yassine');
window.onscroll = function(){
    let value=scrollY;
    stars.style.left=value+'px';
    moon.style.top=value*4+'px';
    mountains3.style.top=value*1.5+'px';
    mountains4.style.top=value+'px';
    river5.style.top=value*0.7+'px';
    boat6.style.top=value*0.7+'px';
    boat6.style.left=value*3 +'px';
    yassine.style.fontSize=value+'px';
    if(value >= 70){
    yassine.style.fontSize=67+'px';
    yassine.style.position="fixed";
    if(value >= 480.79998779296875){
        yassine.style.display = 'none';
    }
    else{
        yassine.style.display = 'block'
    }
    if(value >= 92.4000015258789){
        document.querySelector('body').style.background = 'linear-gradient(rgb(51, 0, 58), rgb(11, 0, 15))'
    }
    else{
        document.querySelector('body').style.background = 'linear-gradient(rgb(51, 0, 58), rgb(67 182 235))'
    }
    }

}

