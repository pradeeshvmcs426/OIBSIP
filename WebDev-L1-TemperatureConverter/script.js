const form = document.getElementById("converterForm");

const temperatureInput =
  document.getElementById("temperature");

const unitInput =
  document.getElementById("unit");

const celsiusResult =
  document.getElementById("celsiusResult");

const fahrenheitResult =
  document.getElementById("fahrenheitResult");

const kelvinResult =
  document.getElementById("kelvinResult");

const errorMessage =
  document.getElementById("errorMessage");

const successMessage =
  document.getElementById("successMessage");

const quickButtons =
  document.querySelectorAll(".quick-btn");


/* ================= HELPER ================= */

function round(value) {

  return Number(
    value.toFixed(2)
  );

}


/* ================= RESET ================= */

function resetMessages() {

  errorMessage.textContent = "";

  successMessage.textContent = "";

}


/* ================= CONVERSION ================= */

function convertTemperature() {

  resetMessages();


  const rawValue =
    temperatureInput.value.trim();

  const value =
    Number(rawValue);

  const unit =
    unitInput.value;


  /* Empty / invalid input */

  if (
    rawValue === "" ||
    !Number.isFinite(value)
  ) {

    errorMessage.textContent =
      "Please enter a valid numeric temperature.";

    return;

  }


  /* Absolute zero validation */

  if (
    unit === "celsius" &&
    value < -273.15
  ) {

    errorMessage.textContent =
      "Celsius cannot be below -273.15 °C.";

    return;

  }


  if (
    unit === "fahrenheit" &&
    value < -459.67
  ) {

    errorMessage.textContent =
      "Fahrenheit cannot be below -459.67 °F.";

    return;

  }


  if (
    unit === "kelvin" &&
    value < 0
  ) {

    errorMessage.textContent =
      "Kelvin cannot be below 0 K.";

    return;

  }


  let celsius;
  let fahrenheit;
  let kelvin;


  /* Celsius */

  if (unit === "celsius") {

    celsius = value;

    fahrenheit =
      (value * 9 / 5) + 32;

    kelvin =
      value + 273.15;

  }


  /* Fahrenheit */

  else if (unit === "fahrenheit") {

    fahrenheit = value;

    celsius =
      (value - 32) * 5 / 9;

    kelvin =
      celsius + 273.15;

  }


  /* Kelvin */

  else {

    kelvin = value;

    celsius =
      value - 273.15;

    fahrenheit =
      (celsius * 9 / 5) + 32;

  }


  /* Display results */

  celsiusResult.textContent =
    `${round(celsius)} °C`;

  fahrenheitResult.textContent =
    `${round(fahrenheit)} °F`;

  kelvinResult.textContent =
    `${round(kelvin)} K`;


  successMessage.textContent =
    "✓ Conversion completed successfully.";

}


/* ================= FORM SUBMIT ================= */

form.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    convertTemperature();

  }
);


/* ================= QUICK BUTTONS ================= */

quickButtons.forEach(
  function(button) {

    button.addEventListener(
      "click",
      function() {

        const value =
          button.dataset.value;

        temperatureInput.value =
          value;

        unitInput.value =
          "celsius";

        convertTemperature();

      }
    );

  }
);


/* ================= ENTER KEY ================= */

temperatureInput.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      event.preventDefault();

      convertTemperature();

    }

  }
);