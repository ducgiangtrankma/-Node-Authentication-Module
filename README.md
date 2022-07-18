## Chức năng
- Đăng kí: Người dùng đăng kí tài khoản sử dụng gmail định dạng abc@gmail.com -> Hệ thông sẽ gửi link kích hoạt tài khoản về gmail. Người dùng kiểm tra email và kích hoạt tài khoản( Sau 5 phút nếu tài khoản không được kích hoạt sẽ bị xoá khỏi dữ liệu).
- Đăng nhập: Người dùng sử dụng tài khoản đã được đăng kí để đăng nhập → Nhận về AccessToken và RefrehToken.
- Kích hoạt tài khoản qua gmail
- Sử dụng cơ chế AccessToken và Refresh Token để xử lý phiên đăng nhập
## Cài đặt:
1. Cài đặt MongoDB
2. Cài đặt Redis
## Khởi chạy dự án
* Clone project
```
git clone
```
* Cấu hình file .env theo yêu cầu
```
DB_CONNECTION = "xxxx"
DB_HOST = "xxx"
DB_PORT = xxx
DB_NAME = "xxx"
APP_PORT = xxx
APP_HOST = "xxx"
ACCESS_TOKEN_KEY = "xxxx"
REFRESH_TOKEN_KEY = "xxxx"
ACCESS_TOKEN_EXPIRES = "xxx"
REFRESH_TOKEN_EXPIRES = "xxx"
GOOGLE_MAILER_CLIENT_ID = "xxxx"
GOOGLE_MAILER_CLIENT_SECRET = "xxxx"
GOOGLE_MAILER_REFRESH_TOKEN = "xxxxx"
ADMIN_EMAIL_ADDRESS = "xxxx"
EXPIRES_TIME_ACTIVE_ACCOUNT = xxx
```
* Khởi chạy service local
```
brew services start mongodb-community
brew services start redis
redis-cli config set notify-keyspace-events Ex
redis-cli psubscribe __keyevent@0__:expired
```
* Khởi chạy server
```
npm start
```
