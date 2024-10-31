export default class CustomerModel{
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get customerName() {
        return this._customerName;
    }

    set customerName(value) {
        this._customerName = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get dateAdded() {
        return this._dateAdded;
    }

    set dateAdded(value) {
        this._dateAdded = value;
    }
    constructor(id, customerName, address, contact, email) {
        this._dateAdded = new Date().toLocaleDateString();
        this._id = id;
        this._customerName = customerName;
        this._address = address;
        this._contact = contact;
        this._email = email;
    }
}

