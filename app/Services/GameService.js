import store from "../store.js";
import Game from "../Models/Game.js";
import Question from "../Models/Question.js";

var cashValue = 0;
// @ts-ignore
const _api = axios.create({
  baseUrl: "",
});

class GameService {
  next() {
    _api.get("https://jservice.io/api/random").then((res) => {
      let rawQuestion = {
        question: res.data[0].question,
        answer: res.data[0].answer,
        value: res.data[0].value,
      };
      let newQuestion = new Question(rawQuestion);
      cashValue = newQuestion.value;
      store.commit("question", newQuestion);
    });
  }
  no() {
    let g = new Game();
    // @ts-ignore
    g.cash = store.State.game.cash;
    g.cash -= cashValue;
    store.commit("game", g);
    cashValue = 0;
    // @ts-ignore
  }
  yes() {
    let g = new Game();
    // @ts-ignore
    g.cash = store.State.game.cash;
    g.cash += cashValue;
    store.commit("game", g);
    cashValue = 0;
    // @ts-ignore
  }
  endTimer() {}
  startGame() {}
}

const service = new GameService();
export default service;
