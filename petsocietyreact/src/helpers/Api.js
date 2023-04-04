const SERVER_PREFIX = "http://localhost:8080/PetSociety-war/webresources";

const Api = {
    // create user (in general 1st)

    // just to get the status enum... needs an api call...
    async getUserStatusEnum() {
        const response = await fetch(`${SERVER_PREFIX}/userStatusEnum`);
        if (!response.ok) {
            throw new Error('Failed to fetch user status enum');
        }
        const data = await response.json();
        console.log("JSON response:", data);
        return data;
    },

    createNewUser(data) {
        return fetch(`${SERVER_PREFIX}/users`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },
    
    // setting bankAccountNumber and creating it in association with a user
    createAndAssociateNewBankAccount(data) {
        return fetch(`${SERVER_PREFIX}/bankAccount`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }); 
    },

    // setting and creating CreditCard in assoc with a user
    createAndAssociateNewCreditCard(data) {
        return fetch(`${SERVER_PREFIX}/creditCard`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }); 
    }, 

    //view all bookings
    //retrieve the ID of the user and the user object from the web resources
    getAllBookings(status, userId) {
        return fetch(`${SERVER_PREFIX}/bookings/${status}/${userId}`)
    },
    
    //update the booking values
    updateBooking(form) {
        return fetch(`${SERVER_PREFIX}/bookings/${form.bookingReqId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(form),
        })
    },
    //cancel this booking, move 2 archive
    cancelBooking(parentId, bookingId) {
        return fetch(`${SERVER_PREFIX}/bookings/cancel/${parentId}/${bookingId}`, {
            method: "DELETE",
        })
    },
    //create new booking
    createBooking(booking, parentId, sitterId, repeat) {
        return fetch(`${SERVER_PREFIX}/bookings/create/${parentId}/${sitterId}/repeat?=${repeat}`, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(booking),
        });
    },
    //accept a booking
    acceptBooking(sitterId, bookingId) {
        return fetch(`${SERVER_PREFIX}/bookings/accept/${sitterId}/${bookingId}`, {
            method:"PUT"
        })
    },
    //reject a booking
    rejectBooking(sitterId, bookingId) {
        return fetch(`${SERVER_PREFIX}/bookings/reject/${sitterId}/${bookingId}`, {
            method:"PUT"
        })
    }
};

export default Api;