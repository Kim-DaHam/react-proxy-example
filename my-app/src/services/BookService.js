
export const getAllBooks = async () => {

    const response = await fetch('/books');
    return await response.json();
}

export const createBook = async (data) => {
    const response = await fetch('/book', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({book: data})
      })
    return await response.json();
}