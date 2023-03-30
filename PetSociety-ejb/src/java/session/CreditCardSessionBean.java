/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.CreditCard;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author cally
 */
@Stateless
public class CreditCardSessionBean implements CreditCardSessionBeanLocal {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;
    
    @Override
    public Long addNewCreditCard(CreditCard cc) {
        em.persist(cc);
        em.flush();
        
        return cc.getCcId();
    }
    
    @Override
    public CreditCard getCreditCard() {
        Query q = em.createQuery("SELECT cc FROM CreditCard cc");
        return (CreditCard) q.getResultList().get(0);
    }
}
