
export const getAllTodos = async () => {
    const response = await fetch('/todo');
    return await response.json();
}

export const createTodo = async (data) => {
    const response = await fetch('/todo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({todo: data})
      })
    return await response.json();
}