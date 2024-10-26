const addItemBtn = document.getElementById("add-item-btn");
const popupOverlay = document.getElementById("popupOverlay1");
const closePopupButton = document.getElementById("closePopup1");
const addItemForm = document.getElementById("addItemForm");
const itemTableBody = document.getElementById("itemTableBody");

addItemBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'flex';
});

closePopupButton.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
});

addItemForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const code = document.getElementById("itemCode").value;
    const product = document.getElementById("productName").value;
    const buyingPrice = document.getElementById("buyingPrice").value;
    const quantity = document.getElementById("quantity").value;
    const brand = document.getElementById("brand").value;
    const sellingPrice = document.getElementById("sellingPrice").value;
    const expireDate = document.getElementById("expireDate").value;
    const availability = document.getElementById("availability").value;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${code}</td>
        <td>${product}</td>
        <td>${buyingPrice}</td>
        <td>${quantity}</td>
        <td>${brand}</td>
        <td>${sellingPrice}</td>
        <td>${expireDate}</td>
        <td>${availability}</td>
    `;

    itemTableBody.appendChild(newRow);

    alert(`Item Added: Code - ${code}, Product - ${product}, Buying Price - ${buyingPrice}, Quantity - ${quantity}, Brand - ${brand}, Selling Price - ${sellingPrice}, Expiry Date - ${expireDate}, Availability - ${availability}`);

    popupOverlay.style.display = "none";
    addItemForm.reset();
});

document.addEventListener("DOMContentLoaded", function () {
    function generateItemId() {
        const prefix = "C00-";
        let lastId = localStorage.getItem('ItemIdCounter') || '000';
        let newIdNumber = (parseInt(lastId, 10) + 1).toString().padStart(3, '0');
        localStorage.setItem('ItemIdCounter', newIdNumber);
        return `${prefix}${newIdNumber}`;
    }

    const customerIdField = document.getElementById('itemCode');
    customerIdField.value = generateItemId();
});
