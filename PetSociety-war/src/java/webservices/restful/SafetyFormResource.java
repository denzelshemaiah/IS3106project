/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.SafetyForm;
import javax.ejb.EJB;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.core.MediaType;
import session.SafetyFormSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author rachelrphy
 */
@Path("safetyForm")
@RequestScoped
public class SafetyFormResource {

    @EJB
    private SafetyFormSessionBeanLocal safetyFormSessionBeanLocal;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public SafetyForm createNewSafetyForm(@FormParam("safetyForm") SafetyForm safetyForm) {
        safetyFormSessionBeanLocal.createNewSafetyForm(safetyForm);
        return safetyForm;
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public SafetyForm getSafetyForm() {
        return safetyFormSessionBeanLocal.getSafetyForm();
    }
}
