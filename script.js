// variables
const myLibrary = []
const addBookButton = document.querySelector('button.add-book')
const modal = document.querySelector('.modal')
const isReadCheckbox = document.querySelector('#isRead')
const pagesReadInput = document.querySelector('#pages-read')
const pagesReadLabel = document.querySelector('label[for=pages-read]')
const numberOfPagesInput = document.querySelector('#pages')
const submitButton = document.querySelector('.submit-section button')
const pagesWarning = document.createElement('div')

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

function createPagesWarning() {
    if (+pagesReadInput.value > +numberOfPagesInput.value) {
        pagesWarning.innerText = 'Pages Read cannot be greater than Number of Pages'
        pagesReadInput.insertAdjacentElement('afterend', pagesWarning)
        pagesWarning.style.textAlign = 'center'
        pagesWarning.style.color = 'red'
    } else if (pagesReadInput.value <= numberOfPagesInput.value) {
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
    if (pagesReadInput.value > numberOfPagesInput.value) {
        e.preventDefault()
    }
})