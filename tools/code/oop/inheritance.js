class Animal {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return `${this.name} is an animal`;
  }
}

class Dog extends Animal {
  fetch() {
    return `${this.name} brings back the ball`;
  }
}

const pet = new Dog("Milo");
console.log(pet.describe());
console.log(pet.fetch());
