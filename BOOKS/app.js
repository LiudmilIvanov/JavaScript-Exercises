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

                  let bookNameTD = document.createElement('td');
                  bookNameTD.innerHTML = data[key].name
                
                  let authorTD = document.createElement('td');
                  authorTD.innerHTML = data[key].author;
                  
                  let isbnTD = document.createElement('td');
                  isbnTD.innerHTML = data[key].isbn;

                  let btnTD = document.createElement('td');

                  let editBtn = document.createElement('button');
                  editBtn.innerHTML = 'Edit';
                  editBtn.setAttribute('data-key', key);
                  editBtn.setAttribute('id', 'edit');

                  let deleteBtn = document.createElement('button');
                  deleteBtn.innerHTML = 'Delete';
                  deleteBtn.setAttribute('data-key', key);
                  deleteBtn.setAttribute('id', 'delete');

                  btnTD.append(editBtn, deleteBtn);
                  trElement.append(bookNameTD, authorTD, isbnTD, btnTD);

                  // trElement.innerHTML = `<td>${data[key].name}</td><td>${data[key].author}</td><td>${data[key].isbn}</td><td><button data-key="${key}" id="edit">Edit</button><button id="delete">Delete</button></td>`;
                  tbodyElement.appendChild(trElement);
               
                
                  //let deleteBtnEl = document.getElementById('delete');
                
                    deleteBtn.addEventListener('click', function() {
                    fetch(`${baseUrl}/${key}.json`, {method: 'DELETE'});

                  });

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