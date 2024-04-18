import { eventBus } from "../lib/eventBus.js";
import Particle from "./particle.js";

export default class MainCanvasComponent {
  constructor() {
    this.eventSubscriberId = "main-canvas";
    this.canvas = document.querySelector("#main-canvas");
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
    this.canvas.width = document.body.offsetWidth;
    this.canvas.height = document.documentElement.scrollHeight;
    this.canvas.classList.remove("inactive");
    this.ctx = this.canvas.getContext("2d");
    // this.grid();
    // this.canvasDark();
    // this.mouseLight();
    this.mouseEvents();
    this.animate();
  }

  canvasDark() {
    const props = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height,
      color: "rgba(0,0,0,0.9)",
      static: true,
    };

    this.particles.dark = [];
    const darkRect = new this.particleClass("rect", this.ctx);
    darkRect.particleProps(props);
    console.log(darkRect);
    this.particles.dark.push(darkRect);
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
        currentRadius = currentRadius - currentRadius * transitionProgress;
        colorGroup.a = Math.min(
          1,
          groupIndex > 0 ? transitionProgress * 3 : transitionProgress * 0.3
        );
      }

      props.color = `rgba(${Object.values(colorGroup).join(", ")})`;
      const finalProps = { ...props, radius: currentRadius };
      lightSphere.particleProps(finalProps);
      this.particles.lightSphere.push(lightSphere);
    }
  }
  grid() {
    const particleCount = 20;
    const sizeX = this.canvas.width / particleCount;
    const sizeY = this.canvas.height / particleCount;

    this.particles.grid = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = 0; j < particleCount; j++) {
        const props = {
          x: j * sizeX,
          y: i * sizeY,
          lineWidth: 0.1,
          strokeStyle: "black",
          static: true,
        };
        const linedata = [
          { prompt: "moveTo", x: props.x, y: props.y },
          { prompt: "lineTo", x: props.x + (j + 1), y: props.y },
          { prompt: "lineTo", x: props.x + (j + 1), y: props.y * (i + 1) },
          { prompt: "lineTo", x: props.x, y: props.y + (i + 1) },
          { prompt: "lineTo", x: props.x, y: props.y },
        ];

        const line = new this.particleClass("line", this.ctx);
        line.particleProps(linedata);
        console.log(line);
        this.particles.grid.push(line);
      }
    }
  }

  mouseEvents() {
    this.eventBus.subscribe(this.eventSubscriberId, "mousemove", (e) => {
      this.oldMouseX = this.mouseX;
      this.oldMouseY = this.mouseY;
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
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

    const resize = () => {
      console.log('resize');
      this.canvas.width = document.body.offsetWidth;
    this.canvas.height = document.body.offsetHeight;
    };
    this.eventBus.subscribe(
      this.eventSubscriberId,
      "resize",
      resize.bind(this)
    );
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    Object.keys(this.particles).forEach((particleGroup) => {
      this.particles[particleGroup].forEach((particle) => {
        particle.update({ x: this.mouseX, y: this.mouseY });
        particle.draw();
      });
    });
  }
}
