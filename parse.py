def openFile(path):
 with open(path, "r") as file:
    return file.readlines()

def getColumns(lines):
    left, right = [], []

    for line in lines:
        if line.strip():
            num1, num2 = map(int, line.split())
            left.append(num1)
            right.append(num2)
    return left, right