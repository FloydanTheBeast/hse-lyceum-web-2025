import pytest
from fastapi.testclient import TestClient
from main import Base, app, engine

client = TestClient(app)

# Фикстуры


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield


# Утилиты


def register_user(username="test", password="test"):
    return client.post("/register", json={"username": username, "password": password})


def login_user(username="test", password="test"):
    return client.post("/login", data={"username": username, "password": password})


def get_auth_headers():
    register_user()
    response = login_user()
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


# Unit-тесты


def test_register():
    response = register_user()
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login():
    register_user()
    response = login_user()

    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login_wrong_password():
    # TODO
    pass


# Интеграционные тесты


def test_create_todo():
    headers = get_auth_headers()

    response = client.post("/todos", json={"title": "test todo"}, headers=headers)

    assert response.status_code == 200
    assert response.json()["title"] == "test todo"


def test_get_todos():
    headers = get_auth_headers()

    client.post("/todos", json={"title": "test"}, headers=headers)

    response = client.get("/todos", headers=headers)

    assert response.status_code == 200
    assert len(response.json()) == 1


def test_update_todo():
    # TODO
    pass


def test_delete_todo():
    # TODO
    pass
