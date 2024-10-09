function displayBooks() {
    // Purge children nodes of bookContainer
    bookContainer.replaceChildren();

    for (let i = 0; i < myLibrary.length; i++) {
        // Get book from library and initalize blank card
        const currentBook = myLibrary.getBook(i);
        const card = initializeCard(i);
        
        // Populate card with data from currentBook
        card.querySelector('.header').prepend(currentBook.title);
        card.querySelector('#author').textContent = `Author: ${currentBook.author}`;
        card.querySelector('#pages').textContent = `Pages: ${currentBook.pages}`;
        card.querySelector('#read').textContent = `Read? ${currentBook.read === true ? 'Yes' : 'No'}`;

        // Toggle appearance and text of button in card footer depending on read status
        const toggleReadBtn = card.querySelector('button');
        if (currentBook.read === false) {
            toggleReadBtn.textContent = 'Mark as Read';
            toggleReadBtn.classList.toggle('toggle-read');
        }

        bookContainer.appendChild(card);
    }
}

function initializeCard(index) {
    // Creates card element and populates card with children
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);

    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    const cardFooter = document.createElement('div');
    const toggleReadBtn = document.createElement('button');    
    const crossImg = new Image();

    crossImg.setAttribute('src', 'cross.svg');
    crossImg.setAttribute('height', '20px');
    crossImg.setAttribute('width', '20px');
    crossImg.setAttribute('alt', 'Remove book');

    crossImg.id = 'removeBook';
    author.id = 'author';
    pages.id = 'pages';
    read.id = 'read';
    toggleReadBtn.id = 'toggleRead';

    toggleReadBtn.setAttribute('type', 'button');
    toggleReadBtn.textContent = 'Mark as Unread';

    cardHeader.classList.add('header');
    cardBody.classList.add('card-body');
    cardFooter.classList.add('card-footer');
    
    cardHeader.appendChild(crossImg);
    cardBody.appendChild(author);
    cardBody.appendChild(pages);
    cardBody.appendChild(read);
    cardFooter.appendChild(toggleReadBtn);
    
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    return card;
}

const bookContainer = document.querySelector('.books');
const newBookBtn = document.querySelector('#newBook');
const dialog = document.querySelector('#addBookDialog');
const dialogForm = dialog.querySelector('form');
const confirmBtn = dialog.querySelector('#confirmBtn');
const cancelBtn = dialog.querySelector('#cancelBtn');

bookContainer.addEventListener('click', (e) => {
    // Get index of the parent card
    const bookIndex = e.target.closest('.card').getAttribute('data-index');
    
    if (e.target.id === 'removeBook') {
        // Remove item at bookIndex from myLibrary array if element clicked is the cross
        myLibrary.removeBook(bookIndex);
        displayBooks();
    } else if (e.target.id === 'toggleRead') {
        // Toggle read status of book if element clicked is the button in the footer of the card
        myLibrary.getBook(bookIndex).toggleReadStatus();
        displayBooks();
    }
});

newBookBtn.addEventListener('click', () => {
    // Display modal dialog box on clicking "New Book" button
    dialog.showModal();
});

confirmBtn.addEventListener('click', (e) => {
    // Handle user pressing "Confirm" within dialog box
    // Prevent default form submission
    e.preventDefault();

    // Instantiate new Book object with provided data
    const {title, author, pages, read} = dialogForm.elements;
    const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.checked
    );
    
    dialog.close();
    myLibrary.addBook(newBook);
    displayBooks();
});

cancelBtn.addEventListener('click', () => {
    dialog.close();
});

let myLibrary = new Library();

// Mock objects
const books = [
    new Book(
        'To Kill A Mockingbird',
        'Harper Lee',
        376,
        false
    ),
    new Book(
        'The Hobbit',
        'J.R.R. Tolkien',
        310,
        true
    ),
    new Book(
        'Wuthering Heights',
        'Emily Brontë',
        400,
        false
    ),
    new Book(
        'Crime and Punishment',
        'Fyodor Dostoevsky',
        527,
        true
    ),
    new Book(
        'Frankenstein',
        'Mary Shelley',
        280,
        false
    ),
    new Book(
        'Twilight',
        'Stephanie Meyer',
        544,
        true
    ),
    new Book(
        'Normal People',
        'Sally Rooney',
        266,
        false
    )
];

books.forEach(book => myLibrary.addBook(book));

displayBooks();