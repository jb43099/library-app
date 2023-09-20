// variables
const myLibrary = []
const addBookButton = document.querySelector('button.add-book')
const modal = document.querySelector('.modal')
const pagesReadLabel = document.querySelector('label[for=pages-read]')
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const numberOfPagesInput = document.querySelector('#pages')
const pagesReadInput = document.querySelector('#pages-read')
const isReadCheckbox = document.querySelector('#isRead')
const submitButton = document.querySelector('.submit-section button')
const pagesWarning = document.createElement('div')

// classes , constructors
function Book(title, author, pages, pagesRead, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
    this.isRead = isRead;
}

// functions , methods
function addBookToLibrary() {
    const book = new Book(titleInput.value, authorInput.value, numberOfPagesInput.value, pagesReadInput.value, isReadCheckbox.checked)
    myLibrary.push(book);
}

function createPagesWarning() {
    if (+pagesReadInput.value > +numberOfPagesInput.value) {
        pagesWarning.innerText = 'Pages Read cannot be greater than Number of Pages'
        pagesReadInput.insertAdjacentElement('afterend', pagesWarning)
        pagesWarning.style.textAlign = 'center'
        pagesWarning.style.color = 'red'
    } else if (+pagesReadInput.value <= +numberOfPagesInput.value) {
        pagesWarning.remove()
    }
}


// event listeners , function calls
addBookButton.addEventListener('click', () => {
    modal.showModal()
})

isReadCheckbox.addEventListener('click', () => {
    if (isReadCheckbox.checked) {
        pagesReadInput.value = numberOfPagesInput.value
        pagesWarning.remove()
    } else {
        pagesReadInput.value = ''
    }
})

pagesReadInput.addEventListener('change', () => {
    if (pagesReadInput.value == numberOfPagesInput.value) {
        isReadCheckbox.checked = true
    } else {
        isReadCheckbox.checked = false
    }
})

pagesReadInput.addEventListener('change', () => {
    createPagesWarning()
})

submitButton.addEventListener('click', (e) => {
    if (+pagesReadInput.value > +numberOfPagesInput.value) {
        e.preventDefault()
    } else if (+pagesReadInput.value <= +numberOfPagesInput.value) {
        addBookToLibrary()
    }
})