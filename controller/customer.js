const addCustomerButton = document.getElementById('btn');
const popupOverlay = document.getElementById('popupOverlay');
const closePopupButton = document.getElementById('closePopup');
const addCustomerForm = document.getElementById('addCustomerForm');

addCustomerButton.addEventListener('click', () => {
    popupOverlay.style.display = 'flex';
});

closePopupButton.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
});

addCustomerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const customerId = document.getElementById("customerId").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const customerName = document.getElementById("customerName").value;
    const customerAddress = document.getElementById("customerAddress").value;
    const customerEmail = document.getElementById("customerEmail").value;


    alert(`Customer Added:${customerId},${contactNumber},${customerAddress}, ${customerName}, ${customerEmail}`);

    popupOverlay.style.display = 'none';
});
document.addEventListener("DOMContentLoaded", function () {
    const addCustomerForm = document.getElementById("addCustomerForm");
    const customerTbody = document.getElementById("customerTbody");
    const popupOverlay = document.getElementById("popupOverlay");
    const closePopup = document.getElementById("closePopup");

    function showPopup() {
        popupOverlay.style.display = "block";
    }

    closePopup.addEventListener("click", function () {
        popupOverlay.style.display = "none";
    });

    addCustomerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const customerId = document.getElementById("customerId").value;
        const contactNumber = document.getElementById("contactNumber").value;
        const customerName = document.getElementById("customerName").value;
        const customerAddress = document.getElementById("customerAddress").value;
        const customerEmail = document.getElementById("customerEmail").value;

        const newRow = document.createElement("tr");
        const currentDate = new Date().toLocaleDateString();

        newRow.innerHTML = `
            <td>${customerId}</td>
            <td>${customerName}</td>
            <td>${customerAddress}</td>
            <td>${contactNumber}</td>
            <td>${customerEmail}</td>
            <td>${currentDate}</td>
        `;

        customerTbody.appendChild(newRow);

        addCustomerForm.reset();
        popupOverlay.style.display = "none";
    });


});

document.addEventListener('DOMContentLoaded', function() {
    function generateCustomerId() {
        const prefix = "C00-";
        let lastId = localStorage.getItem('customerIdCounter') || '000';
        let newIdNumber = (parseInt(lastId, 10) + 1).toString().padStart(3, '0');
        localStorage.setItem('customerIdCounter', newIdNumber);
        return `${prefix}${newIdNumber}`;
    }

    const customerIdField = document.getElementById('customerId');
    customerIdField.value = generateCustomerId();
});

