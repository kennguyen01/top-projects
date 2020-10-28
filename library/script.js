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
 * Reset modal input fields to default.
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
const close = (modal) => {
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
 * Close modal when span X clicked
 */
const closeModal = () => {
  let close = document.querySelector('.close-modal')
  close.addEventListener('click', close);
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
 * Open and close add book modal with listeners.
 */
const modalControl = () => {
  let modal = document.querySelector('.modal');

  // Open modal
  openModal(modal);

  // Close modal
  closeModal();
  cancelModal();
  clickOutside(modal);
}

/**
 * Clear local storage and remove all books.
 */
const clearLibrary = () => {
  let clear = document.querySelector('.clear-library');
  clear.addEventListener('click', () => {
    localStorage.clear();
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
 * Verify book data and add array to local storage.
 */
const storeBook = () => {
  let modal = document.querySelector('.modal');

  let add = document.querySelector('.add');
  add.addEventListener('click', () => {
    let data = getModalInputs();
    let verified = verifyData(data);
    
    // Add book data to storage
    if (verified) {
      let title = data[0];
      localStorage.setItem(title.toLowerCase(), JSON.stringify(data));

      modal.style.display = 'none';
    }
  });
}

(function() {
  console.log(localStorage);

  // Activate add book modal
  modalControl();

  // Button to clear all books
  clearLibrary();

  // User adding new book
  storeBook();

  // Retrieve book data from storage
  let userLibrary = [];
  let key;
  let book;
  for (let i = 0; i < localStorage.length; i++) {
    // Parse string data from storage back to array
    key = localStorage.key(i);
    book = JSON.parse(localStorage.getItem(key));

    // Create and add new book instance to library array
    book = new Book(...book);
    userLibrary.push(book);
  }
})();