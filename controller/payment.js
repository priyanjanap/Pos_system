function calculatePaymentTotal() {
    console.log("Calculating total...");
    let subtotal = parseFloat(document.getElementById('subtotal').value) ;
    let discount = parseFloat(document.getElementById('Rdiscount').value) ;

    let discountAmount = subtotal * (discount / 100);
    let total = subtotal - discountAmount;

    total = total < 0 ? 0 : total;

    document.getElementById('totalPaymentAmount').textContent = total.toFixed(2);
    console.log(total);
}
document.getElementById('paymentTotal').addEventListener('click',calculatePaymentTotal);

function confirmPayment() {
    alert("Payment confirmed!");
}
const incomeData = [3000, 3500, 4000, 4500, 3800, 5000, 5300, 4800, 5100, 5400, 5200, 6000];
const outcomeData = [1500, 1800, 1700, 1600, 1400, 1900, 2000, 1800, 1750, 1850, 1650, 1900];
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const incomeChartCtx = document.getElementById('incomeChart').getContext('2d');
new Chart(incomeChartCtx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Income',
            data: incomeData,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: { beginAtZero: true }
        },
        responsive: true
    }
});

const outcomeChartCtx = document.getElementById('outcomeChart').getContext('2d');
new Chart(outcomeChartCtx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Outcome',
            data: outcomeData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: { beginAtZero: true }
        },
        responsive: true
    }
});
