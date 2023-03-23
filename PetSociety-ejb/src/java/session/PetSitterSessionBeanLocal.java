/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PetSitter;
import javax.ejb.Local;

/**
 *
 * @author rachelrphy
 */
@Local
public interface PetSitterSessionBeanLocal {

    public Long createNewSitter(PetSitter sitter);
    
}
