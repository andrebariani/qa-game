function emailValidation(input) {
  let mail = input.value;
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(mail)) {
    input.setCustomValidity("");
    return true;
  } else {
    input.setCustomValidity("Invalid email");
    return false;
  }
}

module.exports = {
  emailValidation
};