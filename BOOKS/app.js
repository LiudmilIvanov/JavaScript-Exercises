function viewAllBooks() {
    let tbodyElement = document.getElementById('tbody');
    let loadBtnElement = document.getElementById('loadBooks');
    let baseUrl = 'https://my-books-6a066-default-rtdb.firebaseio.com/';


    loadBtnElement.addEventListener('click', function() {
        let getUrl = `${baseUrl}.json`;

        if (tbodyElement.innerHTML != '') {
            tbodyElement.innerHTML = '';
        }

        fetch(getUrl)
            .then(response => response.json())
            .then((data) => {
                Object.keys(data).forEach(key => {
                  let trElement = document.createElement('tr');

                  trElement.innerHTML = `<td>${data[key].name}</td><td>${data[key].author}</td><td>${data[key].isbn}</td><td><button>Edit</button><button>Delete</button></td>`;
                  tbodyElement.appendChild(trElement);
                })
            });
    });
};

function addBook() {
    let baseUrl = 'https://my-books-6a066-default-rtdb.firebaseio.com/';
    let btnElement = document.getElementById('submit');
    let titleInput = document.getElementById('title');
    let authorInput = document.getElementById('author');
    let isbnInput = document.getElementById('isbn');
    let postUrl = `${baseUrl}.json`;



    

    btnElement.addEventListener('click', function(e) {
       e.preventDefault();
       
       let input = {
        name: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value
     };

        fetch(postUrl, {
            method: 'POST',
            body: JSON.stringify(input)
        });
        titleInput.value = '';
        authorInput.value = '';
        isbnInput.value = '';
        
    });


};


viewAllBooks();
addBook();