from io import TextIOWrapper


class CSVWritter:
    file: TextIOWrapper

    def __init__(self, filepath: str, headers: list[str]) -> None:
        self.file = open(filepath, 'w', encoding='utf-8')

        self.file.write(','.join(headers) + '\n')
        self.file.flush()

    def __del__(self):
        self.file.close()

    def write_lines(self, lines: list[str]):
        self.write_lines(lines)
        # Записываем данные из буфера в файл и очищаем буфер
        self.file.flush()
