/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.CreditCard;
import javax.ejb.Local;

/**
 *
 * @author cally
 */
@Local
public interface CreditCardSessionBeanLocal {
    public CreditCard addNewCreditCard(CreditCard cc);
    public CreditCard getCreditCard();
}
