const toDoInput = document.getElementById("todo_input")
const toDoBtn = document.getElementById("todo_button")
const toDoList = document.getElementById("list")

/**
 * 기능
 * 클릭된 button의 부모 엘리먼트인 li를 삭제한다
 */

function removeToDo(event) {
    const li = event.target.parentElement
    li.remove()
}

/**
 * 매개변수
 * String 타입의 newTodo
 * 
 * 기능
 * html 객체를 생성하고 setAttribute를 통해 특성을 설정한다
 * <li><button/><span>newTodo</span></li>형식의 객체를 만들고 list에 append한다
 */
function addToDo(newTodo) {
    const li = document.createElement("li")
    const span = document.createElement("span")
    const button = document.createElement("button")
    li.setAttribute("class", "todo_li")
    span.setAttribute("class", "todo_span")
    button.setAttribute("class", "todo_button")
    span.innerText = newTodo
    button.innerText = "❌"
    button.addEventListener("click", removeToDo)
    li.appendChild(button)
    li.appendChild(span)
    toDoList.appendChild(li)
}

/**
 * 기능
 * to-do list의 입력 버튼의 이벤트 구현
 * input의 값을 list에 추가한다
 * 빈 문자열이면 추가하지 않는다
 */
function toDoSubmit() {
    const newTodo = toDoInput.value
    if(newTodo != "") {
        toDoInput.value = ""
        addToDo(newTodo)
    }
}

toDoBtn.addEventListener("click", toDoSubmit)