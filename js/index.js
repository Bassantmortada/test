var nameInput = document.getElementById("site-name");
var urlInput = document.getElementById("site-url");

var btnSubmit = document.getElementById("btnsubmit");
var btnUpdate = document.getElementById("btnupdate");

var boxAlert = document.getElementById("boxAlert");
index = 0;

inputsList = [];
if (localStorage.getItem("containerInputs") !== null) {
  inputsList = JSON.parse(localStorage.getItem("containerInputs"));
  displayData();
}

function addInputs() {
  if (validationName() && validationUrl()) {
    var inputs = {
      name: nameInput.value,
      url: urlInput.value,
    };
    inputsList.push(inputs);
    localStorage.setItem("containerInputs", JSON.stringify(inputsList));
    displayData();
    console.log(inputsList);
    clearForm();
  } else {
    boxAlert.classList.remove("d-none");
  }
}

function clearForm() {
  nameInput.value = null;
  urlInput.value = null;
}

function displayData() {
  cartona = "";
  for (var i = 0; i < inputsList.length; i++) {
    cartona += `
    <tr>
    <td>${i}</td>
    <td>${inputsList[i].name}</td>
    <td>
      <button onclick="visitItem('${inputsList[i].url}')" class="btn btn-visit">
        <i class="fa-regular fa-eye"></i> Visit
      </button>
    </td>
    <td>
      <button onclick="deleteItem(${i})" class="btn btn-red">
        <i class="fa-solid fa-trash"></i> Delete
      </button>
    </td>
    <td>
      <button onclick = "updateItem(${i})" class="btn btn-red">
      <i class="fa-solid fa-pen-fancy"></i> Update
      </button>
    </td>
  </tr>
    `;
  }
  document.getElementById("table-body").innerHTML = cartona;
}

function deleteItem(indexItem) {
  inputsList.splice(indexItem, 1);
  localStorage.setItem("containerInputs", JSON.stringify(inputsList));
  displayData();
  console.log(inputsList);
}

function updateItem(indexUpdate) {
  nameInput.value = inputsList[indexUpdate].name;
  urlInput.value = inputsList[indexUpdate].url;
  btnSubmit.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
  index = indexUpdate;
}

function updateData() {
  var inputs = {
    name: nameInput.value,
    url: urlInput.value,
  };
  inputsList.splice(index, 1, inputs);
  displayData();
  clearForm();
}

function visitItem(url) {
  window.location = url;
}

function validationName() {
  var text = nameInput.value;
  var regex = /^[A-Z]+((\s)?([A-Za-z])+)*$/;
  if (regex.test(text) == true) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    // boxAlert.classList.add("d-none");
    return true;
  } else {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    // boxAlert.classList.remove("d-none");
    return false;
  }
}

function validationUrl() {
  var text = urlInput.value;
  var regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  if (regex.test(text) == true) {
    urlInput.classList.add("is-valid");
    urlInput.classList.remove("is-invalid");
    // boxAlert.classList.add("d-none");
    return true;
  } else {
    urlInput.classList.add("is-invalid");
    urlInput.classList.remove("is-valid");
    // boxAlert.classList.remove("d-none");
    return false;
  }
}

function exit() {
  boxAlert.classList.add("d-none");
}
