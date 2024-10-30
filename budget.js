let reset = document.getElementById('reset')
let income = 0;
let budgets = [];
let budgetChart;

function loadData() {
    // Load income from local storage
    const storedIncome = localStorage.getItem('income');
    if (storedIncome) {
        income = parseFloat(storedIncome);
        document.getElementById('display-income').innerText = `Income: $${income.toFixed(2)}`;
    }

    // Load budgets from local storage
    const storedBudgets = JSON.parse(localStorage.getItem('budgets'));
    if (storedBudgets) {
        budgets = storedBudgets;
        updateBudgetList();
        updateChart();
        updateRemaining();
    }
}

function saveData() {
    // Save income and budgets to local storage
    localStorage.setItem('income', income);
    localStorage.setItem('budgets', JSON.stringify(budgets));
}

function setIncome() {
    const incomeInput = document.getElementById('income').value;
    income = parseFloat(incomeInput);
    document.getElementById('display-income').innerText = `Income: $${income.toFixed(2)}`;
    saveData(); // Save income to local storage
    updateRemaining();
}

function addBudget() {
    const item = document.getElementById('budget-item').value;
    const amount = parseFloat(document.getElementById('budget-amount').value);
    
    if (!item || isNaN(amount) || amount <= 0) {
        alert('Please enter valid item and amount.');
        return;
    }

    budgets.push({ item, amount });
    saveData(); // Save budgets to local storage
    updateBudgetList();
    updateRemaining();
    updateChart();
}

function updateBudgetList() {
    const budgetList = document.getElementById('budget-list');
    budgetList.innerHTML = ''; // Clear the list
    budgets.forEach(b => {
        const li = document.createElement('li');
        li.innerText = `${b.item}: $${b.amount.toFixed(2)}`;
        budgetList.appendChild(li);
    });
}

function updateRemaining() {
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const remaining = income - totalBudget;
    document.getElementById('remaining').innerText = `Remaining: $${remaining.toFixed(2)}`;
}

function updateChart() {
    const ctx = document.getElementById('budget-chart').getContext('2d');
    const labels = budgets.map(b => b.item);
    const data = budgets.map(b => b.amount);

    // Destroy the old chart if it exists
    if (budgetChart) {
        budgetChart.destroy();
    }

    // Create a new doughnut chart
    budgetChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Budget Spending',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: 'white', // White border for better contrast
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Load data from local storage when the page loads
window.onload = loadData;
reset.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})
