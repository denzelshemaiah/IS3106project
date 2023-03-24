/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PetSitter;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author rachelrphy
 */
@Stateless
public class PetSitterSessionBean implements PetSitterSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    @Override
    public Long createNewSitter(PetSitter sitter) {
    
        em.persist(sitter);
        em.flush();
<<<<<<< HEAD
        return sitter.getSitterId();
=======
        return sitter.getUserId();
>>>>>>> master
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    
}
