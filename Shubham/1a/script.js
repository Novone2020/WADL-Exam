const toggle_btn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('side-bar');

toggle_btn.addEventListener('click', (e) => {
  e.preventDefault();
  sidebar.classList.toggle('show');
});
