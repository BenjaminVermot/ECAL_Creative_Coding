import Circle from "./Circle.js";
import BaseApp from "../js/BaseApp";

export default class App extends BaseApp {
  constructor() {
    super();

    this.init();
    this.inputValue = 0;

    this.rowAmount = 4;
    this.columnAmount = 4;

    this.circles = [];
  }

  init() {
    console.log("init");

    //configurer MIDI
    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess()
        .then(this.setupMIDI.bind(this))
        .catch((err) => console.log(err));
    }

    this.draw();
  }

  setupMIDI(midiAccess) {
    //le paramètre "midiAccess" est nécessaire et detecte les différents inputs que le matériel MIDI possède (donc depent du controller)
    const inputs = midiAccess.inputs.values();
    for (const input of inputs) {
      console.log("🎹", inputs);
      input.onmidimessage = this.handleMIDIMessage.bind(this); //a chaque fois qu'on intéragi avec les boutons, appel la fonction handleMIDIMessage
    }
  }

  handleMIDIMessage(message) {
    const [command, controller, value] = message.data;
    console.log("intéraction:", command, controller, value);

    if (command === 176) {
      if (controller === 1) {
        let newColumnAmount = value;

        newColumnAmount = (newColumnAmount / 127) * 20; //normaliser et multiplier et définir la range
        console.log("new column amount = ", newColumnAmount);
        this.columnAmount = newColumnAmount;
        //this.circle.updatePosY(posY);
      }
      if (controller === 2) {
        let newRowAmount = value;
        newRowAmount = (newRowAmount / 127) * 20; //normaliser et multiplier et définir la range
        console.log("new rows amount = ", newRowAmount);
        this.rowAmount = newRowAmount;
        //this.circle.updatePosX(posX);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawGrid();

    // transformer le canvas en flip book
    requestAnimationFrame(this.draw.bind(this));
  }

  drawGrid() {
    const padding = 80;
    for (let i = 0; i <= this.columnAmount; i++) {
      for (let j = 0; j <= this.rowAmount; j++) {
        let n = new Circle(this.ctx, i * padding, j * padding, 10);
        this.circles.push(n);
        n.draw();
      }
    }

    console.log("drawing grid");
  }
}
