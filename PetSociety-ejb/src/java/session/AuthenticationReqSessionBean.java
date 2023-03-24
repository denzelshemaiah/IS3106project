/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.AuthenticationRequest;
import entity.PetParent;
import entity.PetSitter;
import entity.User;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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
        PetSitter user = em.find(PetSitter.class, userId);
        if (user == null) {
            throw new EntityNotFoundException("No sitter found with this userId");
        }
        // add req to sitter
        user.setAuthenReq(authenticationReq);
        // add sitter into req
        authenticationReq.setSitter(user);
        em.persist(authenticationReq);
        return authenticationReq.getAuthenticationId();
    }

    @Override
    public AuthenticationRequest findAuthenticationReqBySitter(Long sitterId) throws EntityNotFoundException {
        PetSitter sitter = em.find(PetSitter.class, sitterId);
        if (sitter == null) {
            throw new EntityNotFoundException("No sitter found with this sitterId");
        }
        return sitter.getAuthenReq();
    }

    @Override
    public List<AuthenticationRequest> getAllUnresolvedAuthenReq() {
        Query q = em.createQuery("SELECT a FROM AuthenticationRequest a WHERE a.resolved = FALSE");
        return q.getResultList();
    } 

    @Override
    public List<AuthenticationRequest> getAllAuthenticationReqs() {
        Query q = em.createQuery("SELECT a FROM AuthenticationRequest a");
        return q.getResultList();
    }
    
    @Override
    public void markAuthenReqAsResolved(Long authenticationId) throws EntityNotFoundException {
        AuthenticationRequest authenReq = em.find(AuthenticationRequest.class, authenticationId);
        if (authenReq == null) {
            throw new EntityNotFoundException("No AuthenticationRequest found with this authenticationId");
        }
        authenReq.setResolved(Boolean.TRUE);
    }
}
