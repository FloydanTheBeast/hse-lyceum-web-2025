import sys


def str_fn(s: str):
    print(s)


def main() -> None:
    unused_var = 5

    print("Hello from code-quality!")
    print(sys.argv)

    str_fn(1)


if __name__ == "__main__":
    main()
