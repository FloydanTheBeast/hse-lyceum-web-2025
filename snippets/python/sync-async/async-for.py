import asyncio


async def async_number_generator(limit):
    for i in range(limit):
        await asyncio.sleep(1)  # Имитация асинхронной операции
        yield i


async def main_gen():
    print("Начинаем перебор асинхронного генератора:")
    async for number in async_number_generator(5):
        print(f"Получено число: {number}")

if __name__ == "__main__":
    asyncio.run(main_gen())
