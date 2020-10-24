let button = document.getElementById("button");

let length = $("#length");

let uppercaseClicked = false;
let lowercaseClicked = false;
let numberClicked = false;
let specialClicked = false;
let encryptedClicked = false;

let uppercaseChar = "QWERTYUIOPASDFGHJKLZXCVBNM";
let lowercaseChar = "qwertyuiopasdfghjklzxcvbnm";
let numberChar = "1234567890";
let specialChar = "[]-=,./';!@%#^$&*()";

$("#uppercase").click(function () {
  if (uppercaseClicked === false) {
    uppercaseClicked = true;
  } else if (uppercaseClicked === true) {
    uppercaseClicked = false;
  }
});

$("#lowercase").click(function () {
  if (lowercaseClicked === false) {
    lowercaseClicked = true;
  } else if (lowercaseClicked === true) {
    lowercaseClicked = false;
  }
});

$("#numbers").click(function () {
  if (numberClicked === false) {
    numberClicked = true;
  } else if (numberClicked === true) {
    numberClicked = false;
  }
});

$("#special").click(function () {
  if (specialClicked === false) {
    specialClicked = true;
  } else if (specialClicked === true) {
    specialClicked = false;
  }
});

$("#encrypted").click(function () {
  if (encryptedClicked === false) {
    let confirmed = confirm(
      "SHA-256 encryption will generate a password based on the length you specify, then convert that to a 64-character hash. Do you want to continue?"
    );
    if (confirmed) {
      encryptedClicked = true;
    } else {
      encryptedClicked = false;
      $("#encrypted").prop("checked", false);
    }
  } else if (encryptedClicked === true) {
    encryptedClicked = false;
  }
});

$("#generate").click(function () {
  if (
    length.val() < 5 ||
    length.val() > 999 ||
    (!uppercaseClicked &&
      !lowercaseClicked &&
      !numberClicked &&
      !specialClicked)
  ) {
    alert(
      "Password length must be between 5 and 999 characters. Must have at least one character type selected."
    );
  } else {
    let passwordArr = [];
    let joinedArr = passwordArr.join("");
    let shuffledArr = [];
    let finalPass;
    let randomIndex;
    let shuffledIndex;

    for (let i = 0; passwordArr.length < length.val(); i++) {
      if (lowercaseClicked) {
        randomIndex = Math.floor(Math.random() * lowercaseChar.length);
        passwordArr.push(lowercaseChar[randomIndex]);
      }
      if (uppercaseClicked) {
        randomIndex = Math.floor(Math.random() * uppercaseChar.length);
        passwordArr.push(uppercaseChar[randomIndex]);
      }
      if (numberClicked) {
        randomIndex = Math.floor(Math.random() * numberChar.length);
        passwordArr.push(numberChar[randomIndex]);
      }
      if (specialClicked) {
        randomIndex = Math.floor(Math.random() * specialChar.length);
        passwordArr.push(specialChar[randomIndex]);
      }

      shuffledArr = passwordArr.sort(() => Math.random() - 0.5);
    }
    finalPass = shuffledArr.join("");

    $(".copy").removeClass("hidden");
    $("textarea").removeClass("hidden");

    if (encryptedClicked) {
      $("#textarea").text(`${sha256(finalPass)}`);
    } else {
      $("#textarea").text(`${finalPass}`);
    }
  }
});

$(".copy").click(function () {
  $("#textarea").select();
  document.execCommand("copy");
});
