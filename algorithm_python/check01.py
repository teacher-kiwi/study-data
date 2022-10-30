# 문제1 값에 의한 전달 pass by value
a = 3

def calc1(a):
  a += 4
  return a

print(a)
# 3
print(calc1(a))
# 7
print(a)
# 3

# 문제2 참조에 의한 전달 pass by reference
b = [3]

def calc2(b):
  b[0] += 4
  return b

print(b)
# [3]
print(calc2(b))
# [7]
print(b)
# [7]

# 문제3
c = [3]

def calc3(c):
  c = [4]
  return c

print(c)
# [3]
print(calc3(c))
# [4]
print(c)
# [3]