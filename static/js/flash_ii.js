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

  const backCard = document.getElementById("back");
  const frontCard = document.getElementById("front");
  const backInput = document.getElementById("back_input");
  const frontInput = document.getElementById("front_input");
  const nextButton = document.getElementById("next");
  const validityInfo = document.getElementById('validity_check');
  
  init();

  function init() {
    //copy the entire deck to the current deck(cards will be thrown away):
    voc = vocbase.slice();
    //get and display a random current card:
    pick();
  }
  
  //pick and display a random card from the copied card deck:
  function pick() {
    let max = voc.length;
    random = Math.floor(Math.random() * max);
    currentCard = voc[random];
    display(currentCard);
  }

  function next() {
    //behavior to show answer:
    //if one od the sides is not displayed (the user is requesting an answer):
    if (backCard.innerHTML == '&nbsp;' || frontCard.innerHTML == '&nbsp;') {
          if (mode == 0){
            flip();
          } else {
             validateAnswer();
          };
      nextButton.innerHTML = "Next";
    } else {
     //standard behavior for the next card:
     //behavior to delete the current card 
     //create a new deck if it was the last one
     //and pick a card from the deck.
      newCard();
    }
  }

  function newCard(){
     //clear user input from input fields and the validation info:
     clearUserInputAndValidationInfo();
     voc.splice(random, 1);
       if (voc.length === 0) {
         init();
       };
     pick();
     nextButton.innerHTML = "Answer";
  }

  function display() {
    if (lang == 0) {
      frontCard.innerHTML = currentCard[0];
      backCard.innerHTML = "&nbsp;";
    } else {
      frontCard.innerHTML = "&nbsp;";
      backCard.innerHTML = currentCard[1];
    }
  }

  function flip() {
    frontCard.innerHTML = currentCard[0];
    backCard.innerHTML = currentCard[1];
  }

  function validateAnswer() {
    let userinput;
    let requiredAnswer;
    if (lang == 0 ){
      requiredAnswer = currentCard[1];
      userinput = frontInput.value;
      flip();
      launchDiff(userinput, requiredAnswer);
    } else {
      requiredAnswer = currentCard[0];
      userinput = backInput.value;
      flip();
      launchDiff(userinput, requiredAnswer);
    }
  }

  function clearUserInputAndValidationInfo(){
      frontInput.value="";
      backInput.value="";
      validityInfo.innerHTML="&nbsp;";
  }

  function launchDiff(x, y) {
    var dmp = new diff_match_patch();

    dmp.Diff_Timeout = 10;
    dmp.Diff_EditCost = 3;
  
    var ms_start = (new Date()).getTime();
    var d = dmp.diff_main(x,y);
    var ms_end = (new Date()).getTime();
  
    var ds = dmp.diff_prettyHtml(d);
    validityInfo.innerHTML = "Your answer: "+ds;
  }

  function switchLang() {
    if (lang == 0) {
      lang = 1
      if (mode == 1){
        frontInput.style.display="block";
        backInput.style.display="none";
      }
    } else {
      lang = 0;
      if (mode == 1){
        frontInput.style.display="block";
        backInput.style.display="none";
      }
    }
    clearUserInputAndValidationInfo();
    nextButton.innerHTML="Answer";
    display();
  }
  function switchMode(){
    clearUserInputAndValidationInfo();
    nextButton.innerHTML="Answer";
    if (mode == 0) {
      mode = 1;
      document.getElementById("mode").innerHTML = "Show";
      if (lang = 0){
         backInput.style.display="block";
      } else {
         frontInput.style.display="block";
      }
    } else {      
      mode = 0;
      document.getElementById("mode").innerHTML = "Write";
      backInput.style.display="none";
      frontInput.style.display="none";
    }
  }