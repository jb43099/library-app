// variables
const storedMyLibrary = localStorage.getItem('array')
const myLibrary = storedMyLibrary ? JSON.parse(storedMyLibrary) : [];
const addBookButton = document.querySelector('button.add-book')
const modal = document.querySelector('.modal')
// const pagesReadLabel = document.querySelector('label[for=pages-read]')
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const numberOfPagesInput = document.querySelector('#pages')
// const pagesReadInput = document.querySelector('#pages-read')
const isReadCheckbox = document.querySelector('#isRead')
const submitButton = document.querySelector('.submit-section button')
const pagesWarning = document.createElement('div')
const cardContainer = document.querySelector('.book-cards')


// classes , constructors
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// functions , methods
function addBookToLibrary() {
    if (!titleInput.value ||
        !authorInput.value ||
        !numberOfPagesInput.value ||
        isNaN(+numberOfPagesInput.value) ||
        +numberOfPagesInput.value <= 0 ||
        +numberOfPagesInput.value > 30000) {
        return
    } else {
        const book = new Book(titleInput.value, authorInput.value, numberOfPagesInput.value, isReadCheckbox.checked)
        myLibrary.push(book)
        localStorage.setItem('array', JSON.stringify(myLibrary))
        return book
    }
}

// function createPagesWarning() {
//     if (+pagesReadInput.value > +numberOfPagesInput.value) {
//         pagesWarning.innerText = 'Pages Read cannot be greater than Number of Pages'
//         pagesReadInput.insertAdjacentElement('afterend', pagesWarning)
//         pagesWarning.style.textAlign = 'center'
//         pagesWarning.style.color = 'red'
//     } else if (+pagesReadInput.value <= +numberOfPagesInput.value) {
//         pagesWarning.remove()
//     }
// }

function createBookCard(book) {
    if (!book) return
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
    const row4 = document.createElement('button')
    row4.classList.add('card-row')
    row4.classList.add('is-read')
    if (book.isRead == true) {
        row4.classList.add('read')
        row4.innerText = 'Finished'
    } else {
        row4.classList.add('not-read')
        row4.innerText = 'Not Finished'
    }
    card.appendChild(row4)
    const row5 = document.createElement('button')
    row5.classList.add('card-row')
    row5.classList.add('remove-button')
    row5.innerText = `Remove`
    card.appendChild(row5)

}

function removeCard(e) {
    if (e.target.matches('button.remove-button')) {
        const removeButton = e.target
        const card = removeButton.parentElement
        const titleCard = removeButton.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling
        const bookIndex = myLibrary.findIndex(book => book.title == titleCard.value)
        myLibrary.splice(bookIndex, 1)
        localStorage.setItem('array', JSON.stringify(myLibrary))
        card.remove()
    }
}

function toggleIsRead(e) {
    if (e.target.matches('button.is-read')) {
        const isRead = e.target
        const pagesCard = isRead.previousElementSibling
        const authorCard = pagesCard.previousElementSibling
        const titleCard = authorCard.previousElementSibling
        const book = myLibrary.find(book => book.title === titleCard.innerText)
        if (isRead.innerText == 'Finished') {
            isRead.innerText = 'Not Finished';
            isRead.style.backgroundColor = '#ff9c9c';
            book.isRead = false
            localStorage.setItem('array', JSON.stringify(myLibrary))
        } else {
            isRead.innerText = 'Finished';
            isRead.style.backgroundColor = '#9fff9c';
            book.isRead = true
            localStorage.setItem('array', JSON.stringify(myLibrary))
        }
    }
}

function populateCardsOnPageLoad() {
    myLibrary.forEach(book => {
        createBookCard(book)
    })
}

// event listeners , function calls
addBookButton.addEventListener('click', () => modal.showModal())

submitButton.addEventListener('click', (e) => createBookCard(addBookToLibrary()))

document.addEventListener('click', (e) => toggleIsRead(e))

document.addEventListener('click', (e) => removeCard(e))

populateCardsOnPageLoad()

// isReadCheckbox.addEventListener('click', () => {
//     if (isReadCheckbox.checked) {
//         pagesReadInput.value = numberOfPagesInput.value
//         pagesWarning.remove()
//     } else {
//         pagesReadInput.value = ''
//     }
// })

// pagesReadInput.addEventListener('change', () => {
//     if (pagesReadInput.value == numberOfPagesInput.value) {
//         isReadCheckbox.checked = true
//     } else {
//         isReadCheckbox.checked = false
//     }
// })

// pagesReadInput.addEventListener('change', () => {
//     createPagesWarning()
// })
