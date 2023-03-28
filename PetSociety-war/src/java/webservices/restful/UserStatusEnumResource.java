/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import enumeration.UserStatusEnum;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author Andrea
 */
@Path("userStatusEnum")
@RequestScoped
public class UserStatusEnumResource {

  @GET
    @Produces(MediaType.APPLICATION_JSON)
    public UserStatusEnum[] getUserStatusEnum() {
        return UserStatusEnum.values();
    }
}
