const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const unitInput = document.getElementById("unit");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

function round(value) {
  return Number(value.toFixed(2));
}

function resetMessages() {
  errorMessage.textContent = "";
  successMessage.textContent = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  resetMessages();

  const rawValue = temperatureInput.value.trim();
  const value = Number(rawValue);
  const unit = unitInput.value;

  if (rawValue === "" || !Number.isFinite(value)) {
    errorMessage.textContent = "Please enter a valid numeric temperature.";
    return;
  }

  // Absolute zero validation:
  // Celsius: -273.15 °C
  // Fahrenheit: -459.67 °F
  // Kelvin: 0 K
  if (unit === "celsius" && value < -273.15) {
    errorMessage.textContent = "Celsius cannot be below -273.15 °C.";
    return;
  }

  if (unit === "fahrenheit" && value < -459.67) {
    errorMessage.textContent = "Fahrenheit cannot be below -459.67 °F.";
    return;
  }

  if (unit === "kelvin" && value < 0) {
    errorMessage.textContent = "Kelvin cannot be below 0 K.";
    return;
  }

  let celsius;
  let fahrenheit;
  let kelvin;

  if (unit === "celsius") {
    celsius = value;
    fahrenheit = (value * 9) / 5 + 32;
    kelvin = value + 273.15;
  } else if (unit === "fahrenheit") {
    celsius = ((value - 32) * 5) / 9;
    fahrenheit = value;
    kelvin = celsius + 273.15;
  } else {
    kelvin = value;
    celsius = value - 273.15;
    fahrenheit = (celsius * 9) / 5 + 32;
  }

  celsiusResult.textContent = `${round(celsius)} °C`;
  fahrenheitResult.textContent = `${round(fahrenheit)} °F`;
  kelvinResult.textContent = `${round(kelvin)} K`;

  successMessage.textContent = "Conversion completed successfully.";
});
