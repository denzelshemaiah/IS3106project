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
 * @author Andrea
 */
@Stateless
public class CreditCardSessionBean implements CreditCardSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    @Override
   public CreditCard createNewCc(CreditCard creditCard) {

        em.persist(creditCard);
        em.flush();
        creditCard.getUser().setCc(creditCard);

        return creditCard;
    }

    
}
