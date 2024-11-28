export default class Webcam {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.video = document.createElement("video");
    this.video.width = 1200;
    this.video.height = 1200;
    // get user media
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1200, height: 1200 } })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();
      });
  }
}
