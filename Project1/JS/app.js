showNotes();
let addBtn = document.getElementById("addBtn");
let msg = document.getElementById("msg");
let success = `<div class="alert alert-success" role="alert"> Note Added Successfully !! </div>`
let danger = `<div class="alert alert-danger" role="alert"> Note Deleted Successfully !! </div>`
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById("addText");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj ={
        title: addTitle.value,
        text: addText.value
    }
    if (addText.value !== '' && addTitle.value!='') {
        notesObj.push(myObj);
        msg.innerHTML = success;
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="card noteCard my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick ="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
            </div>
        </div>`
    });
    let notesEle = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    } else {
        notesEle.innerHTML = `Nothing to show. "Add a Note" section above to add notes!! `
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    msg.innerHTML = danger;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardText.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});
