// @ts-nocheck
import GameService from "../Services/GameService.js";
import store from "../store.js";
import Game from "../Models/Game.js";

//Private
function _draw() {
  let questionTemplate = "";
  questionTemplate += store.State.question.TemplateQuestion;
  document.getElementById("question").innerHTML = questionTemplate;
  let answerTemplate = "";
  answerTemplate += store.State.question.TemplateAnswer;
  document.getElementById("answer").innerHTML = answerTemplate;
  document.getElementById(
    "cash"
  ).innerHTML = `Player cash ${store.State.game.cash}`;
}
function _hide(element) {
  document.getElementById(element).classList.add("hidden");
}
function _show(element) {
  document.getElementById(element).classList.remove("hidden");
}

//Public
export default class GameController {
  constructor() {
    store.subscribe("game", _draw);
    store.subscribe("question", _draw);
    _draw();
  }

  startGame() {
    let game = new Game();
    console.log(game);
    store.commit("game", game);
    GameService.startGame();
    _hide("start-btn");
    this.next();
  }
  endTimer() {
    GameService.endTimer();
    _show("answer");
    _show("yes");
    _show("no");
  }
  yes() {
    GameService.yes();
  }
  no() {
    GameService.no();
  }
  next() {
    _hide("answer");
    _hide("yes");
    _hide("no");
    GameService.next();
  }
}
