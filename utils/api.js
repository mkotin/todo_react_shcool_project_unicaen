import fetch from "node-fetch"

const API_URL = 'http://graphql.unicaen.fr:4000';

const SIGN_IN = `
mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password)
}
`

const SIGN_UP = `
mutation SignUp($username: String!, $password: String!) {
  signUp(username: $username, password: $password)
}`



const CREATE_TODO = `
mutation CreateTodos($input: [TodoCreateInput!]!) {
  createTodos(input: $input) {
    todos {
      id
      content
      done
    }
  }
}
`

const TODOS = `
query Todos($where: TodoWhere) {
  todos(where: $where) {
    id
    content
    done
  }
}
`

const UPDATE_TODO = `
mutation UpdateTodos($where: TodoWhere, $update: TodoUpdateInput) {
  updateTodos(where: $where, update: $update) {
    todos {
      id
      content
      done
    }
  }
}`


const DELETE_TODO = `
mutation($id: ID!) {
  deleteTodos(where: { id: $id }) {
    nodesDeleted
  }
}
`


const CREATE_TODOLIST = `
mutation createTodoLists($input: [TodoListCreateInput!]!) {
  createTodoLists(input: $input) {
    todoLists {
      id
      owner {
        username
      }
      title
    }
  }
}`


const TODOLISTS = `
query TodoLists($where: TodoListWhere) {
  todoLists(where: $where) {
    id
    title
  }
}
`

const DELETE_TODOLIST = `
mutation DeleteTodoLists($where: TodoListWhere) {
  deleteTodoLists(where: $where) {
    nodesDeleted
  }
}
`



export function createTodoList(username, title, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: CREATE_TODOLIST,
            variables: {
                "input": [
                    {
                        "owner": {
                            "connect": {
                                "where": {
                                    "username": username
                                }
                            }
                        },
                        "title": title
                    }
                ]
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.createTodoLists.todoLists[0]
        })
        .catch(error => {
            console.log('error API', error.message)
            throw error
        })
}


export function getTodoLists(username, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: TODOLISTS,
            variables: {
                "where": {
                    "owner": {
                        "username": username
                    }
                }
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.todoLists
        })
        .catch(error => {
            console.log('error API', error.message)
            throw error
        })
}


export function deleteTodoList(id, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: DELETE_TODOLIST,
            variables: {
                "where": {
                    "id": id
                }
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.deleteTodoLists.nodesDeleted
        })
        .catch(error => {
            console.log('error API', error.message)
            throw error
        })
}


export function createTodo(content, todoListId, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: CREATE_TODO,
            variables: {
                "input": [
                    {
                        "belongsTo": {
                            "connect": {
                                "where": {
                                    "id": todoListId
                                }
                            }
                        },
                        "content": content
                    }
                ]
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.createTodos.todos[0]
        })
        .catch(error => {
            console.log('error API', error.message)
            throw error
        })
}


export function getTodos(todoListId, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: TODOS,
            variables: {
                "where": {
                    "belongsTo": {
                        "id": todoListId
                    }
                }
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.todos
        })
        .catch(error => {
            console.log('error API', error.message)
            throw error
        })
}


export function updateTodo(todoId, done, token, content = "") {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: UPDATE_TODO,
            variables: {
                "where": {
                    "id": todoId
                },
                "update": {
                    "done": done,
                    "content": content
                }
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.updateTodos.todos[0]
        })
        .catch(error => {
            console.log('error API', error.message)
            throw error
        })
}



export function deleteTodo(id, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: DELETE_TODO,
            variables: {
                id: id
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.deleteTodos.nodesDeleted
        })
        .catch(error => {
            console.log('error API', error.message)
            throw error
        })
}



export function signIn(username, password) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: SIGN_IN,
            variables: {
                username: username,
                password: password
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.signIn
        })
        .catch(error => {
            throw error
        })
}

export function signUp(username, password) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: SIGN_UP,
            variables: {
                username: username,
                password: password
            }
        })
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.errors != null) {
                throw jsonResponse.errors[0]
            }
            return jsonResponse.data.signUp
        })
        .catch(error => {
            throw error
        })
}