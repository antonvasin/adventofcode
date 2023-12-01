lines = open('input1.txt', 'r').read().splitlines()

def find_num(line):
    first_int = ''
    last_int = ''

    for char in line:
        if char.isdigit():
            if not first_int:
                first_int = char
                last_int = char
            else:
                last_int = char

    return int(first_int + last_int)

print(sum(map(find_num, lines)))
