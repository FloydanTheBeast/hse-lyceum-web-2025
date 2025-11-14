from dotenv import dotenv_values

config = dotenv_values(".env")

DB_URL = config['DB_URL']
DEBUG = int(config['DEBUG'])