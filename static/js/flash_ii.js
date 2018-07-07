 "use strict";
  //current language:
  let sourceLang = "EN";
  //display mode by default:
  let mode = "Display";
  
  const englishCard = document.getElementById("front");
  const greenlandicCard = document.getElementById("back");
  let englishInput = document.getElementById("front_input");
  let greenlandicInput = document.getElementById("back_input");
  let validityInfo = document.getElementById('validity_check');
  let nextButton = document.getElementById('next');
  let modeButton = document.getElementById('mode');
  
  
  //deck, which is a copy of the full deck:
  let currentDeck = initCurrentDeck(vocbase);
  //random card from the deck:
  let currentCard = getNewCard(currentDeck); 
  displayNewCard(currentCard);

  function initCurrentDeck(vocbase) {
    return vocbase.slice();
  }
  function getNewCard(currentDeck) {
    var randomCardNo = getRandomCardNo(currentDeck);
    var pickedCard = currentDeck[randomCardNo];
    var newCard = { index:randomCardNo, english: pickedCard[1], greenlandic:pickedCard[0] };
    removeCardFromCurrentDeck(newCard);
    return newCard;
  }
  //pick and display a random card from the copied card deck:
  function getRandomCardNo(currentDeck) {
    let max = currentDeck.length;
    let randomCardNumber = Math.floor(Math.random() * max);
    return randomCardNumber;
  }
  function removeCardFromCurrentDeck(card){
    currentDeck.splice(card.index, 1);
    if (currentDeck.length === 0) {
      currentDeck = vocbase.slice();
    } else {
      currentDeck;
    }
  }
  function displayNewCard(card){
    clearCurrentData();
    if (mode == "Display"){
      displayNewCardInDisplayMode(card);
    } else {
      displayNewCardInWriteMode(card);
    }
  }
  function displayNewCardInDisplayMode(card) {
    if ( sourceLang == "EN" ){
      englishCard.innerHTML = card.english;
    } else{
      greenlandicCard.innerHTML = card.greenlandic;
    }
  }
  function displayNewCardInWriteMode(card) {
    if ( sourceLang == "EN" ){
      englishInput.innerHTML = card.english;
      greenlandicInput.style.display ="block";
    } else{
      greenlandicCard.innerHTML = card.greenlandic;
      englishInput.style.display ="block";
//      greenlandicCard.innerHTML = card.greenlandic;
    }
  }
  function clearCurrentData(){
     greenlandicInput.style.display ="none";
     englishInput.style.display ="none";
     englishInput.innerHTML ="";
     greenlandicInput.innerHTML ="";
     englishCard.innerHTML ="&nbsp;";
     greenlandicCard.innerHTML ="&nbsp;";
  }
  function next(){
    if (nextButton.innerHTML == "Answer") {
      displayCardAnswer(getCurrentCard());
      nextButton.innerHTML = "Next";
    } else {
      currentCard = getNewCard(getCurrentDeck());
      displayNewCard(currentCard);
      nextButton.innerHTML = "Answer";
    }
  }
  function displayCardAnswer(currentCard){
    if (mode == "Display"){
      displayCardAnswerInDisplayMode(currentCard);
    } else {
      displayCardAnswerInWriteMode(currentCard);
    }
  }
  function displayCardAnswerInDisplayMode(currentCard){
    if (sourceLang == "EN"){
      greenlandicCard.innerHTML = currentCard.greenlandic;
    } else {
      englishCard.innerHTML = currentCard.english;
    }
  }
  function displayCardAnswerInWriteMode(currentCard) {
    var requiredAnswer;
    var userinput;
    if (sourceLang == "EN" ){
      requiredAnswer = currentCard.greenlandic;
      userinput = greenlandicInput.value;
    } else {
      requiredAnswer = currentCard.english;
      userinput = englishInput.value;
    }
    launchDiff(userinput, requiredAnswer);
    if (sourceLang == "EN"){
      greenlandicCard.innerHTML = currentCard.greenlandic;
    } else {
      englishCard.innerHTML = currentCard.english;
    }
  }
  function launchDiff(y, x) {
    var dmp = new diff_match_patch();

    dmp.Diff_Timeout = 10;
    dmp.Diff_EditCost = 3;
  
    var ms_start = (new Date()).getTime();
    var d = dmp.diff_main(x,y);
    var ms_end = (new Date()).getTime();
  
    var ds = dmp.diff_prettyHtml(d);
    validityInfo.innerHTML = "Your answer analysis: "+ds;
  } 
  function switchMode(){
    clearCurrentData();
    if (mode == "Display"){
      mode = "Write";
      modeButton.innerHTML="Display";
    } else {
      mode = "Display";
      modeButton.innerHTML="Write";
    }
    //currentCard = getNewCard(currentDeck);
    displayNewCard(currentCard);
  }
  function switchLang(){
    if (sourceLang == "EN"){
      sourceLang = "GL"
    } else {
      sourceLang = "EN"
    }
    nextButton.innerHTML = "Answer";
    //currentCard = getNewCard(getCurrentDeck());
    displayNewCard(currentCard);
  }
  function getCurrentCard(){
    return currentCard;
  }
  function getCurrentDeck(){
    return currentDeck;
  }
  function getCurrentMode(){
    return mode;
  }