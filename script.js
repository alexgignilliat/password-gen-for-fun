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

    console.log(uppercaseClicked);
  } else if (uppercaseClicked === true) {
    uppercaseClicked = false;
    console.log(uppercaseClicked);
  }
});

$("#lowercase").click(function () {
  if (lowercaseClicked === false) {
    lowercaseClicked = true;
    console.log(lowercaseClicked);
  } else if (lowercaseClicked === true) {
    lowercaseClicked = false;
    console.log(lowercaseClicked);
  }
});

$("#numbers").click(function () {
  if (numberClicked === false) {
    numberClicked = true;
    console.log(numberClicked);
  } else if (numberClicked === true) {
    numberClicked = false;
    console.log(numberClicked);
  }
});

$("#special").click(function () {
  if (specialClicked === false) {
    specialClicked = true;
    console.log(specialClicked);
  } else if (specialClicked === true) {
    specialClicked = false;
    console.log(specialClicked);
  }
});

$("#encrypted").click(function () {
  if (encryptedClicked === false) {
    console.log(encryptedClicked);
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
    console.log(encryptedClicked);
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
    console.log(length.val());

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

      console.log("randomindex", randomIndex);
      console.log(passwordArr);
      shuffledArr = passwordArr.sort(() => Math.random() - 0.5);

      // let shuffledIndex = Math.floor(Math.random() * passwordArr.length);
      // shuffledArr.push(passwordArr[randomIndex]);
      // console.log("pwarr", shuffledArr);
    }
    finalPass = shuffledArr.join("");

    $(".copy").removeClass("hidden");

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
