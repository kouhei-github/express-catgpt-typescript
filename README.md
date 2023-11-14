# Express-MongoDB-TypeScript

Express, TypeScript, MongoDB

## <span style="color: yellow">POST</span> ユーザーの登録
```text
http://localhost:8000/api/v1/auth/register
```
ユーザー情報を保存する(サインアウト)のエンドポイント

```json
{
    "username": "test",
    "email": "test@dym.jp",
    "password": "test"
}
```

---

## <span style="color: yellow">POST</span> ログインの機能
```text
http://localhost:8000/api/v1/login
```
ログイン用のエンドポイント

```json
{
  "email": "nagamatsu-k@dym.jp",
  "password": "nagamatsu-k"
}
```

---

## <span style="color: green">GET</span> ユーザー情報の取得
```text
http://localhost:8000/api/v1/users
```
ユーザー情報の一覧を取得する用のエンドポイント

---

## <span style="color: red">DELETE</span> ユーザーの削除
```text
http://localhost:8000/api/v1/users
```
ユーザーを削除するエンドポイント(自分自身のみ)

---

## <span style="color: blue">PUT</span> ユーザー情報の更新
```text
http://localhost:8000/api/v1/users
```
ユーザーを更新するエンドポイント(自分自身のみ)

```json
{
    "username": "test2",
    "email": "test2@dym.jp",
    "password": "test2"
}
```

---

## 起動方法

.envファイルの作成
```shell
cp .env.sample .env
```

起動
```shell
docker compose up -d
```

---
