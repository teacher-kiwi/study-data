# 10진수를 다른 기수로
n = 18

def convert(n, base):
  result = ""
  while n > 0:
    result = str(n % base) + result
    n //= base
  return result

# print(convert(n, 2))
# print(convert(n, 3))
# print(convert(n, 4))
# print(convert(n, 5))
# print(convert(n, 6))
# print(convert(n, 7))
# print(convert(n, 8))


# 2진수를 10진수로
n = 10010

def convert(n):
  result = 0
  for i in range(len(str(n))):
    result += int(str(n)[i]) * 2 ** (len(str(n)) - i - 1)
  return result

# print(convert(n))


# 내장함수로
a = 18
print(bin(a)) # 2진수로(앞에 0b 가 붙음)

b = 10010
print(int(str(b), 2)) # 10진수로
b = 200
print(int(str(b), 3)) # 10진수로
b = 102
print(int(str(b), 4)) # 10진수로
b = 33
print(int(str(b), 5)) # 10진수로
b = 30
print(int(str(b), 6)) # 10진수로
b = 24
print(int(str(b), 7)) # 10진수로
b = 22
print(int(str(b), 8)) # 10진수로
