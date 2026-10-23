// Дані зберігаються у JavaScript і рендеряться в таблицю динамічно.
const students = [
    { id: 1, name: "Олена", group: "М-41", age: 20 },
    { id: 2, name: "Іван", group: "М-31", age: 19 }
];

let nextId = 3;
let editingId = null;

const addButton = document.getElementById("addButton");
const addForm = document.getElementById("addForm");
const tableBody = document.getElementById("tableBody");

function renderStudents() {
    tableBody.innerHTML = "";

    students.forEach(function(student) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;
        nameCell.classList.add("editable");
        nameCell.dataset.id = student.id;

        const groupCell = document.createElement("td");
        groupCell.textContent = student.group;

        const ageCell = document.createElement("td");
        ageCell.textContent = student.age;

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Редагувати";
        editButton.classList.add("editButton");
        editButton.dataset.id = student.id;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✖";
        deleteButton.classList.add("deleteButton");
        deleteButton.dataset.id = student.id;

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(groupCell);
        row.appendChild(ageCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

addButton.addEventListener("click", function() {
    editingId = null;
    addForm.reset();
    addForm.classList.remove("hidden");
});

addForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const group = document.getElementById("group").value.trim();
    const age = Number(document.getElementById("age").value);

    if (!name || !group || age <= 0) {
        return;
    }

    if (editingId === null) {
        students.push({
            id: nextId,
            name: name,
            group: group,
            age: age
        });
        nextId++;
    } else {
        const student = students.find(function(item) {
            return item.id === editingId;
        });

        if (student) {
            student.name = name;
            student.group = group;
            student.age = age;
        }
    }

    renderStudents();
    addForm.reset();
    addForm.classList.add("hidden");
    editingId = null;
});

tableBody.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteButton")) {
        const id = Number(event.target.dataset.id);

        const answer = confirm("Видалити цей рядок?");

        if (answer) {
            const index = students.findIndex(function(item) {
                return item.id === id;
            });

            if (index !== -1) {
                students.splice(index, 1);
                renderStudents();
            }
        }
    }

    if (event.target.classList.contains("editButton")) {
        const id = Number(event.target.dataset.id);

        const student = students.find(function(item) {
            return item.id === id;
        });

        if (student) {
            editingId = id;

            document.getElementById("name").value = student.name;
            document.getElementById("group").value = student.group;
            document.getElementById("age").value = student.age;

            addForm.classList.remove("hidden");
        }
    }

    if (event.target.classList.contains("editable")) {
        const id = Number(event.target.dataset.id);

        const student = students.find(function(item) {
            return item.id === id;
        });

        if (!student) {
            return;
        }

        const newName = prompt("Введіть нове ім'я:", student.name);

        if (newName !== null && newName.trim() !== "") {
            student.name = newName.trim();
            renderStudents();
        }
    }
});

// Початковий рендер даних.
renderStudents();
