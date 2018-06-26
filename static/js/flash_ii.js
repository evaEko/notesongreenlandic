//let vocbase = [["Sulivunga.","I work(ed)."],["Sulivutit.","You work(ed))."],["Sulivoq.","It works(ed)."]];
"use strict";
let voc;
let random;
let currentCard;
let lang = 0;

function init(){
    voc = vocbase.slice();
    pick();
    document.getElementById("next").innerHTML = "Answer";
}

function pick(){
    let max = voc.length;
    random = Math.floor(Math.random()* max);
    currentCard = voc[random];
    display(currentCard);
}

function next(){
  if ( document.getElementById("back").innerHTML=="" || document.getElementById("front").innerHTML==""){
    flip();
    document.getElementById("next").innerHTML = "Next";
  } else {
   //alert(random + currentCard[0]);
   //alert(currentCard[0]);
   voc.splice(random, 1);
   if (voc.length === 0){
     init();
   };
   pick();
   document.getElementById("next").innerHTML = "Answer";
  }
}

function display(){
  if (lang == 0){
   document.getElementById("front").innerHTML = currentCard[0];
   document.getElementById("back").innerHTML = "";
  } else {
   document.getElementById("front").innerHTML = "";
   document.getElementById("back").innerHTML = currentCard[1];
  } 
}

function flip(){
  if (lang==0){
   document.getElementById("front").innerHTML = currentCard[1];
  } else {
   document.getElementById("back").innerHTML = currentCard[0];
  }
}

function switchLang(){
  if (lang == 0){
    lang = 1;
  }
  else {
    lang = 0;
  }
  display()
}
