/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BankAccount;
import entity.CreditCard;
import entity.Transaction;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author cally
 */
@Stateless
public class TransactionSessionBean implements TransactionSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;
    
    @Override
    public Long createNewTransaction(Transaction t) {
        if (t.getBankAcc() != null) {
            em.persist(t);
            em.flush();
            BankAccount acc = t.getBankAcc();
            // add transaction to account
            acc.getTransactions().add(t);
        } else if (t.getCredCard() != null) {
            em.persist(t);
            em.flush();
            CreditCard cc = t.getCredCard();
            //add transaction to credit card
            cc.getTransactions().add(t);
        } else {
            // need to throw exception? for no payment method?
        }
        return t.getTransactionId();
    }
    
    @Override
    public List<Transaction> getAllTransactions() {
        Query q = em.createQuery("SELECT t FROM Transaction t");
        return q.getResultList();
    }
}
