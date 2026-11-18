class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Bird:
    def speak(self):
        return "Tweet!"

for animal in [Dog(), Cat(), Bird()]:
    print(animal.speak())
