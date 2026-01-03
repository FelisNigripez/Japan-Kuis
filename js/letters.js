function populateLetters() {
lettersContainer.innerHTML = "";
const data = mode === "hiragana" ? hiragana : katakana;


Object.keys(data).forEach(char => {
const label = document.createElement("label");
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.value = char;
checkbox.checked = true;

const romaji = data[char];
label.appendChild(checkbox);
label.appendChild(document.createTextNode(`${char} = ${romaji}`));
lettersContainer.appendChild(label);
});
}


selectAllBtn.onclick = () => {
lettersContainer.querySelectorAll("input").forEach(c => c.checked = true);
};


deselectAllBtn.onclick = () => {
lettersContainer.querySelectorAll("input").forEach(c => c.checked = false);
};


selectRandomBtn.onclick = () => {
const checkboxes = Array.from(lettersContainer.querySelectorAll("input"));
const jumlahAcak = Math.floor((Number(totalInput.value) || totalQuestions) / 2);


if (jumlahAcak >= checkboxes.length) {
checkboxes.forEach(c => c.checked = true);
return;
}


checkboxes.forEach(c => c.checked = false);
checkboxes.sort(() => 0.5 - Math.random()).slice(0, jumlahAcak)
.forEach(c => c.checked = true);
};