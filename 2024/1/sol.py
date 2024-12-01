from parse import getColumns, openFile

lines = openFile('2024/1/input.txt')
left,right = getColumns(lines)

print(sum(abs(a - b) for a, b in zip(sorted(left), sorted(right))))