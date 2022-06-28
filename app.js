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
    newItem.addEventListener('contextmenu', function(e){
        //i don't want the context menu to pop up when the user left clicks
        e.preventDefault();
        //removeChild only removes the child element from the node, so i have to target the parent, which is unorderedTaskList
        unorderedTaskList.removeChild(newItem);
    })
    
    //i wanna reset the form after each new item is added
    todoForm.reset();
}
//add event listener 
todoForm.addEventListener('submit', createNewListItem);

//i need more sense on my local storage logic...
// todoForm.addEventListener('submit', function(){
//     localStorage.setItem('ToDo List', `${unorderedTaskList.textContent}`);
// })

//you lose all your info if the site is refreshed...maybe save the results to localStorage when I print it so if the user accidentally refreshes, it saves their info?
