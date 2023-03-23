/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import java.util.List;
import entity.BookingRequest;
import javax.ejb.EJB;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import session.BookingSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author cally
 */
@Path("bookings")
public class BookingsResource {

    @EJB
    private BookingSessionBeanLocal bookingSession;
    
    @GET
    @Path("/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<BookingRequest> getPendingBookings(Long userId) {
        return bookingSession.getPendingRequests(userId);
    }
}
