const addButton = document.getElementById('addButton');
const addForm = document.getElementById('addForm');
const tableBody = document.getElementById('tableBody');

addButton.addEventListener('click', function () {
    addForm.style.display = 'block';
});

addForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const group = document.getElementById('group').value;
    const age = document.getElementById('age').value;

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td class="editable">${name}</td>
        <td>${group}</td>
        <td>${age}</td>
        <td><button class="deleteButton">✖</button></td>
    `;

    tableBody.appendChild(newRow);

    addForm.reset();
    addForm.style.display = 'none';
});

tableBody.addEventListener('click', function (event) {

    if (event.target.classList.contains('deleteButton')) {
        const row = event.target.closest('tr');

        const answer = confirm('Видалити цей рядок?');

        if (answer) {
            row.remove();
        }
    }

    if (event.target.classList.contains('editable')) {
        const cell = event.target;

        if (cell.querySelector('input')) {
            return;
        }

        const oldValue = cell.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = oldValue;

        cell.textContent = '';
        cell.appendChild(input);

        input.focus();

        function saveValue() {
            cell.textContent = input.value;
        }

        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                saveValue();
            }
        });

        input.addEventListener('blur', function () {
            saveValue();
        });
    }
});