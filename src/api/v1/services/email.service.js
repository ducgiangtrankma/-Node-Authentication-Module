import express from "express";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import { UserModel } from "../models/user.model";
import createHttpError from "http-errors";
import { transError, transValidation } from "../lang/vi";

const myOAuth2Client = new OAuth2Client(
  process.env.GOOGLE_MAILER_CLIENT_ID,
  process.env.GOOGLE_MAILER_CLIENT_SECRET
);
myOAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});

const sendEmail = async (email, subject, htmlContent, user) => {
  try {
    if (!email || !subject || !htmlContent)
      throw createHttpError(500, "Please provide email, subject and content!");
    /**
     * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
     * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
     */
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject?.token;
    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.ADMIN_EMAIL_ADDRESS,
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });
    // mailOption là những thông tin gửi từ phía client lên thông qua API

    const mailOptions = {
      to: email, // Gửi đến ai?
      subject: subject, // Tiêu đề email
      html: htmlContent, // Nội dung email
    };
    // Gọi hành động gửi email
    const isSend = await transport.sendMail(mailOptions);
    return isSend;
    // Không có lỗi gì thì trả về success
    // res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
    await UserModel.deleteOne({
      _id: user._id,
    });
    throw createHttpError(500, transError.email_does_not_exist);
  }
};
export const emailService = {
  sendEmail,
};
