/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.ExperienceForm;
import javax.ejb.EJB;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.core.MediaType;
import session.ExperienceFormSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author rachelrphy
 */
@Path("experienceForm")
@RequestScoped
public class ExperienceFormResource {

    @EJB
    private ExperienceFormSessionBeanLocal experienceFormSessionBeanLocal;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ExperienceForm createNewExperienceForm(ExperienceForm expForm) {
        experienceFormSessionBeanLocal.createNewExperienceForm(expForm);
        return expForm;
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ExperienceForm getExperienceForm() {
        return experienceFormSessionBeanLocal.getExperienceForm();
    }
}
