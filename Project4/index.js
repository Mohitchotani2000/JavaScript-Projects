function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

let addedParamCount = 0;

//Hide parameter box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

//if the user clicks on param box, hide json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

//if user clicks on json box, hide params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

//if user clicks on + button then add parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = ` <div class="ui grid">
  <div class="four wide column">
    <div class="field">
      <label><h3>Parameter ${addedParamCount + 2}</h3></label>
    </div>
  </div>
  <div class="twelve wide column">
    <div class="inline fields">
      <div class="field">
        <input
          type="text"
          placeholder="Enter Parameter ${addedParamCount + 2} Key"
          id="parameterKey${addedParamCount + 2}"
        />
      </div>
      <div class="field">
        <input
          type="text"
          placeholder="Enter Parameter ${addedParamCount + 2} Value"
          id="parameterValue${addedParamCount + 2}"
        />
      </div>
      <div class="field">
        <button type="button" class="ui primary button deleteParam"> - </button>
      </div>
    </div>
  </div>
</div>`;
  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.parentElement.remove();
    });
  }
  addedParamCount++;
});

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  document.getElementById("responseJsonText").innerHTML =
    "Please wait....Fetching results....";
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  if (contentType == "params") {
    data = {};
    for (i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }
  console.log(url);
  console.log(requestType);
  console.log(contentType);
  console.log(data);

  if (requestType == "GET") {
    try {
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.text())
        .then((text) => {
          document.getElementById("responseJsonText").innerHTML = text;
          Prism.highlightAll();
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      fetch(url, {
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.text())
        .then((text) => {
          document.getElementById("responseJsonText").innerHTML = text;
          Prism.highlightAll();
        });
    } catch (error) {
      console.log(error);
    }
  }
});
