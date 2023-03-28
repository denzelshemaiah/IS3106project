/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.BankAccount;
import entity.CreditCard;
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
import session.CreditCardSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author Andrea
 */
@Path("creditCard")
@RequestScoped
public class CreditCardResource {

  @EJB
    private CreditCardSessionBeanLocal creditCardSessionBeanLocal;

  @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public CreditCard createNewBankAccount(CreditCard creditCard) {
        creditCardSessionBeanLocal.createNewCc(creditCard);
        return creditCard;
    }

}
