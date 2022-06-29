'use strict';
console.log('up and running');

//i wanna create a todo list app
//don't forget e.preventDefault() when handling form data
//i wanna grab the form data and onsubmit, print it out in the added list container div as a new li element
//first grab html elements
//add form
let todoForm = document.getElementById('add-todo-item-form');
//input where user can add new todo items
let addMe = document.getElementById('addMe');
//div where we wanna print new items
let printNewItemHere = document.getElementById('added-list-container');
//create ul for new items to be placed in
let unorderedTaskList = document.createElement('ul');
//get submit button
let submitButton = document.getElementById('submit-button');
//i want to strikethrough list item when its right clicked...would i add an event listener inside the createNewListItem function? use the right click as a toggle between strike through and not striked through
//click event for right click, oncontextmenu for left click
//strike through i can do with .strike() method, or not, apparently this method is deprecated

//on site load, i want a function that checks if there are any tasks in local storage
//if there are, add them to the page
//localStorage.getItem('key');
//window.onload = loadTasks; //loadTasks is a function i need to write that'll load tasks saved from localStorage

function loadTasks(){
    //Array.from takes the tasks key from localStorage and separates each item, then puts it in an array
    //JSON.parse converts to object from string
    let todoObjects = JSON.parse(localStorage.getItem('todo'));
    //since we turned all local storage tasks into an array, we can iterate through it to print out each one onto the screen, but its still a JSON array and not a regular array
    todoObjects.forEach(todoObject => {
        //create new li element
        let list = document.createElement('li');
        list.textContent = `${todoObject.text}`;
        unorderedTaskList.append(list);
    })
}
window.addEventListener('load', loadTasks);

//create function to print new todo item to 
function createNewListItem(e){
    e.preventDefault();
    //grab whatever is in the submit form
    let addMe = document.getElementById('addMe').value;

    //print whatever is in the submit form in a new li element
    //create li
    let newItem = document.createElement('li');
    newItem.textContent = addMe;

    //add li to ul
    unorderedTaskList.append(newItem);
    //add ul to div
    printNewItemHere.append(unorderedTaskList);

    //add event listener to the newItem added
    //when its right clicked, it toggles between adding strike-through class to it or not
    newItem.addEventListener('click', function(){
        newItem.classList.toggle('strike-through');
    })

    //add event listener to newItem added
    //when its left clicked, it deletes the element
    newItem.addEventListener('contextmenu', e => {
        //i don't want the context menu to pop up when the user left clicks
        e.preventDefault();
        //removeChild only removes the child element from the newItem, so i have to target the parent, which is unorderedTaskList
        unorderedTaskList.removeChild(newItem);
    })
    //i wanna reset the form after each new item is added
    todoForm.reset();
}

//i need a way to store each newItem added to todo list, i need to be able to tell if it is completed(true) or not(false).
//create array to hold all created new todo item objects
let todoItemArray = [];

//create constructor function to create new object to hold created new todo items
//set them to false(not completed) when i create it
function addTodoItem(text){
    const todo = {
        text,
        completed: false
    };
    //add each new todo object to todoItemArray
    todoItemArray.push(todo);
    localStorage.setItem('todo', JSON.stringify(todoItemArray));

    //when the user completes it, i need to set that false to true
}


//add event listener to add each new created item to the constructor function so i can push to array
todoForm.addEventListener('submit', e => {
    e.preventDefault();
    createNewListItem(e);
    //grabs the text content of the last element of the ul, which is whatever li element was created last
    addTodoItem(unorderedTaskList.lastElementChild.textContent);
});


//you lose all your info if the site is refreshed...maybe save the results to localStorage when I print it so if the user accidentally refreshes, it saves their info?
//i need more sense on my local storage logic...
// todoForm.addEventListener('submit', function(){
//     localStorage.setItem('ToDo List', `${unorderedTaskList.textContent}`);
// })

//when the user submits the form, adding a new item, I want that item added to local storage
//localStorage.setItem('key', 'value');

//if the item is crossed off, i need something that shows that the item is still there, but not active at the moment

//if the item is deleted, i need to remove it from local storage
//localStorage.removeItem('key');


//