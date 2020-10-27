/**
 * Create a new book object.
 * 
 * @constructor
 * @param {string} title 
 * @param {string} author 
 * @param {string} genre
 * @param {boolean} finished 
 */
function Book(title, author, genre, status) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.status = status;
}

/**
 * Verify if user inputs valid book data.
 * Display warnings if it's not.
 * 
 * @param {(number|Array.<String>)} book - 0 or array of strings
 * @param {HTMLElement} mod - Add book modal
 */
const verifyData = (data, mod) => {
  // Missing input field
  if (data.includes('')) {
    let warn = document.querySelector('.modal-warning');
    warn.textContent = 'Missing book information';
  } else {
    mod.style.display = 'none';
    return data
  }
}

/**
 * Get data from modal input.
 * Return 0 if an input field is missing.
 * 
 * @returns {(number|Array.<String>)} 0 or array of strings
 */
const getBookData = (mod) => {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let genre = document.querySelector('#genre').value;
  let status = document.querySelector('#status').value;

  let data = [title, author, genre, status];
  return verifyData(data, mod);
}


/**
 * Open and close add book modal with listeners.
 * 
 * @param {HTMLElement} mod - Add book modal
 */
const modalControl = (mod) => {

  function closeMod() {
    mod.style.display = 'none';
  }

  // Open modal when 'Add Book' button clicked
  let btn = document.querySelector('.open-modal');
  btn.addEventListener('click', () => {
    mod.style.display = 'block';
  });

  // Close modal when X clicked
  let closeBtn = document.querySelector('.close-modal')
  closeBtn.addEventListener('click', () => {
    closeMod();
  });

  // Close modal when user click outside the box
  window.addEventListener('click', (e) => {
    if (e.target == mod) {
      closeMod();
    }
  });

  // Close modal when 'Cancel' button clicked
  let cancel = document.querySelector('.add-cancel')
  cancel.addEventListener('click', () => {
    closeMod();
  });
}

(function() {
  let userLibrary = [];
  let book;

  // Activate modal
  let modal = document.querySelector('.modal');
  modalControl(modal);

  // Verify and add new book to library
  let addBtn = document.querySelector('.add-book');
  addBtn.addEventListener('click', () => {
    book = getBookData(modal);

    // Create new book
    book = new Book(...book);
  });
})();