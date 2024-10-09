class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

class Library {
    #library = [];
    length = 0;

    getBook(index) {
        return this.#library[index];
    }

    addBook(book) {
        this.#library.push(book);
        this.length++;
    }

    removeBook(book) {
        this.#library.splice(book, 1);
        this.length--;
    }
}
