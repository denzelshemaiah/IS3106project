/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.AuthenticationRequest;
import entity.Parent;
import entity.Sitter;
import entity.User;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;

/**
 *
 * @author rachelang
 */
@Stateless
public class AuthenticationReqSessionBean implements AuthenticationReqSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")

    @Override
    public Long createAuthenticationReq(AuthenticationRequest authenticationReq, Long userId) throws EntityNotFoundException {
        Sitter user = em.find(Sitter.class, userId);
        if (user == null) {
            throw new EntityNotFoundException("No sitter found with this userId");
        }
        // add req to sitter
        // add sitter into req
        em.persist(authenticationReq);
        return authenticationReq.getAuthenticationId();
    }
    
}
