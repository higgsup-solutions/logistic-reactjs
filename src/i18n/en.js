import React from "react";

export const ENGLISH = {
    lang: "en",
    messages: {

        // Common
        "carrier": "Carrier",
        "search": "Search",
        "clear": "Clear",
        "view": "View",
        "track": "Track",
        "close": "Close",
        "login": "Login",
        "register": "Register",
        "email": "Email address",
        "password": "Password",
        "emptyData": "No data available",
        "cancel": "Cancel",
        "confirm": "Confirm",
        "booking": "Booking",
        "save": "Save",
        "reset": "Reset",
        "add": "Add",
        "edit": "Edit",
        "delete": "Delete",

        // Menu
        "menu.login": "Login",
        "menu.register": "Register",
        "menu.booking": "Booking",
        "menu.addressBook": "Address Book",
        "menu.bookingHistory": "Booking History",
        "menu.setting": "Setting",
        "base.user": "Username",
        "base.pass": "Password",
        "menu.supplies": "Supplies",
        "menu.invoices": "Invoices",
        "menu.help": "Help",

        // Login
        "login.validation.email.required": "Email address is required",
        "login.validation.email.invalid": "Email address is invalid",
        "login.validation.password.required": "Password is required",
        "login.rememberMe": "Remember me",
        "login.forgotPassword": "Lost your password?",

        // Register
        "register.validation.email.required": "Email address is required",
        "register.validation.email.invalid": "Email address is invalid",
        "register.validation.password.required": "Password is required",

        // Booking
        "booking.senderAddress": "Sender Address",
        "booking.company": "Company",
        "booking.phone": "Phone",
        "booking.contactName": "Contact Name",
        "booking.emailAddress": "Email Address",
        "booking.country": "Country",
        "booking.selectOneCountry": "Select One Country",
        "booking.selectOneCarrier": "Select One Carrier",
        "booking.selectOnePackage": "Select One Package",
        "booking.selectOneService": "Select One Service",
        "booking.selectOneDimension": "Select One Dimension",
        "booking.address": "Address",
        "booking.address2": "Address2",
        "booking.saveToAddressBook": "Save To Address Book",
        "booking.city": "City",
        "booking.postalCode": "Postal Code",
        "booking.stateProvince": "State Province",
        "booking.recipientAddress": "Recipient Information",
        "booking.chooseOneShippingDate": "Choose One Shipping Date",
        "booking.carrier": "Carrier",
        "booking.serviceType": "Service Type",
        "booking.packageType": "Package Type",
        "booking.shippingDate": "Shipping Date",
        "booking.contents": "Contents",
        "booking.packageShipment": "Package and Shipment Details",
        "booking.continueBooking": "Continue Booking",
        "booking.quote": "Quote",
        "booking.addPiece": "Add Piece",

        //Quote Popup
        "quote.baseCharge": "Base Charge",
        "quote.fuelSurcharge": "Fuel Surcharge",
        "quote.totalWeight": "Total Weight",
        "quote.weightType": "Weight Type",
        "quote.totalCharge": "Total Charge",
        "quote.messageFoot": "Quote is an estimate. Additional fees may apply.",

        // Booking History
        "history.history": "History",
        "history.contactNameSender": "Contact Name Sender",
        "history.tracking": "Tracking",
        "history.pieces": "Pieces",
        "history.weight": "Weight",
        "history.quoted": "Quoted",
        "history.destCountry": "Dest. Country",
        "history.shipDate": "Ship Date",
        "history.empty": "Have no history",

        // Shipment Detail - alias = 'sd'
        "sd.shipmentDetail": "Shipment Detail",
        "sd.serviceType": "Service Type",
        "sd.shipmentDate": "Shipment Date",
        "sd.packageType": "Package Type",
        "sd.tracking": "Tracking#",
        "sd.contentType": "Content Type",
        "sd.actualWeight": "Actual Weight",
        "sd.packageInfo": "Package Information",
        "sd.piece": "Piece",
        "sd.cubicWeight": "Cubic Weight",
        "sd.dimension": "Dimension",
        "sd.shipperAddress": "Shipper Address",
        "sd.receiverAddress": "Receiver Address",
        "sd.quoteDetail": "Quote Detail",
        "sd.baseCharge": "Base Charge",
        "sd.fuelSurcharge": "Fuel Surcharge",
        "sd.gst": "GST",
        "sd.totalCharge": "Total Charge",
        "sd.quoteDetail.alert": "Quote is an estimate. Additional Fees may apply.",

        // Address Book - alias = 'ab'
        "ab.contactName": "Contact",
        "ab.company": "Company",
        "ab.address1": "Address#",
        "ab.address2": "Address 2",
        "ab.cityName": "City",
        "ab.stateProvince": "State/Province",
        "ab.postalCode": "Postal Code",
        "ab.countryName": "Country",
        "ab.phoneNumber": "Phone",
        "ab.email": "Email",
        "ab.title": "Address Book",
        "ab.searchInput.placeHolder": "Search address book...",
        "ab.addEdit.validation.contactName.required": "Contact name is required",
        "ab.addEdit.validation.address.required": "Address is required",
        "ab.addEdit.validation.country.required": "Country is required",
        "ab.addEdit.validation.phoneNumber.required": "Phone number is required",
        "ab.addEdit.validation.phoneNumber.invalid": "Invalid phone number",
        "ab.addEdit.validation.email.invalid": "Invalid phone number",
        "ab.addEdit.validation.city.required": "City is required",
        "ab.add.title": "Add Address",
        "ab.edit.title": "Edit Address",
        "ab.remove.title": "Delete address",
        "ab.remove.confirm": "Are you sure to delete address of",

        // Confirm Booking page - alias = 'confirm'
        "confirm.title": "Shipment",
        "confirm.carrierName": "Carrier Name",
        "confirm.weight": "Weight",
        "confirm.moreDetails": "More Details",
        "confirm.quoteDetails": "Quote Details",
        "confirm.sender.address": "Sender Address",
        "confirm.receiver.address": "Receiver Address",
        "confirm.bookingSuccess": "Booking success!",

        // Settings
        "settings.title": "Settings",
        "settings.tab.userSettings": "User Settings",
        "settings.tab.addressDefault": "Address Default",
        "settings.tab.changePassword": "Change Password",
        "settings.tab.dimensions": "Dimensions",
        //      // User Information
        "settings.info.title": "User Information",
        "settings.info.firstName": "First Name",
        "settings.info.lastName": "Last Name",
        "settings.info.phone": "Phone",
        "settings.info.email": "Email",
        "settings.info.country": "Country",
        "settings.info.city": "City",
        "settings.info.address": "Address",
        "settings.info.updateSuccess": "User Information is updated successfully",
        //      // Default Address
        "settings.defaultAddress.from": "Default From Address",
        "settings.defaultAddress.to": "Default To Address",
        "settings.defaultAddress.findCompany": "Find By Company",
        "settings.defaultAddress.findContact": "Find By Contact",
        //      // Change Password
        "settings.changePass.title": "Password",
        "settings.changePass.note": "Note",
        "settings.changePass.noteDes": "- Password should contain minimum 8 characters, with at least one letter and one number.",
        "settings.changePass.oldPass": "Old Password",
        "settings.changePass.newPass": "New Password",
        "settings.changePass.confirmPass": "Confirm Password",
        "settings.changePass.error.isRequire": " is required",
        "settings.changePass.error.isNotMatch": " is not matched to ",
        "settings.changePass.changePassSuccess": "Change Password successfully!",
        //      // Dimensions
        "settings.dimensions.deleteSuccess": "Delete Dimension successfully!",
        "settings.dimensions.addSuccess": "Add Dimension successfully!",
        "settings.dimensions.editSuccess": "Edit Dimension successfully!",
        "settings.dimensions.editDimension": "Edit Dimension",
        "settings.dimensions.addDimension": "Add Dimension",
        "settings.dimensions.name": "Name",
        "settings.dimensions.lengthDenote": "L",
        "settings.dimensions.widthDenote": "W",
        "settings.dimensions.heightDenote": "H",
        "settings.dimensions.comment": "Comment",

        // Error message
        "error.VALIDATION": "Validation fail!",
        "error.GLOBAL": "Have an error in the system!",
        "error.AUTHENTICATION": "Authentication fail!",
        "error.JWT_TOKEN_EXPIRED": "Session expired, please login again!",
        "error.DUPPLICATE_EMAIL": "Email is used by another one!",
        "error.DUPPLICATE_USERNAME": "Username is exited!",
        "error.DUPPLICATE_ADDRESS": "Address is existed!",
        "error.USER_NOT_FOUND": "User not found!",
        "error.OLD_PASSWORD_OR_NEW_PASSWORD_INVALID": "Old password or new password is invalid!",
        "error.DIMENSION_IS_EMPTY": "Dimension is empty!",
        "error.CARRIER_NOT_FOUND": "Carrier not found!",
        "error.JWT_TOKEN_INVALID": "Token invalid!"
    }
};
