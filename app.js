// book contructor
function Book(title, author, isbn) {
    this.title = title,
    this.author = author,
    this.isbn = isbn
}

// UI constructor
function UI() {}

// add book to list prototype
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list')
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row)
}

// show alert
UI.prototype.showAlert = function(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))

    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')

    container.insertBefore(div, form)

    // add 3 sec time out
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000)

}

// clear detail field
UI.prototype.clearDetailField = function() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}

// delete book
UI.prototype.deleteBook = function(target) {
    const ui = new UI();
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
        ui.showAlert('Book Removed !','success')
    }
}

// Event Listner for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    // get form values
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value

    // instantiate book
    const book = new Book(title, author, isbn)
    
    // isntatiate ui
    const ui = new UI()

    // validation
    if(title === '' || author === '' || isbn === '') {
        // show alert
        ui.showAlert('Please provide data in all fields !', 'error')
    } else {
        // add book to list
        ui.addBookToList(book)
        // show success alert
        ui.showAlert('New book added successfully !', 'success')
        // clear book submit detail field
        ui.clearDetailField()
    }
    e.preventDefault()
})

// event listner for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteBook(e.target)
    e.preventDefault()
})