/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import java.util.List;
import entity.BookingRequest;
import enumeration.RequestStatusEnum;
import error.NoResultException;
import java.util.Date;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
    
    //add exception handling
    @GET
    @Path("/{status}/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookings(@PathParam("status") String status, @PathParam("id") Long userId) {
        List<BookingRequest> bookings = bookingSession.getBookings(status, userId); 
        System.out.println(bookings);
        GenericEntity<List<BookingRequest>> entity = new GenericEntity<List<BookingRequest>>(bookings){};
        return Response.status(200).entity(
            entity
        ).build();
    }
    
    @PUT
    @Path("/{bookingId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateBooking(@PathParam("bookingId") Long bookingId, BookingRequest b) {
        b.setBookingReqId(bookingId);
        try {
            bookingSession.updateBooking(b);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
            .add("error", "Not found")
            .build();
            return Response.status(404).entity(exception)
            .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @DELETE
    @Path("/cancel/{bookingId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cancelBooking(@PathParam("bookingId") Long bookingId) {
        try {
            bookingSession.cancelBooking(bookingId);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
            .add("error", "Not found")
            .build();
            return Response.status(404).entity(exception)
            .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @POST
    @Path("/parent/{parentId}/{sitterId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public BookingRequest createCustomer(BookingRequest b, @PathParam("parentId") Long parentId, @PathParam("sitterId") Long sitterId) {
        b.setCreated(new Date());
        b.setStatus(RequestStatusEnum.PENDING);
        bookingSession.createNewBooking(b, parentId, sitterId);
        return b;
    } //end createBooking
}
