import { eventBus } from "../lib/eventBus.js";
import Particle from "./particle.js";

export default class MainCanvasComponent {
  constructor() {
    this.eventSubscriberId = "main-canvas";
    this.canvas = document.querySelector("#main-canvas");
    this.wrapper = document.querySelector(".wrapper");
    this.eventBus = eventBus;
    this.particleClass = Particle;
    this.ctx = null;
    this.particles = {};
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.init();
  }

  init() {
    const dimensions = this.wrapper.getBoundingClientRect();
    this.canvas.width = dimensions.width;
    this.canvas.height = dimensions.height;
    this.canvas.classList.remove("inactive");
    this.ctx = this.canvas.getContext("2d");
    this.mouseLight();
    this.mouseEvents();
    this.animate();
  }

  mouseLight() {
    const props = {
      x: this.mouseX,
      y: this.mouseY,
      radius: 50,
      color: "red",
    };
    const lightSphere = new this.particleClass("arc", this.ctx);
    lightSphere.particleProps(props);
    this.particles.lightSphere = [lightSphere];
  }

  updateMouseLight() {}

  mouseEvents() {
    this.eventBus.subscribe(this.eventSubscriberId, "mousemove", (e) => {
      this.oldMouseX = this.mouseX;
      this.oldMouseY = this.mouseY;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      if (
        this.mouseX < 0 ||
        this.mouseX > this.canvas.width ||
        this.mouseY < 0 ||
        this.mouseY > this.canvas.height
      ) {
        return;
      }
    });

    this.eventBus.subscribe(this.eventSubscriberId, "mousedown", () => {
      this.mouseDown = true;
    });

    this.eventBus.subscribe(this.eventSubscriberId, "mouseup", () => {
      this.mouseDown = false;
    });
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    Object.keys(this.particles).forEach((particleGroup) => {
      this.particles[particleGroup].forEach((particle) => {
        particle.update({ x: this.mouseX, y: this.mouseY });
        particle.draw()
        console.log(particle);
      });
    });
  }
}
