const SERVER_PREFIX = "http://localhost:8080/PetSociety-war/webresources";

const Api = {
    // create user (in general 1st)
    // making this function obsolete as now i will only create petparent or petsitter
    /*createNewUser(data) {
        return fetch(`${SERVER_PREFIX}/users`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    }, */

    // creation of petParent
    createNewParent(data) {
        return fetch(`${SERVER_PREFIX}/users/petparent`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    // // creation of petSitter
    createNewSitter(data) {
        return fetch(`${SERVER_PREFIX}/users/petsitter`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    //retrieve the parentId
    getParentId(parentId) {
        return fetch(`${SERVER_PREFIX}/users/petparent/${parentId}`)
    },

    //retrieve all pet sitters
    getAllPetSitters() {
        return fetch(`${SERVER_PREFIX}/users/petsitters`)
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

    createAndAssociateNewAuthenReq(data) {
        return fetch(`${SERVER_PREFIX}/authenReq`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    createAndAssociateNewExperienceForm(data) {
        return fetch(`${SERVER_PREFIX}/experienceForm`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    createAndAssociateNewSafetyForm(data) {
        return fetch(`${SERVER_PREFIX}/safetyForm`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    // creation of Pet (already associated with Parent)
    createNewPet(data) {
        return fetch(`${SERVER_PREFIX}/pet/createPet`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    //BOOKINGSSSS
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
        return fetch(`${SERVER_PREFIX}/bookings/create/${parentId}/${sitterId}/query?repeat=${repeat}`, {
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
            method: "PUT"
        })
    },
    //reject a booking
    rejectBooking(sitterId, bookingId) {
        return fetch(`${SERVER_PREFIX}/bookings/reject/${sitterId}/${bookingId}`, {
            method: "PUT"
        })
    },

    //MEET AND GREETSSS
    getAllMeets(status, userId) {
        return fetch(`${SERVER_PREFIX}/meetandgreets/${status}/${userId}`)
    },

    //update the meet and greet values
    updateMg(form) {
        return fetch(`${SERVER_PREFIX}/meetandgreets/${form.mgReqId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(form),
        })
    },

    //cancel this meet and greet, move 2 archive
    cancelMg(parentId, mgReqId) {
        return fetch(`${SERVER_PREFIX}/meetandgreets/cancel/${parentId}/${mgReqId}`, {
            method: "DELETE",
        })
    },

    //create new meet and greet
    createMg(mg, sitterId, parentId) {
        console.log(sitterId);
        console.log(parentId);
        return fetch(`${SERVER_PREFIX}/meetandgreets/create/${sitterId}/${parentId}`, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(mg),
        });
    },

    //accept a meet and greet
    acceptMg(sitterId, mgReqId) {
        return fetch(`${SERVER_PREFIX}/meetandgreets/accept/${sitterId}/${mgReqId}`, {
            method: "PUT"
        })
    },

    //reject a meet and greet
    rejectMg(sitterId, mgReqId) {
        console.log(sitterId);
        console.log(mgReqId);
        return fetch(`${SERVER_PREFIX}/meetandgreets/reject/${sitterId}/${mgReqId}`, {
            method: "PUT"
        })
    },

};

export default Api;