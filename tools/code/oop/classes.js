class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return "...";
  }
}

class Dog extends Animal {
  speak() {
    return "Woof!";
  }
}

class Cat extends Animal {
  speak() {
    return "Meow!";
  }
}

const pets = [new Dog("Milo"), new Cat("Nori")];
for (const pet of pets) {
  console.log(`${pet.name}: ${pet.speak()}`);
}
