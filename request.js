export default async function request(action, data = {}) {
    const formData = new FormData();
    formData.append('action', 'todos')
    fetch('http://localhost:5000/todolist/', {
        method: "POST"
    })
        .then(response => response.json())
        .then(data => this.todos = data)
}