/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.MeetAndGreetRequest;
import error.NoAccessException;
import error.NoResultException;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.MeetAndGreetSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author cally
 */
@Path("meetandgreets")
public class MeetAndGreetResource {

    @EJB
    private MeetAndGreetSessionBeanLocal mgSession;
    
    @GET
    @Path("/{status}/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<MeetAndGreetRequest> getAllMeetAndGreets(@PathParam("status") String status, @PathParam("id") Long userId) {
        List<MeetAndGreetRequest> requests = mgSession.getRequests(status, userId); 
        return requests;
    }
    
    @PUT
    @Path("/{mgReqId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateBooking(@PathParam("mgReqId") Long mgReqId, MeetAndGreetRequest mg) {
        mg.setMgReqId(mgReqId);
        try {
            mgSession.updateRequest(mg);
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
    @Path("/cancel/{parentId}/{mgReqId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cancelMg(@PathParam("parentId") Long parentId, @PathParam("mgReqId") Long mgReqId) {
        try {
            mgSession.cancelRequest(parentId, mgReqId);
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
    @Path("/accept/{sitterId}/{mgReqId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response acceptMg (@PathParam("mgReqId") Long mgReqId, @PathParam("sitterId") Long sitterId) {
        try {
            mgSession.acceptRequest(sitterId, mgReqId);
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
    @Path("/reject/{sitterId}/{mgReqId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response rejectMg (@PathParam("mgReqId") Long mgReqId, @PathParam("sitterId") Long sitterId) {
        try {
            mgSession.rejectRequest(sitterId, mgReqId);
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
    @Path("/create/{sitterId}/{parentId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void createMg (MeetAndGreetRequest mg, @PathParam("sitterId") Long sitterId, @PathParam("parentId") Long parentId) {
        mgSession.createNewMeetAndGreet(mg, sitterId, parentId);
    }
}
