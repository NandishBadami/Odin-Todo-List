const form = document.querySelector('form');
const div = document.querySelector('div');

form.onsubmit = () => {
    let project_name = document.querySelector('input').value;
    if(localStorage.getItem(project_name) || localStorage.getItem(project_name) == "") {
        console.log(true);
        const p = document.querySelector('p');
        p.style.color = "red";
        p.textContent = project_name + ' already exists';
        return false;
    } else {
        localStorage.setItem(project_name, "");
    }
}

for(let i=0;i<localStorage.length;i++) {
    const di = document.createElement('div');
    di.innerHTML = "<br><b>" + localStorage.key(i) + "</b>";
    di.innerHTML += "<br><br> Enter todo: <br>";
    const input = document.createElement('input');
    input.required = true;
    input.placeholder = "todo";
    input.type = "text";
    const button = document.createElement('button');
    button.textContent = "Submit";
    di.append(input);
    di.append(button);
    const ul = document.createElement('ul');
    let todos = localStorage.getItem(localStorage.key(i)).split(',');
    todos = todos.filter(ele => ele !== undefined && ele !== '');
    localStorage.setItem(localStorage.key(i), todos);
    for(let j=0;j<todos.length;j++) {
        if(todos[j]) {
        const li = document.createElement('li');
        li.textContent = todos[j];
        const button = document.createElement('button');
        button.textContent = "Delete";
        li.append(button);
        button.addEventListener('click', () => {
            delete todos[j];
            localStorage.setItem(localStorage.key(i), todos);
            li.remove();
        });
        ul.append(li);
    }
    }
    button.addEventListener("click", () => {
        let todo = input.value;
        todos.push(todo);
        localStorage.setItem(localStorage.key(i), todos)
        window.location.reload();
    });
    di.append(ul);
    div.append(di);
    const delete_project = document.createElement('button');
    delete_project.textContent = "Delete " + localStorage.key(i);
    delete_project.className = localStorage.key(i);
    di.append(delete_project);
    delete_project.addEventListener('click', () => {
        localStorage.removeItem(delete_project.className);
        di.remove();
    });
}