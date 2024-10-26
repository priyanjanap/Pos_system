class Customer {
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
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
    constructor(id, name, address, contact, email) {
        this._dateAdded = new Date().toLocaleDateString();
        this._id = id;
        this._name = name;
        this._address = address;
        this._contact = contact;
        this._email = email;
    }
}

const newCustomer = new Customer(customerId, customerName, customerAddress, contactNumber, customerEmail);
