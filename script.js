let dropDownBtnYrs = document.querySelector('.dropdown-years');
let dropDownBtnMths = document.querySelector('.dropdown-months');
let contentBox = document.querySelector('.content-box');
let mthClick = document.querySelectorAll('.mth-click');
let yrClick = document.querySelectorAll('.yr-click');

let selectedMonth = '';
let selectedYear = '';

let http = new XMLHttpRequest();
http.open('get', 'db.json', true);
http.send();
http.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let output = "";

        for (let years in data) {
            output += `<div class="yr-click" onclick="showYrs('${years}')">${years}</div>`;
        }
        document.querySelector('.yr-options').innerHTML = output;
    }
}

// Changes the Dropdown box letters to the selected item.
function showYrs(heading) {
  document.querySelector('.text-years').value = heading;
  selectedYear = heading;
  populateContentBox();
}

function showMths(heading) {
  document.querySelector('.text-months').value = heading;
  selectedMonth = heading;
  populateContentBox();
}

// Toggles the Dropdown menu on and off.
dropDownBtnYrs.onclick = function () {
  dropDownBtnYrs.classList.toggle('drop');
};

dropDownBtnMths.onclick = function () {
  dropDownBtnMths.classList.toggle('drop');
};

// Populates the content box with the required info.
function populateContentBox() {
  if (selectedYear && selectedMonth) {
    let http = new XMLHttpRequest();
    http.open('GET', 'db.json', true);
    http.send();

    http.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);

        let resultData = data[selectedYear][selectedMonth];

        let content = `<h1>${resultData.title}</h1>
                        <h2>${resultData.default}</h2>
                        <p>${resultData.declaration}</p>`;

        contentBox.innerHTML = content;
      }
    };
  }
}

// Add click event listeners to each month option
for (let i = 0; i < mthClick.length; i++) {
  mthClick[i].onclick = function () {
    selectedMonth = this.textContent;
    showMths(selectedMonth);
  };
}

// Add click event listeners to each year option
for (let i = 0; i < yrClick.length; i++) {
  yrClick[i].onclick = function () {
    selectedYear = this.textContent;
    showYrs(selectedYear);
  };
}

// When page is loaded it should display the current month and year.