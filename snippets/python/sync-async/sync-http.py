import requests
from time import sleep

API_BASE_URL = 'https://api.jikan.moe/v4'

anime_ids = [
    33,
    32,
    1735
]


def get_anime_info(id: int):
    print(f'Запрашиваем информацию об аниме #{id}')

    sleep(3)
    res = requests.get(f'{API_BASE_URL}/anime/{id}').json()

    info = {
        'title': res['data']['title_english'],
        'url': res['data']['url'],
        'score': res['data']['score'],
        'rank': res['data']['rank']
    }

    print(f'Получена информацию об аниме #{id}:\n{info}\n')


def main():
    for anime_id in anime_ids:
        get_anime_info(anime_id)


if __name__ == '__main__':
    main()
