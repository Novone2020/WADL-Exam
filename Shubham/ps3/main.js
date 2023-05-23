const add_user = document.getElementById('add_user');
const close_btn = document.getElementById('close_btn');
const modal = document.getElementById('modal_container');
const submit_btn = document.getElementById('submit_btn');

add_user.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'block';
});

close_btn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'none';
});

submit_btn.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;

  const postObject = {
    name,
    email,
    age,
  };

  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000');

  xhr.send(postObject);
  xhr.onload = () => {
    console.log('Inside ajax post method');
    let storeduser = JSON.parse(localStorage.getItem('users'));
    storeduser.unshift(postObject);
    localStorage.setItem('users', JSON.stringify(storeduser));
    displayData();
  };
  modal.style.display = 'none';
});

const fetchData = () => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000');
  xhr.send();
  xhr.onload = () => {
    let res = JSON.parse(xhr.responseText);
    localStorage.setItem('users', JSON.stringify(res));
    displayData();
  };
};

const displayData = () => {
  console.log('hello guys');
  const storeduser = JSON.parse(localStorage.getItem('users'));
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  storeduser.map((user, index) => {
    tbody.innerHTML += `
    <tr>
       <td>${user.name}</td>
       <td>${user.email}</td>
       <td>${user.age}</td>
    </tr>
       `;
  });
};

fetchData();
