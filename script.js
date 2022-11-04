const form = document.forms[0]
var inputValue = document.getElementById("add")
const taskBar = document.querySelector(".task-container")
let tasks = document.getElementsByClassName("task")

checkBar()

document.getElementsByClassName("incomplete")[0].onclick = ()=>{
    show()
    let completedItems = taskBar.querySelectorAll(".active")
    console.log(completedItems)
    completedItems.forEach(element => {
        element.classList.add("hide")
    });
}

document.getElementsByClassName("complete")[0].onclick = ()=>{
    show()
    for(let i = 0;i<tasks.length;i++){
        if(!tasks[i].classList.contains("active")){
            tasks[i].classList.add("hide")
        }
    }
}

document.getElementsByClassName("all")[0].onclick = show

function show(){
    for(let i = 0;i<tasks.length;i++){
        if(tasks[i].classList.contains("hide")){
            tasks[i].classList.remove("hide")
        }
    }
}

form.onsubmit =(e)=>{
    e.preventDefault()
    if(inputValue.value==""){
        alert('Write something first!')
    }else if(inputValue.value.length>30){
        alert("Name of a task is too long!")
        inputValue.value = ''
    }else{
        createTask(inputValue.value)
        checkBar()
    }
}


function createTask(e){
    const div = document.createElement("div")
    const input = document.createElement("input")
    const text = document.createElement("label")
    const Delete = document.createElement("button")

    input.type = "checkbox"
    Delete.classList.add("delete")
    text.classList.add("task-text")
    div.classList.add('task')
    
    text.appendChild(input)
    text.appendChild(document.createTextNode(e))
    Delete.innerText = "Delete"

    inputValue.value = ""
    Delete.onclick = deleteTask
    input.onclick = completeTask

    div.appendChild(text)
    div.appendChild(Delete)
    taskBar.appendChild(div)

}

let completeTask = function(){
    if(this.checked){
        this.parentNode.parentNode.classList.add("active")
        filter("e")
    }else{
        this.parentNode.parentNode.classList.remove("active")
    }
}


function checkBar(){
    let h3 = document.createElement("h3")
    h3.style.textAlign = "center"
    h3.innerText = "No plans yet"
    h3.id = "empty"

    if(document.getElementById("empty") || taskBar.hasChildNodes()){
        taskBar.removeChild(document.getElementById("empty"))
    }else if(!document.getElementById("empty")){
        taskBar.appendChild(h3)
    }
}

let deleteTask = function(){
    this.parentNode.remove()
    checkBar()
}