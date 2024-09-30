function displayBooks() {
    // Purge children nodes of bookContainer
    bookContainer.replaceChildren();

    for (let i = 0; i < myLibrary.length; i++) {
        const currentBook = myLibrary[i];
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', i);

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('header');
        cardHeader.textContent = currentBook.title;

        const crossImg = document.createElement('img');
        crossImg.setAttribute('src', 'cross.svg');
        crossImg.setAttribute('height', '800px');
        crossImg.setAttribute('width', '800px');
        crossImg.setAttribute('alt', 'Remove book');
        cardHeader.appendChild(crossImg);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const author = document.createElement('p');
        author.textContent = `Author: ${currentBook.author}`;
        cardBody.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${currentBook.pages}`;
        cardBody.appendChild(pages);

        const read = document.createElement('p');
        read.textContent = `Read? ${currentBook.read === true ? 'Yes' : 'No'}`;
        cardBody.appendChild(read);

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.setAttribute('type', 'button');
        
        if (currentBook.read === true) {
            toggleReadBtn.textContent = 'Mark as Unread';
        } else {
            toggleReadBtn.textContent = 'Mark as Read';
            toggleReadBtn.classList.toggle('toggle-read');
        }

        cardFooter.appendChild(toggleReadBtn);
        
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        bookContainer.appendChild(card);
    }
}

const bookContainer = document.querySelector('.books');
const showButton = document.querySelector('#showDialog');
const dialog = document.querySelector('#addBookDialog');
const dialogForm = dialog.querySelector('form');
const confirmBtn = dialog.querySelector('#confirmBtn');
const cancelBtn = dialog.querySelector('#cancelBtn');

bookContainer.addEventListener('click', (e) => {
    const targetTagName = e.target.tagName;
    const bookIndex = e.target.parentElement.parentElement.getAttribute('data-index');
    
    if (targetTagName === 'IMG') {
        // Remove item at bookIndex from myLibrary array
        removeBookFromLibrary(bookIndex);
        displayBooks();
    } else if (targetTagName === 'BUTTON') {
        myLibrary[bookIndex].toggleReadStatus();
        displayBooks();
    }
});

showButton.addEventListener('click', () => {
    dialog.showModal();
});

confirmBtn.addEventListener('click', (e) => {
    // Prevent default form submission
    e.preventDefault();

    const {title, author, pages, read} = dialogForm.elements;

    const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.checked
    );
    
    dialog.close();
    addBookToLibrary(newBook);
    displayBooks();
});

cancelBtn.addEventListener('click', () => {
    dialog.close();
});

let myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        // Throw error if instance is declared without using 'new' keyword
        throw Error(`Must use the 'new' operator to call the function`);
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    const readString = this.read ? 'already read' : 'not read yet';
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(bookIndex) {
    myLibrary.splice(bookIndex, 1);
}

const book1 = new Book(
    'To Kill A Mockingbird',
    'Harper Lee',
    376,
    false
);

const book2 = new Book(
    'The Hobbit',
    'J.R.R. Tolkien',
    310,
    true
);

const book3 = new Book(
    'Wuthering Heights',
    'Emily Brontë',
    400,
    false
);

const book4 = new Book(
    'Crime and Punishment',
    'Fyodor Dostoevsky',
    527,
    true
);

const book5 = new Book(
    'Frankenstein',
    'Mary Shelley',
    280,
    false
);

const book6 = new Book(
    'Twilight',
    'Stephanie Meyer',
    544,
    true
);

const book7 = new Book(
    'Normal People',
    'Sally Rooney',
    266,
    false
);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);
addBookToLibrary(book7);

displayBooks();