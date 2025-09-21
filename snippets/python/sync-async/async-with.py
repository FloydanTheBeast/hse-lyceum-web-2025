import asyncio


# Имитация  асинхронного соединения с некой периферией
async def get_server_connection(host, port):
    class ServerConnection:
        async def put_data(self):
            print(f'Отправка данных на {host}:{port}...')
            await asyncio.sleep(2)
            print('Данные отправлены.')

        async def get_data(self):
            print(f'Получение данных с {host}:{port}...')
            await asyncio.sleep(2)
            print('Данные получены.')

        async def close(self):
            print('Завершение соединения...')
            await asyncio.sleep(2)
            print('Соединение завершено.')

    print('Устанавливаем соединение...')
    await asyncio.sleep(2)
    print('Соединение установлено.')
    return ServerConnection()


class Connection:
    # Этот конструктор будет выполнен в заголовке with
    def __init__(self, host, port):
        self.host = host
        self.port = port

    # awaitable enter
    # Этот метод будет неявно выполнен при входе в with
    async def __aenter__(self):
        self.conn = await get_server_connection(self.host, self.port)
        return self.conn

    # awaitable exit
    # Этот метод будет неявно выполнен при выходе из with
    async def __aexit__(self, exc_type, exc, tb):
        await self.conn.close()


async def main():
    async with Connection('localhost', 9001) as conn:
        send_task = asyncio.create_task(conn.put_data())
        receive_task = asyncio.create_task(conn.get_data())

        await send_task
        await receive_task


asyncio.run(main())
