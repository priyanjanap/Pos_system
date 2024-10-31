
console.log("Order.js script is loaded and running");
import { customers } from "../db/db.js";
import { inventories } from "../db/db.js";
import { orderItems } from "../db/db.js";
import { orders } from "../db/db.js";
//import OrderModel from "../model/OrderModel";


// import OrderModel from "../model/OrderModel.js";
// import OrderDetailsModel from "../model/OrderDetailsModel";
// import { OrderItemTableList } from "../model/tm/OrderItemTableList";

const orderSummaryData = {
    totalOrders: 5,
    totalProducts: 25,
    totalAmount: 500.00,
    totalCustomer: 20
};

$(document).ready(function () {
    $("#addOrderButton").on('click', () => {
        $("#placeOrderModel").modal('show');
        setCustomerIds();
        setItemCodes();
        console.log("LOG ORDER PAGE");

        $("#customerDrpBtn").text("Select Customer Id");
        clearItemFields();
        $("#CustomerNameOrder").val("");
        $("#CustomerAddressOrder").val("");
        $("#itemQtygetting").removeClass('is-valid is-invalid');
        generateOrderId();
    });
});

updateOrderSummary();
//loadOrderDataFromDataBase();


function updateOrderSummary() {
    document.getElementById("totalOrders").textContent = orderSummaryData.totalOrders;
    document.getElementById("totalProducts").textContent = orderSummaryData.totalProducts;
    document.getElementById("totalCustomer").textContent = orderSummaryData.totalCustomer; // Corrected from totalProducts
    document.getElementById("totalAmount").textContent = `$${orderSummaryData.totalAmount.toFixed(2)}`;
}

class OrderModel {
    get order_Id() {
        return this._order_Id;
    }

    set order_Id(value) {
        this._order_Id = value;
    }

    get customer_Id() {
        return this._customer_Id;
    }

    set customer_Id(value) {
        this._customer_Id = value;
    }

    get customer_name() {
        return this._customer_name;
    }

    set customer_name(value) {
        this._customer_name = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
    constructor(order_Id, customer_Id, customer_name, date, amount, type) {

        this._order_Id = order_Id;
        this._customer_Id = customer_Id;
        this._customer_name = customer_name;
        this._date = date;
        this._amount = amount;
        this._type = type;
    }

}

// function loadOrderDataFromDataBase() {
//     const http = new XMLHttpRequest();
//     http.onreadystatechange = () => {
//         if (http.readyState === 4) {
//             if (http.status === 200) {
//                 const data = JSON.parse(http.responseText);
//                 console.log("Loader Data");
//                 data.forEach(item => {
//                     new OrderModel(item.order_Id, item.customer_Id, item.customer_name, item.date, item.amount, item.type);
//                 });
//                 loadOrderTable();
//             } else {
//                 console.error("Failed to load orders:", http.status);
//             }
//         } else {
//             console.log("Processing stage:", http.readyState);
//         }
//     };
//     http.open("GET", "http://localhost:8080/inventory/order", true);
//     http.setRequestHeader("Content-Type", "application/json");
//     http.send();
// }

let generatedOrderId;
let orderItemTableArray = [];
let netTotal = 0;

function clearItemFields() {
    $("#itemDropbtn").text("Select Item Code");
    $("#ItemName").val("");
    $("#ItemPrice").val("");
    $("#ItemQtyOnHand").val("");
}

function setCustomerIds() {
    $("#customerIdsDropDown").empty();
    customers.forEach(customer => {
        $("#customerIdsDropDown").append(`<li><a class="dropdown-item" href="#">${customer.id}</a></li>`);
        console.log(customer.id)
    });
}

function setItemCodes() {
    $("#itemorderDrop").empty();
    inventories.forEach(item => {
        $("#itemorderDrop").append(`<li><a class="dropdown-item" href="#">${item.iCode}</a></li>`);
    });
}

$("#itemorderDrop").on('click', 'li', function () {
    let itemCode = $(this).text();
    $("#itemDropbtn").text(itemCode);

    inventories.forEach(item => {
        if (itemCode === item.iCode) {
            $("#ItemName").val(item.iName);
            $("#ItemPrice").val(item.iSelPrice);
            $("#ItemQtyOnHand").val(item.iQty);
        }
    });
    $("#itemQtygetting").focus();
});

$("#customerIdsDropDown").on('click', 'li', function () {
    let custId = $(this).text();
    $("#customerDrpBtn").text(custId);

    customers.forEach(customer => {
        if (custId === customer.id) {
            $("#CustomerNameOrder").val(customer.customerName);
            $("#CustomerAddressOrder").val(customer.address);
        }
    });
});

$("#itemQtygetting").on('keyup', () => {
    let getQTY = $("#itemQtygetting").val();
    let onHnd = $("#ItemQtyOnHand").val();

    if (+onHnd < +getQTY) {
        $("#itemQtygetting").addClass('is-invalid').removeClass('is-valid');
    } else {
        $("#itemQtygetting").addClass('is-valid').removeClass('is-invalid');
    }
});

function generateOrderId() {
    generatedOrderId = orders.length > 0 ? orders[orders.length - 1].orderId + 1 : 1;
    console.log("Generated Order ID:", generatedOrderId);
}

class OrderItemTableList {
    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }

    get itemQTYGET() {
        return this._itemQTYGET;
    }

    set itemQTYGET(value) {
        this._itemQTYGET = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
    constructor(itemCode, itemName, itemPrice, itemQTYGET, total) {

        this._itemCode = itemCode;
        this._itemName = itemName;
        this._itemPrice = itemPrice;
        this._itemQTYGET = itemQTYGET;
        this._total = total;
    }

}

class OrderDetailsModel {
    get generatedOrderId() {
        return this._generatedOrderId;
    }

    set generatedOrderId(value) {
        this._generatedOrderId = value;
    }

    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }
    constructor(generatedOrderId, itemCode) {

        this._generatedOrderId = generatedOrderId;
        this._itemCode = itemCode;
    }

}

$("#btnAddcart").on('click', function () {
    let itemCode = $("#itemDropbtn").text();
    let itemName = $("#ItemName").val();
    let itemPrice = $("#ItemPrice").val();
    let itemQTYGET = $("#itemQtygetting").val();

    let total = +itemPrice * +itemQTYGET;
    netTotal += total;
    settingNetTotal();

    orderItemTableArray.push(new OrderItemTableList(itemCode, itemName, itemPrice, itemQTYGET, total));
    orderItems.push(new OrderDetailsModel(generatedOrderId, itemCode));
    loadTablePlaceOrder();

    $("#itemQtygetting").val("");
    clearItemFields();
});

function loadTablePlaceOrder() {
    $("#placeOrderTable").empty();
    orderItemTableArray.forEach(orderItem => {
        $("#placeOrderTable").append(`<tr>
            <td>${orderItem.itemCode}</td>
            <td>${orderItem.itemName}</td>
            <td>${orderItem.itemPrice}</td>
            <td>${orderItem.itemQTYGET}</td>
            <td>${orderItem. total}</td>
            <td><input type="button" value="Delete"></td>
        </tr>`);
    });
}

function settingNetTotal() {
    $("#orderTotal").val(netTotal);
    $("#netPay").val(netTotal);
}

$("#discountValue").on('keyup', () => {
    let discount = $("#discountValue").val();
    let discountAmount = netTotal * (discount / 100);
    $("#netPay").val(netTotal - discountAmount);
});

$("#placeOrderEndingBtn").on('click', function () {
    let custId = $('#customerDrpBtn').text();
    let cusN = $("#CustomerNameOrder").val();
    let number = new Date();
    let netP = $("#netPay").val();

    let orderModel = new OrderModel(generatedOrderId, custId, cusN, `${number.getUTCFullYear()}/${number.getMonth() + 1}/${number.getDate()}`, netP);
    orders.push(orderModel);

    var modal = bootstrap.Modal.getInstance($("#placeOrderModel")[0]);
    modal.hide();
    loadOrderTable();
    $("#placeOrderTable").empty();

    const OrderDTO = {
        id: generatedOrderId,
        customer_id: custId,
        customer_name: cusN,
        date: number,
        amount: netP,
        type: "cash"
    };

    console.log("Order DTO", OrderDTO);

    const http = new XMLHttpRequest();
    const list = orderItems.map(item => ({
        order_id: generatedOrderId,
        item_id: item.orderDetailItemCode
    }));

    const JsonOBJ = new FormData();
    JsonOBJ.append("obj1", JSON.stringify(OrderDTO));
    JsonOBJ.append("obj2", JSON.stringify(list));

    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 200) {
                alert("Order Placed!");
            } else {
                console.error("Order placement failed:", http.status);
            }
        } else {
            console.log("Processing stage:", http.readyState);
        }
    };

    http.open("POST", "http://localhost:8080/inventory/transaction", true);
    http.send(JsonOBJ);
});

function loadOrderTable() {
    $("#orderTableBody").empty();
    orders.forEach(order => {
        $("#orderTableBody").append(`<tr>
            <td>${order.order_Id}</td>
            <td>${order.customer_Id}</td>
            <td>${order.customer_name}</td>
            <td>${order.date}</td>
            <td>${order.amount}</td>
            <td>Cash</td>
            <td><input type="button" value="Delete"></td>
        </tr>`);
    });
}
