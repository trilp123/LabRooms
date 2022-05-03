const fetch = require("node-fetch");

module.exports = async (captcha) => {
  const response_key = captcha;
  const secret_key = "6LcpB7wfAAAAAJ_uwbNcP9vtAAG8FwjfZMxQoNgx";

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

  const validCaptcha = fetch(url)
    .then((res) => res.json())
    .then(({ success }) => {
      return success;
    });

  return validCaptcha;
};