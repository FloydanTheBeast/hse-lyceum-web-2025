import sys
import asyncio
import aiohttp

from arg_parser import arg_parser

from monitoring import monitor_website
from csv_writter import CSVWritter


async def main():
    args = arg_parser.parse_args(sys.argv[1:])

    in_filepath, out_filepath, delay = args.filepath, args.out, args.delay

    urls: list[str] = []

    try:
        with open(in_filepath, 'r', encoding='utf-8') as f:
            urls = f.read().split('\n')

            if not urls:
                exit('Файл с адресами пуст')

            print(f'Адресы для мониторинга: {urls}')
    except FileNotFoundError:
        print('Файл не найден')
        exit(1)

    i = 1

    csv_writter = CSVWritter(out_filepath, ['Url', 'Статус', 'Время', 'Заголовок'])

    async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(3)) as session:
        while True:

            try:
                print(f'Мониторинг #{i}')

                tasks = [monitor_website(session, url) for url in urls]

                results = await asyncio.gather(*tasks)

                print('Запись в файл')
                csv_writter.write_lines([r.to_csv_row() for r in results])

                print('Задержка перед следующим запросом...\n')
                await asyncio.sleep(delay)

                i += 1
            except (aiohttp.InvalidUrlClientError) as e:
                print(f'Некорректный url - {e.url}')
                exit(1)


if __name__ == '__main__':
    asyncio.run(main())
