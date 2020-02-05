let finished = false;
let colorChosen = [];
let history = [];
const historyEl = document.querySelector(".history");
const currentSelectionEl = document.querySelector(".current-selection");
const colors = ["orange", "blue", "yellow"];
let guesses = 0;
const final = randomFinal();

function randomFinal() {
  const newFinal = [...new Array(3)].map(f => {
    const random = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[random];
  });
  return newFinal;
}

function selectColor(color) {
  colorChosen.push(color);

  const current = document.createElement("div");
  current.classList.add("item");
  current.classList.add(color);

  currentSelectionEl.appendChild(current);

  if (colorChosen.length === 3) {
    history.push(colorChosen);
    currentSelectionEl.innerHTML = "";

    // dom work
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    for (const chosen of colorChosen) {
      const el = document.createElement("div");
      el.classList.add("item");
      el.classList.add(chosen);
      historyItem.appendChild(el);
    }
    historyItem.appendChild(document.createElement("hr"));

    //grab hints
    const hints = calculateHints(colorChosen);

    // dom work
    for (const hint of hints) {
      const el = document.createElement("div");
      el.classList.add("item");
      if (hint === "full") {
        el.classList.add("full");
      } else {
        el.classList.add("half");
      }
      historyItem.appendChild(el);
    }
    historyEl.appendChild(historyItem);
    guesses++;

    colorChosen.length = 0;
    if (hints.length === final.length && hints.every(hint => hint === "full")) {
      window.alert("You did it nice!");
    } else if (guesses > 5) {
      window.alert("Not great!");
    }
  }
}

function calculateHints(colors) {
  const hints = [];
  const dublicateCheck = [];

  colors.forEach((color, index) => {
    if (final[index] === color) {
      hints.push("full");
      dublicateCheck.push(color);
    }
  });

  colors.forEach((color, index) => {
    if (!dublicateCheck.includes(color) && final.includes(color)) {
      hints.push("half");
    }
  });

  return hints;
}

const buttons = document.querySelectorAll(".item");
for (let button of buttons) {
  const color = button.classList[1];
  button.addEventListener("click", () => selectColor(color));
}
