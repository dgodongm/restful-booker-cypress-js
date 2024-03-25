import bookings_generator from "../utils/bookings_generator";
import bookings_wrapper from "../utils/bookings_wrapper";
import bookings_helpers from "../utils/bookings_helpers";

describe("Get Bookings spec", () => {
  const sampleFName = bookings_generator.generate_firstname();
  const sampleLName = bookings_generator.generate_lastname();
  const sampleCheckin = new Date();
  const sampleCheckinStr = "2025-06-07"; // bookings_helpers.convertToBookingDateString(sampleCheckin);
  const sampleCheckout = new Date();
  const sampleCheckoutStr = "2024-06-17"; // bookings_helpers.convertToBookingDateString(sampleCheckout);
  let newbooking;
  let checkinMinus1Str;

  before(() => {
    newbooking = bookings_generator.generate_booking();
    newbooking.firstname = sampleFName;
    newbooking.lastname = sampleLName;
    let checkinMinus1 = new Date(newbooking.bookingdates.checkin);
    checkinMinus1.setDate(checkinMinus1.getDate() - 1);
    checkinMinus1Str =
      bookings_helpers.convertToBookingDateString(checkinMinus1);
    cy.log("checkinMinus1Str: " + checkinMinus1Str);
    // newbooking.bookingdates.checkin = sampleCheckinStr;
    // newbooking.bookingdates.checkout = sampleCheckoutStr;
    bookings_wrapper.create_booking(newbooking);
  });

  it("Get All Bookings", () => {
    bookings_wrapper.get_all_bookings().then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.lengthOf.above(0);
    });
  });

  it("Get Booking by First Name", () => {
    bookings_wrapper
      .get_booking_by({ firstname: sampleFName })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf.above(0);
      });
  });

  it("Get Booking by Last Name", () => {
    bookings_wrapper
      .get_booking_by({ lastname: sampleLName })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf.above(0);
      });
  });

  it("Get Booking by First and Last Name", () => {
    bookings_wrapper
      .get_booking_by({ firstname: sampleFName, lastname: sampleLName })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf.above(0);
      });
  });

  it("Get Booking by Checkin", () => {
    bookings_wrapper
      .get_booking_by({ checkin: newbooking.bookingdates.checkin })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf.above(0);
      });
  });

  it("Get Booking by Checkout", () => {
    bookings_wrapper
      .get_booking_by({ checkout: newbooking.bookingdates.checkout })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf.above(0);
      });
  });

  it("Get Booking by Non existent First Name should get empty response", () => {
    bookings_wrapper
      .get_booking_by({ firstname: "non_existent_name" })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.lengthOf(0);
      });
  });
});
