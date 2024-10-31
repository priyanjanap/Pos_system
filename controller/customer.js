import CustomerModel from "../model/CustomerModel.js";
import {customers} from "../db/db.js";

$(document).ready(function () {
    $("#btn").on('click', function () {
        $("#popupOverlay").show();
        $("#closePopup").text("Close");
        $("#closePopup").css({
            background: "gray"
        });
        $("#ADDCUSTOMER").text("Add Customer");
        $("#customerSaveBtn").text("Save Changes");
        $("#customerSaveBtn").css({
            background: "green"
        });
    });

    $("#closePopup").on('click', function () {
        let text = $("#closePopup").text();
        $("#popupOverlay").hide();
        console.log("close");
    });
    loadCustomerDataFromDataBase();

});

function loadCustomerDataFromDataBase() {
    const http = new XMLHttpRequest();
    console.log("Ready")
    http.onreadystatechange = () => {
        if (http.readyState == 4) {
            if (http.status == 200) {
                const data = JSON.parse(http.responseText);
                console.log(data)
                data.forEach(item => {
                    customers.push(new CustomerModel(item.customerId, item.customerName, item.address, item.contact, item.email));
                    console.log(item.customerName);
                    console.log(customers)
                });
                loadCustomerTable();
            } else {
                console.log("stage ", http.readyState);
                console.log("status ", http.status)
            }
        } else {
            console.log("Processing stage ", http.readyState)
        }
    }

    http.open("GET", "http://localhost:8080/inventory/customers", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();

}

let index;

function clearFileds() {
    $("#customerName").val("");
    $("#contactNumber").val("");
    $("#customerAddress").val("");
    $("#customerEmail").val("");
    $("#customerId").val("");
}

$("#customerSaveBtn").on('click', () => {

    let text = $("#customerSaveBtn").text();
    if (text == "Update") {
        console.log("Update")
        customers[index].contact = $("#contactNumber").val();
        customers[index].name = $("#customerName").val();
        customers[index].address = $("#customerAddress").val();
        customers[index].email = $("#customerEmail").val();
        console.log(name);
        loadCustomerTable();
        const CustomerDto = {
            "id": $("#customerId").val(), "name": $("#customerName").val(),

            "address": $("#customerAddress").val(), "contact": $("#contactNumber").val(),

            "email": $("#customerEmail").val(),

        }

        const CustomerDtoJson = JSON.stringify(CustomerDto);

        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                if (http.status == 200) {
                    alert("Customer Updated!!!");
                } else {
                    console.log("Status ", http.status);
                }
            } else {
                console.log("Processing stage ", http.readyState)
            }
        }

        http.open("PUT", "http://localhost:8080/inventory/customers", true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(CustomerDtoJson);


        let popup = $("#popupOverlay");
        popup.hide();

    } else {
        let id = $("#customerId").val();
        let number = $("#contactNumber").val();
        let Name = $("#customerName").val();
        let address = $("#customerAddress").val();
        let email = $("#customerEmail").val();

        console.log(Name);
        console.log(id);
        const CustomerDto = {
            "id": id, "Name": Name, "address": address, "number": number,

            "email": email


        }
        console.log(CustomerDto)
        const CustomerDtoJson = JSON.stringify(CustomerDto);

        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                if (http.status == 200) {
                    alert("cusomer Saved!!!")
                    console.log("customerSaved")
                } else {
                    console.log("Status ", http.status);
                }
            } else {
                console.log("Processing stage ", http.readyState)
            }
        }

        http.open("POST", "http://localhost:8080/inventory/customers", true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(CustomerDtoJson);

        let customer = new CustomerModel(id, Name, address, number, email)
        customers.push(customer);
        console.log(id);
        console.log(customer);

        loadCustomerTable();

        clearFileds();

        let popup = $("#popupOverlay");
        popup.hide();
    }
});


function loadCustomerTable() {
    $("#customerTbody").empty();

    customers.map(function (customer) {

        let id = $("#customerId").val();
        var value = ` <tr>
                <td >${customer.id}</td>
                <td  >${customer.customerName}</td>
                <td >${customer.address}</td>
                <td >${customer.contact}</td>
                <td >${customer.email}</td>
                <td >${new Date().toLocaleDateString()}</td>

            </tr>`

        $("#customerTbody").append(value);
        console.log(customer.customerId);
    });

}

$(document).ready(function () {
    let currentRow = null;
    let isUpdateMode = false;

    $('#customerTbody').on('click', 'td', function () {
        currentRow = $(this).closest('tr');
        isUpdateMode = true;

        let id = currentRow.find('td').eq(0).text();
        let name = currentRow.find('td').eq(1).text();
        let address = currentRow.find('td').eq(2).text();
        let contact = currentRow.find('td').eq(3).text();
        let email = currentRow.find('td').eq(4).text();

        $("#customerId").val(id);
        $("#customerName").val(name);
        $("#customerAddress").val(address);
        $("#contactNumber").val(contact);
        $("#customerEmail").val(email);

        $("#customerSaveBtn").text("Update");
        $("#ADDCUSTOMER").text("Update Customer");
        $("#closePopup").text("Delete").css({background: "red"});

        $('#popupOverlay').css('display', 'block');
    });

    $('#closePopup').on('click', function () {
        if (currentRow) {
            currentRow.remove();
            resetForm();
        }
    });

    $('#customerSaveBtn').on('click', function () {
        const customerId = $('#customerId').val();
        const contactNumber = $('#contactNumber').val();
        const customerName = $('#customerName').val();
        const customerAddress = $('#customerAddress').val();
        const customerEmail = $('#customerEmail').val();

        if (isUpdateMode && currentRow) {
            currentRow.find('td').eq(0).text(customerId);
            currentRow.find('td').eq(1).text(customerName);
            currentRow.find('td').eq(2).text(customerAddress);
            currentRow.find('td').eq(3).text(contactNumber);
            currentRow.find('td').eq(4).text(customerEmail);

            isUpdateMode = false;
            currentRow = null;
        } else {
            const newRow = `
                <tr>
                    <td>${customerId}</td>
                    <td>${customerName}</td>
                    <td>${customerAddress}</td>
                    <td>${contactNumber}</td>
                    <td>${customerEmail}</td>
                    <td></td>
                </tr>
            `;
            $('#customerTbody').append(newRow);
        }

        $('#popupOverlay').css('display', 'none');
        resetForm();
    });

    function resetForm() {
        $('#addCustomerForm')[0].reset();
        $("#customerSaveBtn").text("Save");
        $("#ADDCUSTOMER").text("Add Customer");
        $("#closePopup").text("Close").css({background: ""});
        isUpdateMode = false;
        currentRow = null;
        removeValidation();
    }
});


// import CustomerModel from "../model/CustomerModel.js";
// import { customers } from "../db/db.js";
//
// $(document).ready(function () {
//     $("#btn").on('click', function () {
//         $("#popupOverlay").show();
//         $("#closePopup").text("Close").css({ background: "gray" });
//         $("#ADDCUSTOMER").text("Add Customer");
//         $("#customerSaveBtn").text("Save Changes").css({ background: "green" });
//     });
//
//     $("#closePopup").on('click', function () {
//         $("#popupOverlay").hide();
//     });
//
//     loadCustomerDataFromDataBase();
// });
//
// function loadCustomerDataFromDataBase() {
//     const http = new XMLHttpRequest();
//     http.onreadystatechange = () => {
//         if (http.readyState == 4 && http.status == 200) {
//             const data = JSON.parse(http.responseText);
//             customers.length = 0; // Clear any existing data in the array
//             data.forEach(item => {
//                 const customer = new CustomerModel(item.customerId, item.customerName, item.address, item.contact, item.email, item.dateAdded);
//                 customers.push(customer);
//             });
//             console.log("Customers loaded:", customers);
//             loadCustomerTable();
//         }
//     };
//     http.open("GET", "http://localhost:8080/inventory/customer", true);
//     http.setRequestHeader("Content-Type", "application/json");
//     http.send();
// }
//
// // function loadCustomerTable() {
// //     $("#customerTbody").empty();
// //     customers.forEach(customer => {
// //         const row = `
// //             <tr>
// //                 <td>${customer.customerId}</td>
// //                 <td>${customer.customerName}</td>
// //                 <td>${customer.address}</td>
// //                 <td>${customer.contact}</td>
// //                 <td>${customer.email}</td>
// //                 <td>${customer.dateAdded || new Date().toLocaleDateString()}</td>
// //             </tr>
// //         `;
// //         $("#customerTbody").append(row);
// //     });
// //     console.log("Table updated with customers:", customers); // Debug: Log table data
// // }
//
// $("#customerSaveBtn").on('click', function () {
//     const isUpdate = $("#customerSaveBtn").text() === "Update";
//
//     const customerDto = {
//         id: $("#customerId").val(),
//         name: $("#customerName").val(),
//         address: $("#customerAddress").val(),
//         contact: $("#contactNumber").val(),
//         email: $("#customerEmail").val(),
//     };
//
//     const http = new XMLHttpRequest();
//     http.onreadystatechange = () => {
//         if (http.readyState == 4 && http.status == 200) {
//             alert(isUpdate ? "Customer Updated!!!" : "Customer Saved!!!");
//             loadCustomerDataFromDataBase(); // Refresh the table after saving/updating
//             clearFields();
//             $("#popupOverlay").hide();
//         }
//     };
//
//     if (isUpdate) {
//         http.open("PUT", "http://localhost:8080/inventory/customer", true);
//     } else {
//         http.open("POST", "http://localhost:8080/inventory/customer", true);
//         const newCustomer = new CustomerModel(customerDto.id, customerDto.name, customerDto.address, customerDto.contact, customerDto.email, new Date().toLocaleDateString());
//         customers.push(newCustomer);
//         console.log("New customer added:", newCustomer); // Debug: Log new customer data
//     }
//     http.setRequestHeader("Content-Type", "application/json");
//     http.send(JSON.stringify(customerDto));
// });
//
// function clearFields() {
//     $("#customerName").val("");
//     $("#contactNumber").val("");
//     $("#customerAddress").val("");
//     $("#customerEmail").val("");
//     $("#customerId").val("");
// }
//
// function resetForm() {
//     $('#addCustomerForm')[0].reset();
//     $("#customerSaveBtn").text("Save");
//     $("#ADDCUSTOMER").text("Add Customer");
//     $("#closePopup").text("Close").css({ background: "gray" });
//     removeValidation();
// }
//
function removeValidation() {
    $("#customerId, #contactNumber, #customerName, #customerAddress, #customerEmail").removeClass('is-invalid is-valid');
}

document.addEventListener('DOMContentLoaded', function () {
    const customerIdField = document.getElementById('customerId');
    customerIdField.value = generateCustomerId();
});

function generateCustomerId() {
    const prefix = "C00-";
    let lastId = localStorage.getItem('customerIdCounter') || '000';
    let newIdNumber = (parseInt(lastId, 10) + 1).toString().padStart(3, '0');
    localStorage.setItem('customerIdCounter', newIdNumber);
    return `${prefix}${newIdNumber}`;
}

$("#customerId").on('keyup', validateCustomerId);
$("#contactNumber").on('keyup', validateContactNumber);
$("#customerAddress").on('keyup', validateCustomerAddress);
$("#customerName").on('keyup', validateCustomerName);
$("#customerEmail").on('keyup', validateCustomerEmail);

function validateCustomerId() {
    const regex = /^C00-\d{3}$/;
    toggleValidationClass("#customerId", regex.test($("#customerId").val()));
}

function validateContactNumber() {
    const regex = /^\d{10}$/;
    toggleValidationClass("#contactNumber", regex.test($("#contactNumber").val()));
}

function validateCustomerAddress() {
    const regex = /^.{4,}$/;
    toggleValidationClass("#customerAddress", regex.test($("#customerAddress").val()));
}

function validateCustomerName() {
    const regex = /^[a-zA-Z\s]+$/;
    toggleValidationClass("#customerName", regex.test($("#customerName").val()));
}

function validateCustomerEmail() {
    const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    toggleValidationClass("#customerEmail", regex.test($("#customerEmail").val()));
}

function toggleValidationClass(selector, isValid) {
    $(selector).toggleClass('is-valid', isValid);
    $(selector).toggleClass('is-invalid', !isValid);
}
