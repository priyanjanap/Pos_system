$("#dashboardBtn").on('click', () => {
    $("#dashboard-section").css({
        display: "block"
    });
    $("#customer-section").css({
        display: "none"
    });
    $("#item-section").css({
        display: "none"
    });
    $("#order-section").css({
        display: "none"
    });
    $("#payment-section").css({
        display: "none"
    });
});
$("#inventoryBtn").on('click', () => {
    $("#dashboard-section").css({
        display: "none"
    });
    $("#customer-section").css({
        display: "none"
    });
    $("#item-section").css({
        display: "block"
    });
    $("#order-section").css({
        display: "none"
    });
    $("#payment-section").css({
        display: "none"
    });
});
$("#ordersBtn").on('click', () => {
    $("#dashboard-section").css({
        display: "none"
    });
    $("#customer-section").css({
        display: "none"
    });
    $("#item-section").css({
        display: "none"
    });
    $("#order-section").css({
        display: "block"
    });
    $("#payment-section").css({
        display: "none"
    });
});
$("#customerBtn").on('click', () => {
    $("#dashboard-section").css({
        display: "none"
    });
    $("#customer-section").css({
        display: "block"
    });
    $("#item-section").css({
        display: "none"
    });
    $("#order-section").css({
        display: "none"
    });
    $("#payment-section").css({
        display: "none"
    });
});

$("#paymentBtn").on('click', () => {
    $("#dashboard-section").css({
        display: "none"
    });
    $("#customer-section").css({
        display: "none"
    });
    $("#item-section").css({
        display: "none"
    });
    $("#order-section").css({
        display: "none"
    });
    $("#payment-section").css({
        display: "block"
    });
});

function showSection(sectionId) {
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('customer-section').style.display = 'none';
    document.getElementById('item-section').style.display = 'none';
    document.getElementById('order-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';
}

window.onload = function () {
    showSection('dashboard-section');
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthYearDisplay = document.getElementById('monthYear');
const calendarDays = document.getElementById('calendarDays');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

function renderCalendar() {
    calendarDays.innerHTML = "";
    monthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const totalDays = daysInMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        calendarDays.appendChild(emptyDiv);
    }

    for (let i = 1; i <= totalDays; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;

        if (i === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
            dayDiv.classList.add('current-day');
        }

        calendarDays.appendChild(dayDiv);
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

renderCalendar();
const bars = document.querySelectorAll('.bar');

bars.forEach(bar => {
    bar.addEventListener('mouseover', () => {
        bar.textContent = bar.getAttribute('data-value') + '%';
    });
    bar.addEventListener('mouseout', () => {
        bar.textContent = bar.textContent.replace('%', '');
    });
});
document.getElementById("logOut").addEventListener("click", function () {
    logout();
});

function logout() {
    localStorage.removeItem("index.html");

    window.location.href = "http://localhost:63342/Pos-System/file/login.html?_ijt=tpj3i2lg8e966ruuhg52m23kl6&_ij_reload=RELOAD_ON_SAVE";
}
