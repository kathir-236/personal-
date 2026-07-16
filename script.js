

const words=[
"Full Stack Developer",
"Frontend Developer",
"Software Tester",
"Java Developer"
];

let i=0;
let j=0;
let current="";
let isDeleting=false;

function typing(){

current=words[i];

if(!isDeleting){

document.getElementById("typing").innerHTML=current.substring(0,j++);

if(j>current.length){

isDeleting=true;

setTimeout(typing,1200);

return;

}

}else{

document.getElementById("typing").innerHTML=current.substring(0,j--);

if(j==0){

isDeleting=false;

i++;

if(i==words.length){

i=0;

}

}

}

setTimeout(typing,isDeleting?60:120);

}

typing();



// ===============================
// 3D Mouse Tilt
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 20;
        const rotateX = ((0.5 - y / rect.height)) * 20;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-12px)
             scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";

    });

});


// ===============================
// Floating Animation
// ===============================

cards.forEach((card,index)=>{

    card.animate([
        {transform:"translateY(0px)"},
        {transform:"translateY(-12px)"},
        {transform:"translateY(0px)"}
    ],{

        duration:3500+(index*500),

        iterations:Infinity,

        easing:"ease-in-out"

    });

});


// ===============================
// Scroll Reveal
// ===============================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.2
});

cards.forEach(card=>observer.observe(card));


// ===============================
// Mouse Spotlight
// ===============================

cards.forEach(card=>{

    const glow=document.createElement("div");

    glow.className="mouse-glow";

    card.appendChild(glow);

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        glow.style.left=(e.clientX-rect.left)+"px";

        glow.style.top=(e.clientY-rect.top)+"px";

    });

});


// ===============================
// Ripple Buttons
// ===============================

document.querySelectorAll(".buttons a").forEach(btn=>{

    btn.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        ripple.style.left=(e.clientX-rect.left)+"px";

        ripple.style.top=(e.clientY-rect.top)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});
const form=document.getElementById("contactForm");

form.addEventListener("submit",function(e){

e.preventDefault();

emailjs.send(
"YOUR_SERVICE_ID",
"YOUR_TEMPLATE_ID",
{
from_name:document.getElementById("name").value,
from_email:document.getElementById("email").value,
subject:document.getElementById("subject").value,
message:document.getElementById("message").value
}
).then(()=>{
showPopup();
form.reset();
});

});