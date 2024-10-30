let transContent = document.getElementById("transContent");
let Name = document.getElementById('name');
let Amount = document.getElementById('amount');
let addButton = document.getElementById('addButton');
let form = document.getElementById('form');
let reset = document.getElementById('reset');
let incomeButton = document.getElementById('incomeType');
let expenseButton = document.getElementById('expenseType');
let totalAmount = document.getElementById('totalAmount');
let incomeAmount = document.getElementById('incomeAmount');
let expenseAmount = document.getElementById('expenseAmount');
// let historyTransactions = document.getElementById('historyTransaction')

form.addEventListener('submit', function(e){
    e.preventDefault();
})

let totalBalance = 0;
let incomeBalance = 0;
let expenseBalance = 0;

let transactions = JSON.parse(localStorage.getItem('transactions')) || []

let transactionType = ''
incomeButton.addEventListener('click', function(){
    transactionType = "income";
    console.log('income');
    incomeButton.style.opacity = '0.3'
})

expenseButton.addEventListener('click', function(){
    transactionType = "expense";
    console.log('expense');
    expenseButton.style.opacity = '0.3'
})

//taking the user inputs and puuting them into an array
//also pushing them into the transactions object
addButton.addEventListener('click', function(){
   
    let nameValue = Name.value;
    let amountValue = Amount.value;

    if(nameValue === '' || amountValue === '' || isNaN(amountValue) || transactionType === ''){
        alert("Please fill in all fields")
    }else if (nameValue !== '' && amountValue !== '' && !isNaN(amountValue) && transactionType !== '' ){
        console.log(transactionType)
        const newTransaction = {
            id: transactions.length+1,
            name: nameValue,
            amount : amountValue,
            transCategory : transactionType,
    };
    transactions.push(newTransaction);
    saveToLocalStorage()
    console.log(transactions)
    }
    clearDisplay();
    createTransaction();
    location.reload();
    addButton.style.opacity = '0.3'

}) 

function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
 
//displaying the array of transactions by putting the into html elements
function createTransaction (){
    transactions.map((transaction) => {

        let transactionDiv = document.createElement('li');
        let incomeExpenseDiv = document.createElement('div');
        //  incomeExpenseDiv.style.padding = '15px';
         transactionDiv.appendChild(incomeExpenseDiv);

        if (transaction.transCategory == 'expense'){
            incomeExpenseDiv.style.background = 'rgb(86, 25, 25)'
            incomeExpenseDiv.textContent =  "-"
            totalBalance = parseInt(totalBalance) - parseInt(transaction.amount)
            expenseBalance = parseInt(expenseBalance) + parseInt(transaction.amount);
            console.log(totalBalance);
    
        } else if (transaction.transCategory == 'income'){ 
            incomeExpenseDiv.style.background = 'rgb(39, 72, 39)';
            incomeExpenseDiv.textContent =  "+"
            totalBalance = parseInt(totalBalance) + parseInt(transaction.amount);
            incomeBalance = parseInt(incomeBalance) + parseInt(transaction.amount);
            console.log(totalBalance);
        }  
        totalAmount.textContent = totalBalance;
        incomeAmount.textContent = incomeBalance;
        expenseAmount.textContent = expenseBalance;      

        let name = document.createElement('p');
        name.textContent = `${transaction.name}`
    
        let amount = document.createElement('p');
        amount.textContent = `${transaction.amount}`
    
        let deleteButton = document.createElement('button');
        deleteButton.textContent = '×'
    
        transactionDiv.appendChild(name);
        transactionDiv.appendChild(amount);
        transactionDiv.appendChild(deleteButton);
        transContent.appendChild(transactionDiv);
    })
}


createTransaction();
function clearDisplay(){
    transContent.innerHTML = '';
}

//to reset the local storage
reset.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})
// window.transactionArray = transactions;


// function historyTrans(){
//     transactions.map((transaction) => {
//     historyTransactions.textContent = `${transaction.name}`
//     })
//     console.log(transactions)
// }
// historyTrans()



   

   





