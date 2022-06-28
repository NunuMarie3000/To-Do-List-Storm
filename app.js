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

//create function to print new todo item to 
function createNewListItem(e){
    e.preventDefault();
    //grab whatever is in the submit form
    let addMe = document.getElementById('addMe').value;
    //print whatever is in the submit form in a new li element
    //create li
    let newItem = document.createElement('li');
    newItem.textContent = addMe;
    //add li to the ul
    unorderedTaskList.append(newItem);
    //add ul to div
    printNewItemHere.append(unorderedTaskList);
    //i wanna reset the form after each new item is added
    todoForm.reset();

    //create function that denotes a completed task
    function taskCompleted(){
        newItem.setAttribute('class', 'strike-through');
    }
    function taskUnCompleted(){
        newItem.removeAttribute('class', 'strike-through');
    }
    newItem.addEventListener('click', function(){
        taskCompleted();
        newItem.addEventListener('click', taskUnCompleted);
    })
}
//add event listener 
todoForm.addEventListener('submit', createNewListItem);

//i want to strikethrough list item when its right clicked...would i add an event listener inside the createNewListItem function? use the right click as a toggle between strike through and not striked through
//click event for right click, oncontextmenu for left click
//strike through i can do with .strike() method, or not, apparently this method is deprecated
