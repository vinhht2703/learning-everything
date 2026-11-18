class Animal:
    def __init__(self, name):
        self.name = name

    def describe(self):
        return f"{self.name} is an animal"

class Dog(Animal):
    def fetch(self):
        return f"{self.name} brings back the ball"

pet = Dog("Milo")
print(pet.describe())
print(pet.fetch())
