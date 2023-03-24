/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Payment;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author cally
 */
@Local
public interface PaymentSessionBeanLocal {
    public Long createNewPayment(Payment t);
    public List<Payment> getAllPayments();
}
