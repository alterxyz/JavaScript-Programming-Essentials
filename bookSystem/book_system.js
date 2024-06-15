let books = [];
let editingIndex = -1;

document.getElementById('books').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const bookIndex = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode)
        if (event.target.innerHTML === "Delete") {
            deletebook(bookIndex);
        } 
        else if (event.target.innerHTML === "Edit") {
            editbook(bookIndex);
        }
    }
});


// 修改 addBook 函数来处理新增和保存
function addBook() {
    if (editingIndex !== -1) {
        // 保存修改
        const updatedBook = {
            name: document.getElementById('bookName').value,
            authorName: document.getElementById('authorName').value,
            bookDescription: document.getElementById('bookDescription').value,
            pagesNumber: parseInt(document.getElementById('pagesNumber').value)
        };

        books[editingIndex] = updatedBook;
        editingIndex = -1;
        showbooks();
        clearInputs();
        document.getElementById('addBook').innerHTML = 'Add Book'; 
    } else {
        // 新增书籍
        const bookName = document.getElementById('bookName').value;
        const authorName = document.getElementById('authorName').value;
        const bookDescription = document.getElementById('bookDescription').value;
        const pagesNumber = parseInt(document.getElementById('pagesNumber').value);
        if (bookName && authorName && bookDescription && !isNaN(pagesNumber)) {
            const book = {
                name: bookName,
                authorName: authorName,
                bookDescription: bookDescription,
                pagesNumber: pagesNumber
            };
            books.push(book);
            showbooks();
            clearInputs();
        } else {
            alert('Please fill in all fields correctly.');
        }
    }
}

function showbooks() {
    const booksDiv = books.map((book, index) => `<div><h1>book Number: ${index + 1}</h1>
        <p><strong>Book Name: </strong>${book.name}</p>
        <p><strong>Author Name:</strong> ${book.authorName}</p>
        <p><strong>Book Description:</strong> ${book.bookDescription}</p>
        <p><strong>No. of Pages:</strong> ${book.pagesNumber} page(s)</p>
        <button onclick="deletebook(${index})">Delete</button>
        <button onclick="editbook(${index})">Edit</button>
        </div>`
    );
    document.getElementById('books').innerHTML = booksDiv.join('');
}

function clearInputs() {
    document.getElementById('bookName').value = '';
    document.getElementById('authorName').value = '';
    document.getElementById('bookDescription').value = '';
    document.getElementById('pagesNumber').value = '';
}

function editbook(index) {
    const book = books[index];
    document.getElementById('bookName').value = book.name;
    document.getElementById('authorName').value = book.authorName;
    document.getElementById('bookDescription').value = book.bookDescription;
    document.getElementById('pagesNumber').value = book.pagesNumber;

    editingIndex = index;
    document.getElementById('addBook').innerHTML = 'Save Changes';
}



function deletebook(index) {
    books.splice(index, 1);
    showbooks();
    
}