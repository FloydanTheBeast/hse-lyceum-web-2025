from typing import Optional, Any, Union, List, Tuple, Dict, NoReturn, Iterable

number: int = 5
string: str = 'какая-то строка'

type_error: int = 'вот так нельзя'


def sum(n1: int, n2: int) -> int:
    return n1 + n2


class Book:
    title: str
    author: str

    def __init__(self, title: str, author: str) -> None:
        self.title = title
        self.author = author


book: Book = Book(title='Идиот', author='Достоевский')


non_optional_number: int
non_optional_number = None

optional_number: Optional[int]
optional_number = None


anything: Any
anything = 'a string'
anything = 5
anything = {'key': 'value'}

int_or_float: Union[int, float]
int_or_float = 5
int_or_float = 5.5

int_or_float2: int | float
int_or_float2 = 5
int_or_float2 = 5.5

list_of_strings: List[str | int] = ['Привет', 'аннотации', 42]
list_of_strings = [1.1]

tuple_of_nums: Tuple[int, ...] = (1, 1, 2, 3, 5)
tuple_of_nums = (1, "строка")

not_a_book = 'точно не книга'
books_dict: Dict[str, Book] = {
    '978-5-7320-1162-3': book,
    '978-5-7320-1162-1': not_a_book
}


def infinite_fn() -> NoReturn:
    while True:
        print('Бесконечная функция')


def generate_fibonacci() -> Iterable[int]:
    yield 1
    yield 1
    yield 2
    yield 3
    yield 5
    yield '8'
