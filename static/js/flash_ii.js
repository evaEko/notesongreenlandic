 "use strict";
  //current deck:
  let voc;
  //current random number:
  let random;
  //card with the index random:
  let currentCard;
  //current language:
  let lang = 0;
  //display mode by default:
  let mode = 0;
  
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
    //behavior to show answer:
    //if one od the sides is not displayed (the user is requesting an answer):
    if (document.getElementById("back").innerHTML == '&nbsp;' ||
        document.getElementById("front").innerHTML == '&nbsp;') {
          if (mode == 0){
            flip();
          } else{
             validateAnswer();
          };
      document.getElementById("next").innerHTML = "Next";
    } else {
     //standard behavior for the next card:
     //behavior to delete the current card 
     //create a new deck if it was the last one
     //and pick a card from the deck.
      newCard();
    }
  }

  function newCard(){
     clearUserInputAndValidatioAndValidation();
     voc.splice(random, 1);
       if (voc.length === 0) {
         init();
       };
     pick();
     document.getElementById("next").innerHTML = "Answer";
  }

  function display() {
    if (lang == 0) {
      document.getElementById("front").innerHTML = currentCard[0];
      document.getElementById("back").innerHTML = "&nbsp;";
    } else {
      document.getElementById("front").innerHTML = "&nbsp;";
      document.getElementById("back").innerHTML = currentCard[1];
    }
  }

  function flip() {
    document.getElementById("front").innerHTML = currentCard[0];
    document.getElementById("back").innerHTML = currentCard[1];
  }

  function validateAnswer() {
    let userinput;
    let requiredAnswer;
    if (mode == 0 ){
      requiredAnswer = currentCard[0];
      userinput = document.getElementById('back_input').value;
      flip();
      //alert(requiredAnswer+ userinput);
      
    }else{
      requiredAnswer = currentCard[1];
      userinput = document.getElementById('front_input').value;
      flip();
      launchDiff(userinput, requiredAnswer);
    }
  }

  function clearUserInputAndValidatioAndValidation(){
      document.getElementById('front_input').value="";
      document.getElementById('back_input').value="";
      document.getElementById('validity_check').innerHTML="&nbsp;";


  }

  function launchDiff(x, y) {
    var dmp = new diff_match_patch();

    dmp.Diff_Timeout = 10;
    dmp.Diff_EditCost = 3;
  
    var ms_start = (new Date()).getTime();
    var d = dmp.diff_main(x,y);
    var ms_end = (new Date()).getTime();
  
    var ds = dmp.diff_prettyHtml(d);
    document.getElementById('validity_check').innerHTML = "Your answer: "+ds;
  }

  function switchLang() {
    if (lang == 0) {
      lang = 1
    } else {
      lang = 0;
    }
    clearUserInputAndValidatioAndValidation();
    display()
  }
  function switchMode(){
    if (mode == 0) {
      mode = 1;
      document.getElementById("mode").innerHTML = "Show";
      if (lang = 0){
         document.getElementById("back_input").style.display="block";
      } else {
         document.getElementById("front_input").style.display="block";
      }
    } else {      
      mode = 0;
      document.getElementById("mode").innerHTML = "Write";
      document.getElementById("back_input").style.display="none";
      document.getElementById("front_input").style.display="none";
    }
  }