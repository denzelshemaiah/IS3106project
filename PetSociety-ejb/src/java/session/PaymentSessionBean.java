/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BankAccount;
import entity.CreditCard;
import entity.Payment;
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
public class PaymentSessionBean implements PaymentSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;
    
    @Override
    public Long createNewPayment(Payment t) {
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
            cc.getPayments().add(t);
        } else {
            // need to throw exception? for no payment method?
        }
        return t.getPaymentId();
    }
    
    @Override
    public List<Payment> getAllPayments() {
        Query q = em.createQuery("SELECT p FROM Payment p");
        return q.getResultList();
    }
}
