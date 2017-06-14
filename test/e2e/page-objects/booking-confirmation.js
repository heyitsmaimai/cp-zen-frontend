const BasePage = require('./base-page');

const BookingConfirmation = Object.create(BasePage, {
  firstName: {
    get() {
      return $('.cd-booking-confirmation__first-name');
    },
  },
  lastName: {
    get() {
      return $('.cd-booking-confirmation__last-name');
    },
  },
  phoneNumber: {
    get() {
      return $('.cd-booking-confirmation__phone-number');
    },
  },
  email: {
    get() {
      return $('.cd-booking-confirmation__email');
    },
  },
  accountCreationConfirmation: {
    get() {
      return $('.cd-booking-confirmation__account-creation-confirmation');
    },
  },
  bookingConfirmationMessage: {
    get() {
      return $('.cd-booking-confirmation__booking-confirmation');
    },
  },
});

module.exports = BookingConfirmation;
