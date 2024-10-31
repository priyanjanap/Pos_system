export default class OrderModel {
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
