const $ = (q) => document.querySelectorAll(q);

const valueSpan = $("#range-value")[0];
const rangeInput = $("input[type='range']")[0];
const passwordField = $("div.password-text")[0];

const passwordParams = {};
const lcChars = "qwertyuiopasdfghjklzxcvbnm";
const ucChars = lcChars.toUpperCase();
const numChars = "1234567890";
const specialChars = "<>/|-+=#@!^%&*()[].,;:";

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

window.onload = () => {
  console.log("ready...");

  $("button.copy-password")[0].onclick = () => {
    navigator.clipboard.writeText(passwordField.innerHTML);
    alert("Copied text " + passwordField.innerHTML);
  };

  passwordParams.passwordLength = rangeInput.value;
  valueSpan.innerHTML = "0" + passwordParams.passwordLength;
  rangeInput.oninput = (evt) => {
    passwordParams.passwordLength = evt.target.value;
    valueSpan.innerHTML =
      passwordParams.passwordLength < 10
        ? "0" + passwordParams.passwordLength
        : passwordParams.passwordLength;
  };

  rangeInput.onchange = () => {
    updatePassword();
  };

  const checkboxes = $("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    const key = checkbox.id.split("-")[0];
    passwordParams[key] = checkbox.checked;
    checkbox.onchange = (evt) => handleCheckboxChange(evt, key);
  });
  updatePassword();
};

const handleCheckboxChange = (evt, key) => {
  passwordParams[key] = evt.target.checked;
  updatePassword();
};

const updatePassword = () => {
  passwordField.innerHTML = generatePassword();
};

const generatePassword = () => {
  let characterSet = "";
  if (passwordParams.lowercase) {
    characterSet += lcChars;
  }
  if (passwordParams.uppercase) {
    characterSet += ucChars;
  }
  if (passwordParams.numeric) {
    characterSet += numChars;
  }
  if (passwordParams.special) {
    characterSet += specialChars;
  }
  let password = [];
  while (password.length < passwordParams.passwordLength) {
    const randomLocation = generateRandomNumber(0, password.length);
    const randomChar =
      characterSet[generateRandomNumber(0, characterSet.length)];

    password.splice(randomLocation, 0, randomChar);
  }

  return password.join("");
};
