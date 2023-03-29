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
    public CreditCard addNewCreditCard(CreditCard cc) {
        em.persist(cc);
        em.flush();
        // cc.getUser().setCc(cc);
        return cc;
    }
}
