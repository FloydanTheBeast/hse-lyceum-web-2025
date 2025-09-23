import argparse

arg_parser = argparse.ArgumentParser(
    prog='Web Monitoring',
    description='Программа для мониторинга веб-сайтов',
)

arg_parser.add_argument('filepath', help='Путь до файла, содержащего адреса веб-сайтов')
arg_parser.add_argument('-o', '--out', help='Путь до выходного файла',
                        default='monitoring.csv', required=False)
arg_parser.add_argument('-d', '--delay', type=int, default=5,
                        help='Задержка между запросами в секундах', required=False)
