const SERVER_PREFIX = "http://localhost:8080/PetSociety-war/webresources";

const Api = {
    //view all bookings
    //retrieve the ID of the user and the user object from the web resources
    getAllBookings(status, userId) {
        return fetch(`${SERVER_PREFIX}/bookings/${status}/${userId}`)
    },

    updateBooking(userId, form) {
        return fetch(`${SERVER_PREFIX}/bookings/${form.bookingReqId}/${userId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body:  JSON.stringify(form),
        })
    },

    cancelBooking(bookingId) {
        return fetch(`${SERVER_PREFIX}/bookings/cancel/${bookingId}}`, {
            method: "DELETE",
        })
    },

    createBooking(booking) {
        return fetch(`{SERVER_PREFIX}/bookings`, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(booking),
        });
    },
};

export default Api;