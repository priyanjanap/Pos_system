export class OrderItemTableList{


    get OI_ItemCode() {
        return this._OI_ItemCode;
    }

    set OI_ItemCode(value) {
        this._OI_ItemCode = value;
    }

    get OI_ItemName() {
        return this._OI_ItemName;
    }

    set OI_ItemName(value) {
        this._OI_ItemName = value;
    }

    get OI_ItemUnitPrice() {
        return this._OI_ItemUnitPrice;
    }

    set OI_ItemUnitPrice(value) {
        this._OI_ItemUnitPrice = value;
    }

    get OI_ItemQty() {
        return this._OI_ItemQty;
    }

    set OI_ItemQty(value) {
        this._OI_ItemQty = value;
    }

    get OI_ItemAmount() {
        return this._OI_ItemAmount;
    }

    set OI_ItemAmount(value) {
        this._OI_ItemAmount = value;
    }

    constructor(OI_ItemCode, OI_ItemName, OI_ItemUnitPrice, OI_ItemQty, OI_ItemAmount) {

        this._OI_ItemCode = OI_ItemCode;
        this._OI_ItemName = OI_ItemName;
        this._OI_ItemUnitPrice = OI_ItemUnitPrice;
        this._OI_ItemQty = OI_ItemQty;
        this._OI_ItemAmount = OI_ItemAmount;
    }
}