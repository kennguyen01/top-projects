/**
 * Create a new book.
 * 
 * @constructor
 * @param {string} title 
 * @param {string} author 
 * @param {string} genre
 * @param {boolean} finished 
 */
function Book(title, author, genre, finished) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.finished = finished;
}

/**
 * Add book to library.
 * 
 * @param {Object} book 
 * @param {Array} library 
 */
const addToLibrary = (book, library) => {

}

/**
 * Display each book in the library.
 * 
 * @param {Array} library 
 */
const showBooks = library => {

}

/**
 * Open and close add book modal.
 * 
 * @param {HTMLElement} btn 
 */
const addBook = () => {
  let modal = document.querySelector('.modal');

  // Open modal when 'Add Book' button clicked
  let btn = document.querySelector('.add-modal');
  btn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  // Close modal when X clicked
  let close = document.querySelector('.close-modal')
  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when user click outside the box
  window.addEventListener('click', e => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });

  // Close modal when 'Cancel' button clicked
  let cancel = document.querySelector('.add-cancel')
  cancel.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

(function() {
  let userLibrary = [];

  // Add book modal
  addBook();
})();