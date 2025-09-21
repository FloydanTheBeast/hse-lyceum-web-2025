import time


def fun1(x):
    print(f'fun1: {x**2}')
    time.sleep(3)
    print('fun1 завершена\n')


def fun2(x):
    print(f'fun2: {x**0.5}')
    time.sleep(3)
    print('fun2 завершена\n')


def main():
    fun1(4)
    fun2(4)


print(time.strftime('%X'))

main()

print(time.strftime('%X'))
