const taskList = [];
const badList = [];
const hrPerWeek = 168;

const handleOnSubmit = (e) => {
    const formData = new FormData(e);

    const task = formData.get("task")
    const hr = +formData.get("hr")

    const obj = {
        task,
        hr,
    }

    taskList.push(obj)
    console.log(taskList);
    display();
    totalTaskHours();
}

const display = () => {
    let str = '';
    taskList.map((item, i) => {
        str +=
            `<tr>
            <td><input type="checkbox" /> ${item.task}</td>

            <td>${item.hr} hours</td>

            <td class="text-end">
                <button class="btn" onclick="deleteItem(${i})">
                    <i class="fas fa-trash btn-danger btn-sm" title="Delete" ></i>
                </button>
                      
                <button class="btn">
                    <i class="fas fa-arrow-right btn-sm btn-warning" title="Mark" ></i>
                </button>
            </td>
         </tr>`
    })
    document.getElementById('task-list').innerHTML = str;
}

const deleteItem = i => {
    taskList.splice(i, 1);
    display();

    totalTaskHours()
}

const totalTaskHours = () => {
    const total = taskList.reduce((subttl, item) => subttl + item.hr, 0)
    document.getElementById('totalHours').textContent = total;
}