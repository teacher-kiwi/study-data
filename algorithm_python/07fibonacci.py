from time import time

n = int(input())

# memo = {1: 1, 2: 1}

# def fibonacci(n):
#   if n in memo:
#     return memo[n]
  
#   memo[n] = fibonacci(n-1) + fibonacci(n-2)

#   return memo[n]

def fibonacci(n):
  fib = [1, 1]

  for i in range(2, n):
    fib.append(fib[i-1] + fib[i-2])
  
  return fib[n-1]


start = time()
print(fibonacci(n))
end = time()
print(f"{end-start:.5f} sec")