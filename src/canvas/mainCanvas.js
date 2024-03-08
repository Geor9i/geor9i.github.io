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
    this.light = {
      radius: 50,
    };
    this.init();
  }

  init() {
    const dimensions = this.wrapper.getBoundingClientRect();
    this.canvas.width = dimensions.width;
    this.canvas.height = dimensions.height;
    this.resizeCanvas();
    this.canvas.classList.remove("inactive");
    this.ctx = this.canvas.getContext("2d");
    this.mouseLight();
    this.mouseEvents();
    this.animate();
  }

  resizeCanvas() {
    const resize = () => {
      const dimensions = this.wrapper.getBoundingClientRect();
      this.canvas.width = dimensions.width;
      this.canvas.height = dimensions.height;
    };
    this.eventBus.subscribe(
      this.eventSubscriberId,
      "resize",
      resize.bind(this)
    );
  }

  mouseLight() {
    const props = {
      x: this.mouseX,
      y: this.mouseY,
      radius: 200,
      color: "rgba(255,255,255,1)",
      lineWidth: 1,
    //   shadowBlur: 5,
    //   shadowColor: "white",
    };

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const iterations = 888;
    const colorGroups = [
      { r: 255, g: 140, b: 3, a: 0 }, // Yellow layer
      { r: 255, g: 255, b: 255, a: 0 }, // White layer
    ];
    const groupIterations = Math.floor(iterations / colorGroups.length);
    this.particles.lightSphere = [];
    let currentRadius = props.radius;
    let transitionProgress = 0; // Track progress within each group
    for (let i = 0; i < iterations; i++) {
      const lightSphere = new this.particleClass("arc", this.ctx);
      const groupIndex = Math.floor(i / groupIterations);
      const colorGroup = colorGroups[groupIndex];

      if (i % groupIterations === 0) {
        props.radius /= goldenRatio;
        currentRadius = props.radius;
        transitionProgress = 0;
      } else {
        transitionProgress =
          (i - groupIterations * groupIndex) / groupIterations;
        currentRadius = currentRadius - (currentRadius * transitionProgress);
        colorGroup.a = Math.min(1, groupIndex > 0 ? transitionProgress * 3 : transitionProgress * 0.3);
      }

      props.color = `rgba(${Object.values(colorGroup).join(", ")})`;
      const finalProps = { ...props, radius: currentRadius };
      console.log(finalProps);
      lightSphere.particleProps(finalProps);
      this.particles.lightSphere.push(lightSphere);
    }
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
        particle.draw();
      });
    });
  }
}
