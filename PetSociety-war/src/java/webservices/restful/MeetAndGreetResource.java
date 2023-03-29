/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.MeetAndGreetRequest;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import session.MeetAndGreetSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author cally
 */
@Path("meetandgreets")
public class MeetAndGreetResource {

    @EJB
    private MeetAndGreetSessionBeanLocal meetAndGreetSession;
    
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<MeetAndGreetRequest> getAllMeetAndGreets() {
        
        return meetAndGreetSession.getAllRequests();
    }
}
