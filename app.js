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
    if(todoObjects === null || todoObjects === []){
        console.log('local storage is empty');
    }else{
        for(let i=0; i<todoObjects.length; i++){
            let addThis = todoObjects[i].text;
            //create new li element
            let list = document.createElement('li');
            list.textContent = `${addThis}`;
            //adding li to ul
            unorderedTaskList.append(list);
            printNewItemHere.append(unorderedTaskList);

            list.addEventListener('click', function(){
                list.classList.toggle('strike-through');
                for(let i=0; i<todoItemArray.length; i++){
                    // if(todoItemArray[i].text === addMe && newItem.hasAttribute('strike-through')){
                    if(todoItemArray[i].text === addThis){
                        //set completed property to true, then i need to update its value in local storage...
                        todoItemArray[i].completed = true;
                        localStorage.setItem(`todo`, JSON.stringify(todoItemArray));
                    }
                }
            })
            list.addEventListener('contextmenu', e => {
                //i don't want the context menu to pop up when the user left clicks
                e.preventDefault();
                //NOTE TO STORMY:
                //IM TRYING TO REMOVE DELETED ITEM FROM LOCAL STORAGE
                for(let i=0; i<todoObjects.length; i++){
                    if(todoObjects[i].text === list.textContent){
                        todoObjects.splice(i, 1);
                        localStorage.setItem('todo', JSON.stringify(todoObjects));
                    }
                }
                // delete todoItemArray.text;
                // localStorage.setItem('todo', JSON.stringify(todoItemArray));
                // //removeChild only removes the child element from the newItem, so i have to target the parent, which is unorderedTaskList
                unorderedTaskList.removeChild(list);
            })
        }
    }
    
    // todoObjects.forEach(todoObject => {
    //     //create new li element
    //     let list = document.createElement('li');
    //     list.textContent = `${todoObject.text}`;
    //     //adding li to ul
    //     unorderedTaskList.append(list);
    //})
}
window.addEventListener('load', loadTasks);

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
    todoItemArray.push(todo);
    localStorage.setItem('todo', JSON.stringify(todoItemArray));
    //NOTE TO STORMY:
    //TESTING TO SEE IF I CAN STORE EACH INDIVIDUAL OBJECT ONE AT A TIME
    // todoItemArray.push(todo);
    // for(let i=0; i<todoItemArray.length; i++){
    //     localStorage.setItem(`${text}`, JSON.stringify(todoItemArray[i]));
    //}
}


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
        //i need to edit the local storage objects if the item itself it completed or not, the text i pass into the addTodoItem function is gonna be the same as the unorderedTaskList.lastElementChild.textContent, which is addMe(from createNewListItem function)
        //if i iterate through the array holding the objects and check each one against the text being clicked, i can then update that object's completed property
        //i could create a function to do this, but how would i be able to access the info? idk, just start ig
        //iterate through todoItemArray, which holds all objects
        //needs to be attached wherever i cross off items
        for(let i=0; i<todoItemArray.length; i++){
            // if(todoItemArray[i].text === addMe && newItem.hasAttribute('strike-through')){
            if(todoItemArray[i].text === addMe){
                //set completed property to true, then i need to update its value in local storage...
                todoItemArray[i].completed = true;
                localStorage.setItem(`todo`, JSON.stringify(todoItemArray));
            }
        }
    })
    
    //add event listener to newItem added
    //when its left clicked, it deletes the element
    newItem.addEventListener('contextmenu', e => {
        //i don't want the context menu to pop up when the user left clicks
        e.preventDefault();
        //NOTE TO STORMY:
        //IM TRYING TO REMOVE DELETED ITEM FROM LOCAL STORAGE
        let todoObjects = JSON.parse(localStorage.getItem('todo'));
        for(let i=0; i<todoObjects.length; i++){
            if(todoObjects[i].text === newItem.textContent){
                todoObjects.splice(i, 1);
                localStorage.setItem('todo', JSON.stringify(todoObjects));
            }
        }

        // delete todoItemArray.text;
        // localStorage.setItem('todo', JSON.stringify(todoItemArray));
        // //removeChild only removes the child element from the newItem, so i have to target the parent, which is unorderedTaskList
        unorderedTaskList.removeChild(newItem);

    })
    //i wanna reset the form after each new item is added
    todoForm.reset();
}

//add event listener to add each new created item to the constructor function so i can push to array
todoForm.addEventListener('submit', e => {
    e.preventDefault();
    createNewListItem(e);
    //grabs the text content of the last element of the ul, which is whatever li element was created last
    addTodoItem(unorderedTaskList.lastElementChild.textContent);
});