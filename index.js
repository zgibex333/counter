function createCounter() {
  let counter = Number(arguments[0]) || 0;
  let minValue = arguments[1] || null;
  let maxValue = arguments[2] || null;

  if (
    checkForEulerNumber(counter) ||
    checkForEulerNumber(maxValue) ||
    checkForEulerNumber(minValue)
  ) {
    alert("Inputs accept only numbers without `e` ");
    return;
  }

  if (minValue !== null && minValue > counter) {
    alert("Initial value can't be lower than min value");
    return;
  }

  if (maxValue !== null && maxValue < counter) {
    alert("Initial value can't be bigger than max value");
    return;
  }

  minValue = Number.parseInt(arguments[1]);
  maxValue = Number.parseInt(arguments[2]);

  const parentEl = document.getElementById("parentEl");
  const counterNode = document.createElement("div");
  const buttonIncrement = document.createElement("button");
  const buttonDecrement = document.createElement("button");
  const counterTextNode = document.createElement("span");

  if (minValue === counter) buttonDecrement.disabled = true;
  if (maxValue === counter) buttonIncrement.disabled = true;

  buttonIncrement.append("+");
  buttonDecrement.append("-");
  counterNode.appendChild(buttonDecrement);
  counterNode.appendChild(buttonIncrement);
  counterTextNode.innerText = "counter: " + counter;
  counterNode.appendChild(counterTextNode);
  parentEl.appendChild(counterNode);

  buttonIncrement.addEventListener("click", function () {
    if (maxValue !== null && Number(minValue) === Number(counter)) {
      buttonDecrement.disabled = false;
    }
    if (maxValue !== null && maxValue <= Number(counter) + 1) {
      buttonIncrement.disabled = true;
    }
    counter++;
    counterTextNode.innerText = "counter: " + counter;
  });

  buttonDecrement.addEventListener("click", function () {
    if (minValue !== null && Number(maxValue) === Number(counter)) {
      buttonIncrement.disabled = false;
    }
    if (minValue !== null && minValue >= Number(counter) - 1) {
      buttonDecrement.disabled = true;
    }
    counter--;
    counterTextNode.innerText = "counter: " + counter;
  });

  function checkForEulerNumber(value) {
    return String(value).toString().toLowerCase().includes("e");
  }

  return {
    counter,
    increment: function () {
      if (counter >= maxValue) {
        return;
      }
      if (maxValue !== null && counter + 1 >= maxValue) {
        buttonIncrement.disabled = true;
        counter++;
        counterTextNode.innerText = "counter: " + counter;
        return;
      }
      counter++;
      counterTextNode.innerText = "counter: " + counter;
    },
    decrement: function () {
      if (counter <= minValue) return;
      if (minValue !== null && counter - 1 <= minValue) {
        buttonDecrement.disabled = true;
        counter--;
        counterTextNode.innerText = "counter: " + counter;
        return;
      }
      counter--;
      counterTextNode.innerText = "counter: " + counter;
    },
  };
}

const initialSettings = () => {
  const parentEl = document.getElementById("parentEl");
  const button = document.createElement("button");
  const initialValueInput = document.createElement("input");
  const settingsNode = document.createElement("div");
  const maxValueInput = document.createElement("input");
  const minValueInput = document.createElement("input");

  settingsNode.appendChild(maxValueInput);
  settingsNode.appendChild(minValueInput);
  button.append("Create Counter");

  initialValueInput.type = "number";
  maxValueInput.type = "number";
  minValueInput.type = "number";

  initialValueInput.placeholder = "Initial value (optional)";
  maxValueInput.placeholder = "Max value (optional)";
  minValueInput.placeholder = "Min value (optional)";

  parentEl.appendChild(initialValueInput);
  parentEl.appendChild(button);
  parentEl.appendChild(settingsNode);

  button.addEventListener("click", () => {
    createCounter(
      initialValueInput.value,
      minValueInput.value,
      maxValueInput.value
    );
    initialValueInput.value = "";
    maxValueInput.value = "";
    minValueInput.value = "";
  });
};

initialSettings();

let counter = createCounter(1, 0, 1);
