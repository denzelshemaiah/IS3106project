/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.PetParent;
import entity.User;
import enumeration.UserStatusEnum;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.core.MediaType;
import session.PetParentSessionBeanLocal;
import session.UserSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author Andrea
 */
@Path("users")
@RequestScoped
public class UsersResource {

    @EJB
    private UserSessionBeanLocal userSessionBean;
    
    @EJB
    private PetParentSessionBeanLocal petParentSessionBeanLocal;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User createNewUser(User user) {
        user.setStatus(UserStatusEnum.PENDING);
        userSessionBean.createNewUser(user);
        return user;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUsers() {
        return userSessionBean.retrieveAllUsers();
    }
   
    
    // create petparent type user
    // shall we do validation of roles by checking user >> dtype? 
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User createNewPetParent(User user, PetParent petParent) {
        petParentSessionBeanLocal.createNewParent(user, petParent);
        return user;
    }
    
    
    // create petsitter type user
}
