export default class Question {
  constructor(data) {
    this.question = data.question;
    this.value = data.value;
    this.answer = data.answer;
  }

  get TemplateQuestion() {
    return `Cash value: ${this.value}<br>${this.question}
  `;
  }
  get TemplateAnswer() {
    return `${this.answer}`;
  }
}
