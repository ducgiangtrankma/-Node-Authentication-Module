export const transValidation = {
  email_incorrect: "Email phải có định dạng example@gmail.com",
  email_require: "Email là trường bắt buộc",
  email_empty: "Email không được để trống",
  email_in_use: "Email đã được sử dụng",
  password_incorrect:
    "Mật khẩu phải chứa ít nhất 8 kí tự, tối đa 32 kí tự, bao gồm chữ hoa, chữ thường, số, kí tự đặc biệt",
  password_require: "Mật khẩu là trường bắt buộc",
  password_empty: "Mật khẩu không được để trống",
  gender_incorrect: "Giới tính phải là: Nam, Nữ, Khác",
};

export const transError = {
  account_not_active:
    "Tài khoản đã đăng kí nhưng chưa được kích hoạt, vui lòng liên hệ 0339488855 hoặc sử dụng email khác.",
  account_active_fail: "Không thể kích hoạt tài khoản, vui lòng liên hệ admin",
  server_error: "Đã có lỗi xảy ra, vui long liên hệ admin",
  email_does_not_exist: "Email không tồn tài",
  error_input: "Bạn cần nhập đủ các trường dữ liệu",
  email_password_incorrect: "Tài khoản hoặc mật khẩu không chính xác",
};

export const transSuccess = {
  account_active_success: "Kích hoạt tài khoản thành công",
  logout_success: "Đăng xuất thành công",
};
export const transMail = {
  subject: "Ứng dụng xyz xác nhận kích hoạt tài khoản",
  template: (linkActive) => {
    return `
          <h2>Bạn nhận được email này vì đã đăng kí tài khoản trên ứng dụng xyz</h2>
          <h3>Vui lòng click vào liên kết để xác nhận kích hoạt tài khoản</h3>
          <h3><a href="${linkActive}" target="blank">${linkActive}</a></h3>
          <h4>Nếu đây là sự nhầm lẫn vui lòng bỏ qua</h4>
          `;
  },
  send_failed: "Có lỗi xảy ra trong quá trình gửi email",
};
