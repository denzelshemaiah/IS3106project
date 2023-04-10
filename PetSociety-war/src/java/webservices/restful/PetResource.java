/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Pet;
import javax.ejb.EJB;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.POST;
import javax.ws.rs.core.MediaType;
import session.PetSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author Andrea
 */
@Path("pet")
@RequestScoped
public class PetResource {

    @EJB
    private PetSessionBeanLocal petSessionBeanLocal;
    
    // create pet
    @POST
    @Path("/createPet")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Pet createNewPet(Pet pet) {
        petSessionBeanLocal.createNewPet(pet);
        
        return pet;
    }
}
