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
 * Reset modal input fields to default values.
 */
const resetFields = () => {
  let reset = document.querySelector('.reset');
  reset.addEventListener('click', () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('status').value = 'Reading';
  });
}

/**
 * Helper function to close modal.
 * 
 * @param {HTMLElement} modal 
 */
const close = () => {
  let modal = document.querySelector('.modal');
  modal.style.display = 'none';
}

/**
 * Open modal when 'Add Book' button clicked.
 * 
 * @param {HTMLElement} modal 
 */
const openModal = (modal) => {
  let open = document.querySelector('.open-modal');
  open.addEventListener('click', () => {
    modal.style.display = 'block';
  });
}

/**
 * Close modal when span X clicked.
 */
const closeModal = () => {
  let xSpan = document.querySelector('.close-modal')
  xSpan.addEventListener('click', close);
}

/**
 * Close modal when 'Cancel' button clicked
 */
const cancelModal = () => {
  let cancel = document.querySelector('.cancel')
  cancel.addEventListener('click', close);
}

/**
 * Close modal when user click outside the box
 * 
 * @param {HTMLElement} modal 
 */
const clickOutside = (modal) => {
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      closeModal();
    }
  });
}

/**
 * Modal functionalities: add, close, and reset fields.
 */
const modalControl = () => {
  let modal = document.querySelector('.modal');

  // Open
  openModal(modal);

  // Close
  closeModal();
  cancelModal();
  clickOutside(modal);

  // Reset
  resetFields();
}

/**
 * Clear local storage and remove all books from display.
 */
const clearLibrary = () => {
  let clear = document.querySelector('.clear-library');
  let display = document.querySelectorAll('.book-display');

  clear.addEventListener('click', () => {
    while (display.firstChild) {
      display.removeChild(display.lastChild);
    }
    localStorage.clear();
    location.reload();
  });

}

/**
 * Get user inputs from modal.
 * 
 * @returns {Array.<string>}
 */
const getModalInputs = () => {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let genre = document.querySelector('#genre').value;
  let status = document.querySelector('#status').value;
  return [title, author, genre, status];
}

/**
 * Check if array item (input field) is empty.
 * 
 * @param {HTMLElement} warn 
 * @param {Array} data
 * @returns {boolean}
 */
const validateFields = (warn, data) => {
  if (data.includes('')) {
    // Missing input field
    warn.textContent = 'Missing book information';
    return false;
  } else {
    return true;
  }
}


/**
 * Check if book is not in local storage.
 * 
 * @param {HTMLElement} warn 
 * @param {Array} data
 * @returns {boolean}
 */
const checkUnique = (warn, data) => {
  let title = data[0];
  if (localStorage.hasOwnProperty(title.toLowerCase())) {
    warn.textContent = `${title} is already in library`;
    return false;
  } else {
    return true;
  }
}

/**
 * Show warnings if fields are invalid or book already in storage.
 * 
 * @param {Array} data
 * @returns {boolean}
 */
const verifyData = (data) => {

  let warning = document.querySelector('.modal-warning');
  let valid = validateFields(warning, data);
  let unique = checkUnique(warning, data);

  return valid && unique;
}

/**
 * Verify book data, generate book card, 
 * and add array to local storage.
 */
const addBook = () => {
  let modal = document.querySelector('.modal');

  let add = document.querySelector('.add');
  add.addEventListener('click', () => {
    let data = getModalInputs();
    let verified = verifyData(data);

    if (verified) {
      let book = new Book(...data);

      // Generate book card
      bookCard(book);

      // Add book data to storage
      let title = data[0];
      localStorage.setItem(title.toLowerCase(), JSON.stringify(data));

      modal.style.display = 'none';

      // Add new book to listener
      removeBook();
    }
  });
}

/**
 * Generate a card for each book.
 * 
 * Card HTML format:
 * 
 * <div class="book">
 *  <h3>Title</h3>
 *  <p>Author</p>
 *  <p>Genre</p>
 *  <p>Status</p>
 * </div>
 * 
 * @param {Book} book
 */
const bookCard = (book) => {
  let display = document.querySelector('.book-display');

  let card = document.createElement('div');
  card.classList.add('book');

  let title = document.createElement('h3');
  let author = document.createElement('p');
  let genre = document.createElement('p');
  let status = document.createElement('p');
  title.innerHTML = `<em>${book.title}</em>`;
  author.innerHTML = `Author: <strong>${book.author}</strong>`;
  genre.innerHTML = `Genre: <strong>${book.genre}</strong>`;
  status.innerHTML = `Status: <strong>${book.status}</strong>`;

  let del = document.createElement('span');
  del.classList.add('remove-book');
  del.innerHTML = 'Remove';

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(genre);
  card.appendChild(status);
  card.appendChild(del);
  card.setAttribute('data-title', book.title.toLowerCase());

  display.appendChild(card);

  emptyLibrary();
}

/**
 * Add listener to remove book from display and storage.
 */
const removeBook = () => {
  let display = document.querySelector('.book-display');

  let removes = document.querySelectorAll('.remove-book');
  removes.forEach((span) => {
    span.addEventListener('click', () => {
      let parent = span.parentNode;
      let title = parent.getAttribute('data-title');

      display.removeChild(parent);
      localStorage.removeItem(title);

      emptyLibrary();
    });
  });
}

/**
 * Display phrase if library is empty.
 * Get called inside bookCard() and removeBook().
 */
const emptyLibrary = () => {
  let header = document.querySelector('.empty');
  let book = document.querySelector('.book');
  
  if (book) {
    header.style.display = 'none';
  } else {
    header.style.display = 'block';
  }
}

(function () {
  // Activate add book modal functionalities
  modalControl();

  // Add new book
  addBook();

  // Check local storage for existing books
  if (localStorage.length > 0) {

    // Retrieve book data from storage
    for (let i = 0; i < localStorage.length; i++) {

      // Parse string data from storage back to array
      let key = localStorage.key(i);
      let book = JSON.parse(localStorage.getItem(key));

      // New book instance
      book = new Book(...book);

      // Generate book card
      bookCard(book);

      // Add stored books to listeners
      removeBook();
    }
  }

  // Clear all books and local storage
  clearLibrary();
})();