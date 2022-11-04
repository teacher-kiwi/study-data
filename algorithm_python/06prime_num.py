from time import time
n = int(input("몇 이하의 소수를 구할까요?\n"))

def get_prime(n):
  if n <= 1:
    return []
  
  result = [2]
  if n == 2:
    return [2]
  
  limit = int(n ** 0.5)
  data = [i+1 for i in range(2, n, 2)]
  while data[0] <= limit:
    result.append(data[0])
    data = [j for j in data if j % data[0] != 0]

  return result + data

start = time()
print(get_prime(n))
end = time()
print(f"{end - start:.5f} sec")
