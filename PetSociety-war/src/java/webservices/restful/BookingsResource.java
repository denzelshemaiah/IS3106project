/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import java.util.List;
import entity.BookingRequest;
import enumeration.RequestStatusEnum;
import error.NoAccessException;
import error.NoResultException;
import java.util.Date;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
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
@RequestScoped
public class BookingsResource {

    @EJB
    private BookingSessionBeanLocal bookingSession;
    
    //add exception handling
    @GET
    @Path("/{status}/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<BookingRequest> getBookings(@PathParam("status") String status, @PathParam("id") Long userId) {
        List<BookingRequest> bookings = bookingSession.getBookings(status, userId); 
        System.out.println("booking reloaded" + bookings);
        return bookings;
    }
    
    @PUT
    @Path("/{bookingId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateBooking(@PathParam("bookingId") Long bookingId, BookingRequest b) {
        b.setBookingReqId(bookingId);
        try {
            bookingSession.updateBooking(b);
            System.out.println("Booking start: " + b.getStartDate());
            System.out.println("Booking end: " + b.getEndDate());
            System.out.println(b.getEndDate());
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
    @Path("/cancel/{parentId}/{bookingId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cancelBooking(@PathParam("parentId") Long parentId, @PathParam("bookingId") Long bookingId) {
        try {
            bookingSession.cancelBooking(parentId, bookingId);
            return Response.status(204).build();
        } catch (NoResultException | NoAccessException e) {
            JsonObject exception = Json.createObjectBuilder()
            .add("error", "Not found")
            .build();
            return Response.status(404).entity(exception)
            .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @PUT
    @Path("/accept/{sitterId}/{bookingId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response acceptBooking(@PathParam("bookingId") Long bookingId, @PathParam("sitterId") Long sitterId) {
        try {
            bookingSession.acceptBooking(sitterId, bookingId);
            return Response.status(204).build();
        } catch (NoResultException | NoAccessException e) {
            JsonObject exception = Json.createObjectBuilder()
            .add("error", "Not found")
            .build();
            return Response.status(404).entity(exception)
            .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @PUT
    @Path("/reject/{sitterId}/{bookingId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response rejectBooking(@PathParam("bookingId") Long bookingId, @PathParam("sitterId") Long sitterId) {
        try {
            bookingSession.rejectBooking(sitterId, bookingId);
            return Response.status(204).build();
        } catch (NoResultException | NoAccessException e) {
            JsonObject exception = Json.createObjectBuilder()
            .add("error", "Not found")
            .build();
            return Response.status(404).entity(exception)
            .type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @POST
    @Path("/create/{parentId}/{sitterId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public BookingRequest createBooking (@PathParam("parentId") Long parentId, @PathParam("sitterId") Long sitterId,
            BookingRequest b, @QueryParam("repeat") String repeatBasis) {
        System.out.println(repeatBasis);
        System.out.println("creating: " + b);
        bookingSession.createNewBooking(b, parentId, sitterId, repeatBasis);
        return b;
    } 
}
