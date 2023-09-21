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
const card = document.querySelector('.card')
const cardRows = document.querySelectorAll('card-row')
const cardContainer = document.querySelector('.book-cards')

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
    myLibrary.push(book)
    return book
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

function createBookCard(book) {
    // create card
    const card = document.createElement('div')
    card.classList.add('card')
    cardContainer.appendChild(card)
    // title
    const row1 = document.createElement('div')
    row1.classList.add('card-row')
    row1.innerText = book.title
    card.appendChild(row1)
    // author
    const row2 = document.createElement('div')
    row2.classList.add('card-row')
    row2.innerText = book.author
    card.appendChild(row2)
    // pages
    const row3 = document.createElement('div')
    row3.classList.add('card-row')
    row3.innerText = `${book.pages} pages`
    card.appendChild(row3)
    // pages read
    // const row4 = document.createElement('div')
    // row4.classList.add('card-row')
    // row4.classList.add('pages-read')
    // row4.innerText = `${book.pagesRead} pages read`
    // if (book.pagesRead == '') row4.innerText = '0 pages read'
    // card.appendChild(row4)
    // isRead
    const row5 = document.createElement('button')
    row5.classList.add('card-row')
    row5.classList.add('is-read')
    if (book.isRead == true) {
        row5.classList.add('read')
        row5.innerText = 'Finished'
    } else if (book.isRead == false && book.pagesRead > 0) {
        row5.classList.add('not-read')
        row5.innerText = 'Not Finished'
    } else {
        row5.classList.add('not-read')
        row5.innerText = 'Not Finished'
    }
    card.appendChild(row5)

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
        createBookCard(addBookToLibrary())
    }
})

document.addEventListener('click', e => {
    if (e.target.matches('button.is-read')) {
        const isRead = e.target
        const pagesCard = isRead.previousElementSibling
        const authorCard = pagesCard.previousElementSibling
        const titleCard = authorCard.previousElementSibling
        const book = myLibrary.find(book => book.title === titleCard.innerText)
        console.log(book)
        if (isRead.innerText == 'Finished') {
            isRead.innerText = 'Not Finished';
            isRead.style.backgroundColor = '#ff9c9c';
            book.isRead = false
        } else {
            isRead.innerText = 'Finished';
            isRead.style.backgroundColor = '#9fff9c';
            book.isRead = true
        }
    }
})
