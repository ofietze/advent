# Read input from a text file
with open("input.txt", "r") as file:
    lines = file.readlines()

left, right = [], []

for line in lines:
    if line.strip():
        num1, num2 = map(int, line.split())
        left.append(num1)
        right.append(num2)

print(sum(abs(a - b) for a, b in zip(sorted(left), sorted(right))))