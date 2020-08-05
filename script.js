//get the heading element
const headingEl = document.querySelector("#headingTotal");

//ref to desc element
const inputDescEl = document.querySelector("#inputDesc");

//ref to input amount
const inputElement = document.querySelector("#inputAmount");

//get the ref to table
const expenseTableEl = document.querySelector("#expenseTable");

//initial val of expense
let totalExpense = 0;

//set the heading element to total expense
headingEl.textContent = totalExpense;

//all expenses at a place
const allExpenses = [];

function addExpenseToTotal(){

    const   expenseItem = {};

    const inputElement = document.querySelector("#inputAmount");
    const textAmount = inputElement.value;

    const textDesc = inputDescEl.value;

    //convert it to number
    const expense = parseInt(textAmount, 10);
    
    //put it in object
    expenseItem.desc = textDesc;
    expenseItem.amount  = expense;
    expenseItem.moment = new Date();

    //put this in the object
    allExpenses.push(expenseItem);
    

    //add the value to total expense
    totalExpense = totalExpense + expense;
    
    //set the heading element to total expense
    const someText = `Total: ${totalExpense}`;
    headingEl.textContent = someText;

    renderList(allExpenses);
}

//get the button element
const element = document.querySelector("#btnAddExpense");

//listen to click event
element.addEventListener("click", addExpenseToTotal, false);

//controller function
function getDateString(momento){
return momento.toLocaleDateString('en-US', { 
                year: 'numeric',
                month: 'long',
                day: 'numeric',
    });
}
//deleting items

function deleteItem(dateValue){
    const newArr = allExpenses.filter(expense => expense.moment.valueOf() !== dateValue)
    renderList(newArr);
}

function renderList(arrOfList){
    const allExpenseHTML = arrOfList.map(expense => createListItem(expense));
    const joinallExpenseHTML = allExpenseHTML.join('');
    expenseTableEl.innerHTML = joinallExpenseHTML;
}

//view layer
function createListItem({ desc, amount, moment }) {
    return `
    <li class="list-group-item d-flex justify-content-between">
    <div class="d-flex flex-column">
            ${desc}
        <small class="text-muted">${getDateString(moment)}</small>
    </div>
    <div>
        <span class="px-5">
            ${amount}
        </span>
        <button 
            type="button" 
            class="btn btn-outline-danger btn-sm"
            onclick="deleteItem(${moment.valueOf()})"
            >
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
    </li>
    `;
}
