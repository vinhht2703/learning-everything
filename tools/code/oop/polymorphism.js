class Dog {
  speak() { return "Woof!"; }
}

class Cat {
  speak() { return "Meow!"; }
}

class Bird {
  speak() { return "Tweet!"; }
}

for (const animal of [new Dog(), new Cat(), new Bird()]) {
  console.log(animal.speak());
}
