const taskList = [];
const badList = [];
const hrPerWeek = 168;

console.log(taskList);

const handleOnSubmit = (e) => {
    const formData = new FormData(e);

    const task = formData.get("task")
    const hr = +formData.get("hr")

    if (hr < 1) return alert("Please enter valid hour");

    const ttlBadHrs = totalBadHours();

    const total = taskList.reduce((subttl, item) => subttl + item.hr, 0) + hr;

    const newTotal = taskList.reduce((subttl, item) => subttl + item.hr, 0);

    console.log('total', total);
    console.log('totalbadhrs', ttlBadHrs);

    if ((ttlBadHrs + total) > hrPerWeek) return alert(`Maximum weekly hours crossed!! You only have ${hrPerWeek - newTotal} hours remaining`)



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
                    <i class="fas fa-arrow-right btn-sm btn-warning" onclick="markAsNotToDo(${i})" title="Mark as a bad list" ></i>
                </button>
            </td>
         </tr>`
    })
    document.getElementById('task-list').innerHTML = str;
}

const displayBadList = () => {
    let str = '';
    badList.map((item, i) => {
        str +=
            `<tr>
            <td><input type="checkbox" /> ${item.task}</td>

            <td>${item.hr} hours</td>

            <td class="text-end">
            
                <button class="btn">
                    <i class="fas fa-arrow-left btn-sm btn-warning" onclick="markAsToDo(${i})" title="Mark as a bad list" ></i>
                </button>
                <button class="btn" onclick="deleteBadItem(${i})">
                        <i class="fas fa-trash btn-danger btn-sm" title="Delete" ></i>
                </button>
                      
                
            </td>
         </tr>`
    })
    document.getElementById('bad-list').innerHTML = str;
}


const deleteItem = i => {
    if (!confirm("Are you sure you would want to delete this item?")) {
        return;
    }
    taskList.splice(i, 1);
    display();

    totalTaskHours()
}
const deleteBadItem = i => {
    if (!confirm("Are you sure you would want to delete this item?")) {
        return;
    }
    badList.splice(i, 1);
    displayBadList();

    totalTaskHours();
    totalBadHours();
}

const totalTaskHours = () => {
    const total = taskList.reduce((subttl, item) => subttl + item.hr, 0)
    const ttlBadHrs = totalBadHours();

    const ttlHrs = total + ttlBadHrs;
    document.getElementById('totalHours').textContent = ttlHrs;

}
const totalBadHours = () => {
    const total = badList.reduce((subttl, item) => subttl + item.hr, 0)
    document.getElementById('bad-hours').textContent = total;
    return total;

}

const markAsNotToDo = i => {
    const itm = taskList.splice(i, 1);
    console.log(itm);
    display();

    badList.push(itm[0]); // array has only 1 item always
    console.log(i);
    displayBadList();
    totalBadHours();
}
const markAsToDo = i => {
    const itm = badList.splice(i, 1);
    display();
    displayBadList();

    taskList.push(itm[0]); // array has only 1 item always
    totalTaskHours();
}

