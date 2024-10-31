import InventoryModel from "../model/InventoryModel.js";
import {customers, inventories} from "../db/db.js";



// addItemForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//
//     const code = document.getElementById("itemCode").value;
//     const product = document.getElementById("productName").value;
//     const buyingPrice = document.getElementById("buyingPrice").value;
//     const quantity = document.getElementById("quantity").value;
//     const brand = document.getElementById("brand").value;
//     const sellingPrice = document.getElementById("sellingPrice").value;
//     const expireDate = document.getElementById("expireDate").value;
//     const availability = document.getElementById("availability").value;
//
//     const newRow = document.createElement("tr");
//     newRow.innerHTML = `
//         <td>${code}</td>
//         <td>${product}</td>
//         <td>${buyingPrice}</td>
//         <td>${quantity}</td>
//         <td>${brand}</td>
//         <td>${sellingPrice}</td>
//         <td>${expireDate}</td>
//         <td>${availability}</td>
//     `;
//
//     itemTableBody.appendChild(newRow);
//
//     alert(`Item Added: Code - ${code}, Product - ${product}, Buying Price - ${buyingPrice}, Quantity - ${quantity}, Brand - ${brand}, Selling Price - ${sellingPrice}, Expiry Date - ${expireDate}, Availability - ${availability}`);
//
//     popupOverlay.style.display = "none";
//     addItemForm.reset();
// });
//
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
$("#add-item-btn").on('click', function () {
    $("#popupOverlay1").show();
    $("#closeItemBtn").text("Close");
    $("#closeItemBtn").css({
        background: "gray"
    });
    $("#itemHeader").text("Add Item");
    $("#addItem").text("Save Changes");
    $("#addItem").css({
        background:"green"
    });
    removeValidation();
});

$("#closeItemBtn").on('click', function () {
    let text = $("#closeItemBtn").text();
    $("#popupOverlay1").hide();
    console.log("close");
});

loadDatafromdatabase();

function loadDatafromdatabase(){
    const http = new XMLHttpRequest();
    console.log("Ready")
    http.onreadystatechange= ()=>{
        if(http.readyState == 4){
            if(http.status == 200){
                const data = JSON.parse(http.responseText);
                console.log(data)
                data.forEach(item => {
                    inventories.push(new InventoryModel(item.id,item.product_name,item.buy_price,item.qty,item.brand,item.sel_price,item.expire_date));
                });
                loadInventoryTable();
            }else{
                console.log("stage ",http.readyState);
                console.log("status ", http.status)
            }
        }else{
            console.log("Processing stage ",http.readyState)
        }
    }

    http.open("GET","http://localhost:8080/inventory/item",true);
    http.setRequestHeader("Content-Type","application/json");
    http.send();
}
$("#addItem").on('click',()=>{

    let text = $("#inventorySavebtn").text();
    if (text == "Update"){
        console.log("Update")
        inventories[index].productName = $("#productName").val();
        inventories[index].buyingPrice = $("#buyingPrice").val();
        inventories[index].sellingPrice = $("#sellingPrice").val();
        inventories[index].qty = $("#quantity").val();
        inventories[index].brand = $("#brand").val();
        inventories[index].expireDate = $("#expireDate").val();
        loadInventoryTable();
        const ItemDto = {
            "id":$("#itemCode").val(),
            "product_name" : $("#productName").val(),
            "buy_price": $("#buyingPrice").val(),
            "sel_price" : $("#sellingPrice").val(),
            "expire_date" : $("#expireDate").val(),
            "qty" : $("#quantity").val(),
            "brand" : $("#brand").val()
        }

        const ItemDtoJson = JSON.stringify(ItemDto);

        const http = new XMLHttpRequest();

        http.onreadystatechange = () =>{
            if(http.readyState == 4){
                if(http.status == 200){
                    alert("Item Updated!!!");
                }else{
                    console.log("Status ",http.status);
                }
            }else{
                console.log("Processing stage ",http.readyState)
            }
        }

        http.open("PUT", "http://localhost:8080/inventory/item", true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(ItemDtoJson);


        let popup=$("#popupOverlay1");
        popup.hide();

    }else {
        let id = $("#itemCode").val();
        let productName = $("#productName").val();
        let buyPrice = $("#buyingPrice").val();
        let exDate = $("#expireDate").val();
        let selPrice = $("#sellingPrice").val();
        let qty = $("#quantity").val();
        let brand = $("#brand").val();

        const ItemDto = {
            "id":0,
            "product_name" : productName,
            "buy_price": buyPrice,
            "sel_price" : selPrice,
            "expire_date" : exDate,
            "qty" : qty,
            "brand" : brand
        }

        const ItemDtoJson = JSON.stringify(ItemDto);

        const http = new XMLHttpRequest();

        http.onreadystatechange = () =>{
            if(http.readyState == 4){
                if(http.status == 200){
                    alert("Item Saved!!!")
                }else{
                    console.log("Status ",http.status);
                }
            }else{
                console.log("Processing stage ",http.readyState)
            }
        }

        http.open("POST", "http://localhost:8080/inventory/item", true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(ItemDtoJson);

        let item = new InventoryModel(id,productName, buyPrice,qty,brand, selPrice, exDate);
        inventories.push(item);
        loadInventoryTable();

        clearFileds();

        let popup=$("#popupOverlay1");
        popup.hide();
    }
});



function loadInventoryTable(){
    $("#itemTableBody").empty();

    inventories.map(function (item) {
        var value =
            ` <tr>
                <td >${item.iCode}</td>
                <td  >${item.iName}</td>
                <td >${item.iBuyPrice}</td>
                <td >${item.iQty}</td>
                <td >${item.iBrand}</td>
                <td >${item.iSelPrice}</td>
                <td >${item.iEXDate}</td>
                <td>"In Stock"</td>
            </tr>`

        $("#itemTableBody").append(value);
    });
}
function clearFileds() {
    $("#itemCode").val("");
    $("#productName").val("");
    $("#buyingPrice").val("");
    $("#expireDate").val("");
    $("#sellingPrice").val("");
    $("#quantity").val("");
    $("#brand").val("");
}

let index;

$(document).ready(function () {
    let currentRow = null;
    let isUpdateMode = false;


    $("#itemTableBody").on('click', 'td', function () {


        currentRow = $(this).closest('tr');
        isUpdateMode = true;


        let iid =currentRow.find('td').eq(0).text();
        let iname = currentRow.find('td').eq(1).text();
        let ibuyPrice = currentRow.find('td').eq(2).text();
        let iqty =currentRow.find('td').eq(3).text();
        let ibrand = currentRow.find('td').eq(4).text();
        let iselPrice = currentRow.find('td').eq(5).text();
        let iexDate = currentRow.find('td').eq(6).text();

        index = $(this).index();
        console.log(iexDate)

        $("#itemCode").val(iid);
        $("#productName").val(iname);
        $("#buyingPrice").val(ibuyPrice);
        $("#expireDate").val(iexDate);
        $("#sellingPrice").val(iselPrice);
        $("#quantity").val(iqty);
        $("#brand").val(ibrand);


        $("#popupOverlay1").show();


        $("#closeItemBtn").text("Delete")
        $("#closeItemBtn").css({
            background: "red"
        })
        $('#closeItemBtn').on('click', function () {
            if (currentRow) {
                currentRow.remove();
                resetForm();
            }
        });
        $("#itemHeader").text("Update Item")
        $("#addItem").text("Update")
        $("#addItem").css({
            background: 'green'
        })

        removeValidation()
    });

    $('#addItem').on('click', function () {
        const itemId = $('#itemCode').val();
        const name = $('#productName').val();
        const buyingPrice = $('#buyingPrice').val();
        const qty = $('#quantity').val();
        const brand = $('#brand').val();

        const selingPrice = $('#sellingPrice').val();
        const expDate = $('#expireDate').val();


        if (isUpdateMode && currentRow) {
            currentRow.find('td').eq(0).text(itemId);
            currentRow.find('td').eq(1).text(name);
            currentRow.find('td').eq(2).text(buyingPrice);
            currentRow.find('td').eq(3).text(qty);
            currentRow.find('td').eq(4).text(brand);
            currentRow.find('td').eq(5).text(selingPrice);
            currentRow.find('td').eq(6).text(expDate);

            isUpdateMode = false;
            currentRow = null;
        } else {
            const newRow = `
                <tr>
                    <td>${itemId}</td>
                    <td>${name}</td>
                    <td>${buyingPrice}</td>
                    <td>${qty}</td>
                                        <td>${brand}</td>

                    <td>${selingPrice}</td>
                    <td>${expDate}</td>
                    <td></td>
                </tr>
            `;
            $('#itemTableBody').append(newRow);
        }

        $('#popupOverlay1').css('display', 'none');
        resetForm();
    });

    function resetForm() {
        $('#addItemForm')[0].reset();
        $("#addItem").text("Save");
        $("#itemHeader").text("Add Customer");
        $("#closeItemBtn").text("Close").css({background: ""});
        isUpdateMode = false;
        currentRow = null;
        removeValidation();
    }
});


function removeValidation() {
    $("#itemCode").removeClass('is-invalid');

    $("#itemCode").removeClass('is-valid');
}


$("#itemCode").on('keyup',()=>{
    const regex = /^I\d{2}-\d{3}$/;
    let val = $("#itemCode").val();
    if (regex.test(val)){
        $("#itemCode").addClass('is-valid');
        $("#itemCode").removeClass('is-invalid');
    }else {
        $("#itemCode").addClass('is-invalid');
        $("#itemCode").removeClass('is-valid');
    }
})
