import Alpine from 'alpinejs'
window.Alpine = Alpine

Alpine.data('todolistapp', () => ({
    todos: [],
    newTodo: '',
    async init() {
        fetch('http://localhost:5000/todolist/')
            .then(response => response.json())
            .then(data => this.todos = data)
    },
    async updateTodo(todo) {
        let done;
        if (todo.done == 1) { done = 0 } else { done = 1 }
        const updatePost = await fetch('http://localhost:5000/todolist', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: todo._id, done: done })
        });
        const content = await updatePost.json();
        this.todos = this.todos.map(t => {
            if (t._id === todo._id) {
                t.done = done
            }
            return t
        })
    },
    async addTodo() {
        if (this.newTodo == '') {
            alert('Empty content !')
            return
        } else {
            const addPost = await fetch('http://localhost:5000/addtodo', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTodo: this.newTodo })
            });
            const content = await addPost.json();
            this.todos = [content, ...this.todos]
            this.newTodo = ''
        }
    },
    async deleteTodo(todo) {
        const deletePost = await fetch('http://localhost:5000/deletetodo', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: todo._id })
        });
        const content = await deletePost.json();
        this.todos = this.todos.filter(t => t._id !== todo._id)
    }
}))
Alpine.start()