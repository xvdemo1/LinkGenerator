// Placeholder JSON data
const pages = [{"name":"Homepage","languages":[{"code":"en","id":"2522358"}]}];
let selectedPageName = "";
let selectedLanguageCode = "";

// Get references to the select elements and generate button
const pageSelector = document.getElementById("page-selector");
const languageSelector = document.getElementById("language-selector");
const generateBtn = document.getElementById("generate-btn");
const result = document.getElementById("result");

// Set default values
document.getElementById("personal-id").value = "Your Impact ID";

// Populate the page selector with options and select the first page
for (let i = 0; i < pages.length; i++) {
  const option = document.createElement("option");
  option.value = pages[i].name;
  option.text = pages[i].name;
  pageSelector.appendChild(option);
}
pageSelector.selectedIndex = 0;

// Update the language selector options and generate the URL on page load
updateLanguageSelectorAndGenerateUrl();

// Update the language selector options when the page selector changes
pageSelector.addEventListener("change", function() {
  updateLanguageSelectorAndGenerateUrl();
});

// Function to check if a value is numerical
function isNumerical(value) {
  return /^\d+$/.test(value);
}

// Modified function to update the language selector options and generate the URL
function updateLanguageSelectorAndGenerateUrl() {
  // Clear the language selector options
  languageSelector.innerHTML = "";

  // Find the selected page
  selectedPageName = pageSelector.value;
  const selectedPage = pages.find(function(page) {
    return page.name === selectedPageName;
  });

  // Populate the language selector with options
  for (let i = 0; i < selectedPage.languages.length; i++) {
    const option = document.createElement("option");
    option.value = selectedPage.languages[i].id;
    option.text = selectedPage.languages[i].code;
    languageSelector.appendChild(option);
  }

  // Set default language and generate URL
  languageSelector.selectedIndex = 0;
  generateBtn.click();
}

// Update selectedLanguageCode when the language selector changes
languageSelector.addEventListener("change", function() {
  selectedLanguageCode = languageSelector.value;
});

generateBtn.addEventListener("click", function() {
  // Get the personal ID value and check if it's a numerical value
  const personalId = document.getElementById("personal-id").value;
  if (!isNumerical(personalId)) {
    alert("Error: Impact ID must be a numerical value.");
    return; // Stop URL generation if the personal ID is not valid
  }

  const selectedLanguage = languageSelector.options[languageSelector.selectedIndex];
  const pageId = selectedLanguage.value;
  const label4 = document.getElementById("label4").value;

  let url = `${selectedPageName} (${selectedLanguage.text}): https://go.intego.com/c/${personalId}/${pageId}/54151`;

  if (label4 !== "") {
    url += `?sharedid=${encodeURIComponent(label4)}`;
  }

  result.innerText = url;
});

function copyToClipboard() {
  const resultText = result.innerText;
  const urlStartIndex = resultText.indexOf("https://");
  if (urlStartIndex >= 0) {
    const url = resultText.substring(urlStartIndex);
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("URL copied to clipboard: " + url);
  }
}
