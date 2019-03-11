let todoList = {
    
    todos: [ 
        {
        todoText: "Vacuum kitchen",
        completed: false
        },
        {
        todoText: "Buy milk",
        completed: false
        },
        {
        todoText: "Walk dog",
        completed: false
        },
        {
        todoText: "Book trip to Australia",
        completed: true
        }
    ],

    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },

    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },

    toggleCompleted: function(position) {
        let todo = this.todos[position];
        todo.completed = !todo.completed;
    }


};

let handlers = {

    addTodo: function() {
        //clear error message after todo has been added properly
        document.querySelector("#errorMessage").innerHTML = "";

        if (document.querySelector("#addNewTextInput").value == "") {
            document.querySelector("#errorMessage").innerHTML = "You need to enter a todo";
        } else  {
            let addNewTextInput = document.querySelector("#addNewTextInput");
            todoList.addTodo(addNewTextInput.value);
            addNewTextInput.value = "";
            view.displayTodos();
        }
        
    },

    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },

    toggleCompleted: function(position) {
        todoList.toggleCompleted(position);
        view.displayTodos();
    }
};


let view = {

    displayTodos: function() {

        let todosUl = document.querySelector("#incompletedTodos");
        let todosUlCompleted = document.querySelector("#completedTodos");
        todosUl.innerHTML = "";
        todosUlCompleted.innerHTML = "";

        todoList.todos.forEach(function(todo, position) {

            let todoLi = document.createElement("li");
            let todoTextPrinted = todo.todoText;
            //adding paragraph element for styling when checked
            let todoP = document.createElement("p");
            let textNode = document.createTextNode(todoTextPrinted);
            todoP.appendChild(textNode);

            //adding id to li to access with addEventListener
            todoLi.id = position;
            let checkbox = todoLi.appendChild(this.createTodoCheckbox());
            todoLi.appendChild(todoP);
            let deleteButton = todoLi.appendChild(this.createDeleteButton());
            //add id to deleteButton so parentNode will work on delete icon inside button
            deleteButton.id = position;

            if (todo.completed === true) {
                todoLi.className = "checked";
                checkbox.checked = true;
                todosUlCompleted.appendChild(todoLi);
            } else {
                todosUl.appendChild(todoLi);
            }
            // this - refers to the view object, needed to access methods (callback functions) from outside of forEach (higher order function)
            //syntax - forEach(callback, this)
        }, this);
        
        //needed to sort array in sorting functions
        return todoList.todos;
    },

    createTodoCheckbox: function() {
        let todoCheckbox = document.createElement("input");
        todoCheckbox.type = "checkbox";
        todoCheckbox.className = "todoCheckbox";

        return todoCheckbox;
    },

    createDeleteButton: function() {
        let deleteButton = document.createElement("button");
        let icon = document.createElement("i");
        icon.className = "fas fa-trash-alt";
        deleteButton.className = "delete-button";
        deleteButton.appendChild(icon);

        return deleteButton;
    },

    sortTodosAsc: function() {

        let todos = this.displayTodos();

            //compare all strings in array, the 'smaller' one in alphabet will be placed after the 'bigger' 
            todos.sort(function(a, b){
                let string1 = a.todoText.toLowerCase(), string2 = b.todoText.toLowerCase()
                if (string1 < string2) {
                    return -1 
                } else if (string1 < string2) {
                    return 1
                } else {
                    //default
                    return 0;
                }
            })

        this.displayTodos(todos);
    },

    sortTodosDesc: function() {

        let todos = this.displayTodos();

            todos.sort(function(a, b){
                let string1 = a.todoText.toLowerCase(), string2 = b.todoText.toLowerCase()
                if (string1 > string2) {
                    return -1 
                } else if (string1 < string2) {
                    return 1
                } else {
                    return 0;
                }
            })

        this.displayTodos(todos);
    },

    setUpEventListeners: function() {

        let todosUl = document.querySelector("#incompletedTodos");
        let todosUlCompleted = document.querySelector("#completedTodos");

        //if uncompleted ul is clicked
        todosUl.addEventListener("click", function(event){
            //get the element that was clicked on
            let elementClicked = event.target;

            if (elementClicked.className === "fas fa-trash-alt") {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
            if (elementClicked.className === "todoCheckbox") {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }
            
        });

        //if completed ul is clicked
        todosUlCompleted.addEventListener("click", function(event){
            let elementClicked = event.target;

            if (elementClicked.className === "fas fa-trash-alt") {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
            if (elementClicked.className === "todoCheckbox") {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }
            
        });

    }
    
};

view.setUpEventListeners();