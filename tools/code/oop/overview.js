class Lamp {
  constructor(color) {
    this.color = color;
    this.isOn = false;
  }

  switchOn() {
    this.isOn = true;
    return `${this.color} lamp is on`;
  }
}

const deskLamp = new Lamp("blue");
console.log(deskLamp.switchOn());
