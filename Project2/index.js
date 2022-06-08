function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}

Display.prototype.add = function (book) {
    let info = localStorage.getItem("info");
    if (info == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(info);
    }

    let myObj ={
        bookname: book.name,
        bookauthor: book.author,
        booktype: book.type
    }
    booksObj.push(myObj);
    localStorage.setItem("info", JSON.stringify(booksObj));
    this.showBooks();
}

Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
}

Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

Display.prototype.show = function (type, dispmessage) {
    let msg = document.getElementById("message");
    msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message: </strong> ${dispmessage}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
    setTimeout(() => {
        msg.innerHTML = ""
    }, 2000);
}

Display.prototype.showBooks = function() {
    let info = localStorage.getItem("info");
    if (info == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(info);
    }
    let html = "";
    let tableBody = document.getElementById("tableBody");
    if (booksObj.length != 0) {
        booksObj.forEach(function(book,index){
            html += `<tr>
            <th scope="row">${index+1}</th>
            <td>${book.bookname}</td>
            <td>${book.bookauthor}</td>
            <td>${book.booktype}</td>
            <td><button id="${index}" onclick ="deleteBook(this.id)" class="btn btn-danger">Delete</button></td>
        </tr>`
        });
    }
    tableBody.innerHTML = html;
}


let display = new Display();
display.showBooks();
let libraryForm = document.getElementById("libraryForm");

libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let science = document.getElementById("science");

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (science.checked) {
        type = science.value;
    }

    let book = new Book(name, author, type);

    
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", " Book added successfully!! ");
    } else {
        display.show("danger", " Sorry, this book cannot be added!!");
    }
    e.preventDefault();
}

function deleteBook(index) {
    let info = localStorage.getItem("info");
    if (info == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(info);
    }
    booksObj.splice(index, 1);
    localStorage.setItem("info", JSON.stringify(booksObj));
    display.showBooks();
}
