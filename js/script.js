const $ = (q, multipleElements = true) =>
  multipleElements ? document.querySelectorAll(q) : document.querySelector(q);

const valueSpan = $("#range-value")[0];
const rangeInput = $("input[type='range']")[0];
const passwordField = $("input.password-text")[0];

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
    let copyText = $("input.password-text")[0];

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(passwordField.value);
    alert("Password copied to clipboard!");
  };

  $("button.refresh-password")[0].onclick = () => {
    updatePassword();
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
  visualizeFeedback();
  passwordParams[key] = evt.target.checked;
  updatePassword();
};

const visualizeFeedback = () => {
  const characterGroupControlsDiv = $("div.character-group-controls", false);
  const feedbackDiv = $("div.feedback", false);
  if ($("div.character-group-controls input:checked").length > 0) {
    feedbackDiv.classList.remove("show");
    characterGroupControlsDiv.style.borderColor = "var(--light-grey)";
  } else {
    feedbackDiv.classList.add("show");
    characterGroupControlsDiv.style.borderColor = "var(--red)";
  }
};

const updatePassword = () => {
  passwordField.value = generatePassword();
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
