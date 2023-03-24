const SERVER_PREFIX = "http://localhost:8080/PetSociety-war/webresources";

const Api = {
    //view all bookings
    //retrieve the ID of the user and the user object from the web resources
    getAllBookings(userId) {
        return fetch(`${SERVER_PREFIX}/bookings/${userId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
    },

    getBookingDetails(bookingId) {
        return fetch(`${SERVER_PREFIX}/booking/${bookingId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        })
    }
};

export default Api;