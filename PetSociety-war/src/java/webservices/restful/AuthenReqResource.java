/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.AuthenticationRequest;
import javax.ejb.EJB;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.core.MediaType;
import session.AuthenticationReqSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author rachelrphy
 */
@Path("authenReq")
@RequestScoped
public class AuthenReqResource {

    @EJB
    private AuthenticationReqSessionBeanLocal authenticationReqSessionBeanLocal;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public AuthenticationRequest createNewAuthenticationReq(AuthenticationRequest authenReq) {
        authenticationReqSessionBeanLocal.createAuthenticationReq(authenReq);
        return authenReq;
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public AuthenticationRequest getAuthenticationRequest() {
        return authenticationReqSessionBeanLocal.getAuthenReq();
    }
}
