/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BankAccount;
import entity.CreditCard;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author cally
 */
@Stateless
public class BankAccountSessionBean implements BankAccountSessionBeanLocal {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;
    
    @Override
    public Long addNewBankAccount(BankAccount acc) {
        em.persist(acc);
        em.flush();
        
        return acc.getBankAccId();
    }
}
