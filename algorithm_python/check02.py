# 윤년 출력하기
def 윤년():
  data = [i for i in range(1950, 2051) if i % 4 == 0]
  return [i for i in data if not (i % 100 == 0 and i % 400 != 0)]

print(윤년())

# 조선시대 왕조의 계보로 출력
from sys import exit

def 조선왕조_계보(n):
  if 1392 > n or n > 1451: 
    print("범위를 벗어났습니다.")
    exit()

  data = {"태조": (1392, 1397), "정종": (1398, 1399), "태종": (1400, 1417), "세종": (1418, 1449)}
  for i, j in data.items():
    if n >= j[1]:
      continue
    else:
      print(f"{i} {n - j[0] + 1}년")
      exit()
  print(f"문종 {n - 1449}년")

n = input("연도 입력: ")
if not n.isdecimal():
  print("정수를 입력하세요.")
  exit()

print(조선왕조_계보(int(n)))