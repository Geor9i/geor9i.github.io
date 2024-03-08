export default class Particle {
  constructor(shape, ctx) {
    this.typeRange = ["arc", "rect", "text", "line"];
    if (
      typeof shape !== "string" ||
      !this.typeRange.includes(shape.toLowerCase())
    ) {
      throw new Error("Unknown Particle Type!");
    }
    this.shape = shape;
    this.ctx = ctx;
  }

  particleProps(props) {
    const baseProps = {
      x: 0,
      y: 0,
      radius: 0,
      width: 0,
      height: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      stroke: false,
      color: false,
      lineWidth: 1,
      fontSize: 16,
      fontFamily: "Arial",
      textMessage: "",
      strokeText: false,
    };
    const requiredProps = [
      ...this._getPropOrder(this.shape),
      ...this._getPropOrder("sideValues"),
    ];
    requiredProps.forEach((propName) => {
      const selectedProp = props.hasOwnProperty(propName)
        ? props[propName]
        : baseProps[propName];
        this[propName] = selectedProp;
    });
  }

  _getPropOrder(shape) {
    const propOrder = {
      arc: ["x", "y", "radius", "startAngle", "endAngle"],
      rect: ["x", "y", "width", "height"],
      text: ["fontSize", "fontFamily", "textMessage", "x", "y"],
      line: ["lineData"],
      sideValues: ["stroke", "color", "lineWidth", "strokeText"],
    };
    return propOrder[shape];
  }

  _getPropArr() {
    return [...this._getPropOrder(this.shape)].map(
      (propName) => this[propName]
    );
  }

  /**
 * 
 * @param {*} props An Object containing the particle props for selected shape:
 * arc: x, y, radius, startAngle, endAngle;
 * rect: x, y, width, height;
    - include also side props:
      stroke,
      lineWidth,  
      color
 */
  draw() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    if (this.shape === "text") {
      this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
      this.ctx[this.strokeText ? "strokeText" : "fillText"](
        this.textMessage,
        this.x,
        this.y
      );
    } else if (this.shape === "line") {
      this.lineData.forEach((data) => {
        const { prompt, x, y } = data;
        this.ctx[prompt](x, y);
      });
    } else {
      this.ctx[this.shape](...this._getPropArr());
    }
    if (this.color) {
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
    if (this.stroke) {
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }

  update(props) {
    for (let prop in props) {
      if (this.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }
  }
}
