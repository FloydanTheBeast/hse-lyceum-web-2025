from typing import TypeVar, Generic, List, TypeAlias, NewType, cast

# Атрибут дженерика
T = TypeVar('T', int, float, default=float)


class Queue(Generic[T]):
    _list: List[T]

    def __init__(self) -> None:
        self._list = []

    def append(self, item: T) -> None:
        self._list.append(item)

    def pop(self) -> T:
        return self._list.pop()


print(Queue.__annotations__)

q = Queue[int]()

q.append(5)
q.append(5.5)
q.append('test')

# Тип-псевдоним
StrListAlias: TypeAlias = List[str]

Indentifier: TypeAlias = str

str_list: StrListAlias = ['строка', 1]

# Новый тип

Salary = NewType('Salary', int)

salary: Salary = 1000
salary_casted: Salary = Salary(1000)
salary_casted: Salary = cast(Salary, 1000)
