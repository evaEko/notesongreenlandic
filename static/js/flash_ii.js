 "use strict";
  //current deck:
  let voc;
  //current random number:
  let random;
  //card with the index random:
  let currentCard;
  //current language:
  let lang = 0;
  
  init();

  function init() {
    //copy the entire deck to the current deck:
    voc = vocbase.slice();
    //get and display a random current card:
    pick();
    //document.getElementById("next").innerHTML = "Answer";
    //alert(voc.length);
  }

  function pick() {
    let max = voc.length;
    random = Math.floor(Math.random() * max);
    currentCard = voc[random];
    display(currentCard);
  }

  function next() {
    if (document.getElementById("back").innerHTML == '' || document.getElementById("front").innerHTML == '') {
      flip();
      document.getElementById("next").innerHTML = "Next";
    } else {
        //alert(random + currentCard[0]);
        //alert(currentCard[0]);
        voc.splice(random, 1);
        if (voc.length === 0) {
          init();
        };
      pick();
      document.getElementById("next").innerHTML = "Answer";
    }
  }

  function display() {
    if (lang == 0) {
      document.getElementById("front").innerHTML = currentCard[0];
      document.getElementById("back").innerHTML = "";
    } else {
      document.getElementById("front").innerHTML = "";
      document.getElementById("back").innerHTML = currentCard[1];
    }
  }

  function flip() {
    document.getElementById("front").innerHTML = currentCard[0];
    document.getElementById("back").innerHTML = currentCard[1];
  }

  function switchLang() {
    if (lang == 0) {
      lang = 1
      document.getElementById("switch").innerHTML = "Switch";
    } else {
      lang = 0;
      document.getElementById("switch").innerHTML = "Switch";
    }
    display()
  }