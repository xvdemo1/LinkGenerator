// Placeholder JSON data
const pages = [
  {
    "name": "Homepage",
    "languages": [
      {
        "code": "en",
        "id": "1462855"
      },
      {
        "code": "de",
        "id": "1635409"
      },
      {
        "code": "fr",
        "id": "1635411"
      },
      {
        "code": "es",
        "id": "1635410"
      }
    ]
  },
  {
    "name": "Offer",
    "languages": [
      {
        "code": "en",
        "id": "1462856"
      },
      {
        "code": "it",
        "id": "1520101"
      },
      {
        "code": "ru",
        "id": "1635679"
      },
      {
        "code": "jp",
        "id": "1509355"
      }
    ]
  }
];

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

// Generate URL when generate button is clicked
generateBtn.addEventListener("click", function() {
  const personalId = document.getElementById("personal-id").value;
  const selectedLanguage = selectedPage.languages[languageSelector.selectedIndex];
  const label1 = document.getElementById("label1").value;
  const label2 = document.getElementById("label2").value;
  const label3 = document.getElementById("label3").value;
  const label4 = document.getElementById("label4").value;
  const url = `YourDomain.com/${selectedPage.name}/${selectedLanguage.code}/${personalId}/${selectedLanguage.id}/16063?label1=${encodeURIComponent(label1)}&label2=${encodeURIComponent(label2)}&label3=${encodeURIComponent(label3)}&label4=${encodeURIComponent(label4)}`;
  result.innerText = url;
});
