import asyncio
import time


async def fun1(x):
    print(f'fun1: {x**2}')
    await asyncio.sleep(3)
    print('fun1 завершена')


async def fun2(x):
    print(f'fun2: {x**0.5}')
    await asyncio.sleep(3)
    print('fun2 завершена')


async def fun3(x):
    print(f'fun2: {x**0.5}')
    time.sleep(5)
    print('fun2 завершена')


async def main():
    task1 = asyncio.create_task(fun1(4))
    task2 = asyncio.create_task(fun2(4))

    print(f'Before sleep: {time.strftime('%X')}')
    await fun3(4)
    print(f'After sleep: {time.strftime('%X')}')

    await task1
    await task2


print(time.strftime('%X'))

asyncio.run(main())

print(time.strftime('%X'))
