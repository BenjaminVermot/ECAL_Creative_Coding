import App from "./js/App.js";

const app = new App();

app.createCanvas(window.innerWidth, window.innerHeight);
// app.createGrid(30,20);
app.animate(40, 20);
