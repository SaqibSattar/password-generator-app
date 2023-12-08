const elements = {
    inputSlider: document.getElementById("inputSlider"),
    sliderValue: document.getElementById("sliderValue"),
    passBox: document.getElementById("passBox"),
    lowercaseEl: document.getElementById("lowercase"),
    uppercseEl: document.getElementById("uppercase"),
    numbersEl: document.getElementById("numbers"),
    symbolsEl: document.getElementById("symbols"),
    generateBtn: document.getElementById("genBtn"),
    copyBtn: document.getElementById("copyIcon"),
    passIndicator: document.getElementById("passIndicator"),
};

const { lowercase, uppercase, numbers, symbols } = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}\\|;':\",./<>?",
};

elements.sliderValue.textContent = elements.inputSlider.value;
elements.inputSlider.addEventListener("input", updateSliderValue);

function updateSliderValue() {
    elements.sliderValue.textContent = elements.inputSlider.value;
    generatePassword();
}

function generatePassword() {
    const length = elements.inputSlider.value;

    // Check if the slider value is smaller than 5
    if (length < 5) {
        alert("Password length must be at least 5 characters.");
        return;
    }

    let characters = "";

    characters += elements.lowercaseEl.checked ? lowercase : "";
    characters += elements.uppercseEl.checked ? uppercase : "";
    characters += elements.numbersEl.checked ? numbers : "";
    characters += elements.symbolsEl.checked ? symbols : "";

    const password = Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");

    elements.passBox.value = password;
    updatePasswordIndicator();
}

elements.generateBtn.addEventListener("click", generatePassword);

function updatePasswordIndicator() {
    const passwordStrength = getPasswordStrength(elements.passBox.value);
    elements.passIndicator.className = "pass-indicator " + passwordStrength;
}

function getPasswordStrength(password) {
    return password.length <= 8 ? "weak" : password.length <= 12 ? "medium" : "strong";
}

window.addEventListener('DOMContentLoaded', updatePasswordIndicator);

elements.copyBtn.addEventListener("click", copyToClipboard);

function copyToClipboard() {
    if (elements.passBox.value !== "") {
        navigator.clipboard.writeText(elements.passBox.value);
        elements.copyBtn.innerText = "check";

        setTimeout(() => {
            elements.copyBtn.innerHTML = "content_copy";
        }, 3000);
    }
}
