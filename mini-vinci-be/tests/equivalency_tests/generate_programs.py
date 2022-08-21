import random
"""
cut [5] [2,3]
cut [16.2] [V] [999]
color [5.42.400] [32, 42, 52, 255]
swap [4.2.1] [1.2.4.8]
merge [82] [192.168.1.1]
"""

def generate_identical_programs_type1():
    """
    let c1, c2 be colors, b1, b2 be blocks.
    color b1 c1
    color b2 c2
    swap b1 b2
    ===========================
    color b1 c2
    color b2 c1
    """
    b1 = '[{}]'.format(random.randint(0, 9))
    c1 = '[{}, {}, {}, {}]'.format(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    
    b2 = '[{}]'.format(random.randint(0, 9))
    c2 = '[{}, {}, {}, {}]'.format(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))

    prog1 = 'color {} {}\n'.format(b1, c1)
    prog1 += 'color {} {}\n'.format(b2, c2)
    prog1 += 'swap {} {}'.format(b1, b2)

    prog2 = 'color {} {}\n'.format(b1, c2)
    prog2 += 'color {} {}'.format(b2, c1)

    return prog1, prog2

def generate_identical_programs_type2():
    """
    cut [0] [o1] [x1]
    swap [0.0] [0.1]
    color [0.0] [r1, g1, b1, a1]
    color [0.1] [r2, g2, b2, a2]

    cut [0] [o1] [x1]
    color [0.0] [r2, g2, b2, a2]
    color [0.1] [r1, g1, b1, a1]
    swap [0.0] [0.1]
    """
    
    orientations = ['v', 'V', 'h', 'H']
    o = '[{}]'.format(random.choice(orientations))

    x = '[{}]'.format(random.randint(0, 100))
    c1 = '[{}, {}, {}, {}]'.format(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    c2 = '[{}, {}, {}, {}]'.format(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))

    prog1 = 'cut {} {} {}\n'.format('0', o, x)
    prog1 += 'swap [{}] [{}]\n'.format('0.0', '0.1')
    prog1 += 'color [{}] {}\n'.format('0.0', c1)
    prog1 += 'color [{}] {}'.format('0.1', c2)

    prog2 = 'cut {} {} {}\n'.format('0', o, x)
    prog2 += 'color [{}] {}\n'.format('0.0', c2)
    prog2 += 'color [{}] {}\n'.format('0.1', c1)
    prog2 += 'swap [{}] [{}]'.format('0.0', '0.1')

    return prog1, prog2

def generate_identical_programs_type3():
    """
    cut b [x, y]
    Color each part.
    Merge them.
    Must be equal
    cut b [x] -> gives you b.1 b.2 as sublocks.
    cut b.1 [y] 
    cut b.2 [y]
    Color each part.
    Merge them.
    """
    
    
    """
    cut [0] [x, y]
    color [0.0] c0
    color [0.1] c1
    color [0.2] c2
    color [0.3] c3
    merge [0.0] [0.1]
    merge [0.2] [0.3]
    merge [1] [2]

    cut [0] [h] [y]
    cut [0.0] [v] [x]
    cut [0.1] [v] [x]
    color [0.0.0] c0
    color [0.0.1] c1
    color [0.1.0] c3
    color [0.1.1] c2
    merge [0.0.0] [0.0.1]
    merge [0.1.0] [0.1.1]
    merge [1] [2]
    """

    x, y = random.randint(0, 100), random.randint(0, 100)
    c0 = '[{}, {}, {}, {}]'.format(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    c1 = '[{}, {}, {}, {}]'.format(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    c2 = '[{}, {}, {}, {}]'.format(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    c3 = '[{}, {}, {}, {}]'.format(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))

    prog1 = 'cut [0] [{}, {}]\n'.format(x, y)
    prog1 += 'color [0.0] {}\n'.format(c0)
    prog1 += 'color [0.1] {}\n'.format(c1)
    prog1 += 'color [0.2] {}\n'.format(c2)
    prog1 += 'color [0.3] {}\n'.format(c3)
    prog1 += 'merge [0.0] [0.1]\n'
    prog1 += 'merge [0.2] [0.3]\n'
    prog1 += 'merge [1] [2]'

    prog2 = 'cut [0] [{}] [{}]\n'.format('h', y)
    prog2 += 'cut [0.0] [{}] [{}]\n'.format('v', x)
    prog2 += 'cut [0.1] [{}] [{}]\n'.format('v', x)
    prog2 += 'color [0.0.0] {}\n'.format(c0)
    prog2 += 'color [0.0.1] {}\n'.format(c1)
    prog2 += 'color [0.1.0] {}\n'.format(c3)
    prog2 += 'color [0.1.1] {}\n'.format(c2)
    prog2 += 'merge [0.0.0] [0.0.1]\n'
    prog2 += 'merge [0.1.0] [0.1.1]\n'
    prog2 += 'merge [1] [2]'

    return prog1, prog2

    
p1, p2 = generate_identical_programs_type3()
print(p1)
print()
print(p2)
