// variables
const myLibrary = []
const addBookButton = document.querySelector('button.add-book')
const modal = document.querySelector('.modal')
const isReadButton = document.querySelector('#isRead')
const pagesReadInput = document.querySelector('#pages-read')
const pagesReadLabel = document.querySelector('label[for=pages-read]')

// classes , constructors
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// functions , methods
Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
}

function showAddBookModal() {

}

// event listeners , function calls
addBookButton.addEventListener('click', () => {
    modal.showModal()
})

isReadButton.addEventListener('click', () => {
    if (isReadButton.checked) {
        pagesReadInput.style.display = 'none'
        pagesReadLabel.style.display = 'none'
    } else {
        pagesReadInput.style.display = 'block'
        pagesReadLabel.style.display = 'block'
    }
})

