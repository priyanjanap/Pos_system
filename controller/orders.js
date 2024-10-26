// const orderSummaryPopup = document.getElementById("orderSummaryPopup");
// const summaryOrderCode = document.getElementById("summaryOrderCode");
// const summaryProductName = document.getElementById("summaryProductName");
// const summaryQuantity = document.getElementById("summaryQuantity");
// const summaryTotalPrice = document.getElementById("summaryTotalPrice");
// const summaryDeliveryDate = document.getElementById("summaryDeliveryDate");
// const confirmationCheckbox = document.getElementById("confirmationCheckbox");
// const submitOrderBtn = document.getElementById("submitOrderBtn");
//
// const orderData = {
//     code: "ORD12345",
//     product: "Sample Product",
//     quantity: 2,
//     pricePerItem: 50.00,
//     estimatedDelivery: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString() // 5 days from now
// };
//
// function populateOrderSummary() {
//     summaryOrderCode.textContent = orderData.code;
//     summaryProductName.textContent = orderData.product;
//     summaryQuantity.textContent = orderData.quantity;
//     summaryTotalPrice.textContent = `$${(orderData.quantity * orderData.pricePerItem).toFixed(2)}`;
//     summaryDeliveryDate.textContent = orderData.estimatedDelivery;
//     orderSummaryPopup.style.display = 'block';
// }
//
// confirmationCheckbox.addEventListener('change', () => {
//     submitOrderBtn.disabled = !confirmationCheckbox.checked;
// });
//
// function showOrderSummary() {
//     populateOrderSummary();
// }
//
// submitOrderBtn.addEventListener('click', () => {
//     alert("Order has been submitted successfully!");
//     orderSummaryPopup.style.display = 'none';
//     confirmationCheckbox.checked = false;
//     submitOrderBtn.disabled = true;
// });
//
// showOrderSummary();

const orderSummaryData = {
    totalOrders: 5,
    totalProducts: 25,
    totalAmount: 500.00,
    totalCustomer:20
};

function updateOrderSummary() {
    document.getElementById("totalOrders").textContent = orderSummaryData.totalOrders;
    document.getElementById("totalProducts").textContent = orderSummaryData.totalProducts;
    document.getElementById("totalCustomer").textContent = orderSummaryData.totalProducts;
    document.getElementById("totalAmount").textContent = `$${orderSummaryData.totalAmount.toFixed(2)}`;
}

updateOrderSummary();
