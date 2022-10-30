# 기본적인 리스트 내포
a = [i for i in range(10)]
print(a)
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

a = [i * 10 for i in range(10)]
print(a)
# [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]


# 조건이 붙은 리스트 내포
a = [i for i in range(10) if i % 2 == 0]
print(a)
# [0, 2, 4, 6, 8]

# 삼항 연산자를 활용한 리스트 내포
a = [i if i % 2 == 0 else 0 for i in range(10)]
print(a)
# [0, 0, 2, 0, 4, 0, 6, 0, 8, 0]
