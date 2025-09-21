from package2 import config


class Server:
    def __init__(self) -> None:
        print(f'Сервер запущен на {config.get('hostname')}:{config.get('port')}')
