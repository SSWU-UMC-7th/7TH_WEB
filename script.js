// DOM 요소 선택
const todoInput = document.getElementById('todoInput');
const todoItems = document.getElementById('todoItems');
const doneItems = document.getElementById('doneItems');

// 해야 할 일 추가 함수
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
        // 해야 할 일 아이템 생성
        const li = document.createElement('li');
        li.innerHTML = `${todoText} <button onclick="markAsDone(this)">완료</button>`;
        todoItems.appendChild(li);
        todoInput.value = ""; // 입력 필드 초기화
    }
}

// 할 일 완료 함수 (해낸 일로 이동)
function markAsDone(button) {
    const li = button.parentElement;
    li.removeChild(button); // 완료 버튼 삭제
    li.innerHTML += ` <button class="delete" onclick="deleteItem(this)">삭제</button>`;
    doneItems.appendChild(li); // 해낸 일 목록으로 이동
}

// 해낸 일 삭제 함수
function deleteItem(button) {
    const li = button.parentElement;
    li.remove();
}

// Enter 키 입력 시 할 일 추가
todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});
