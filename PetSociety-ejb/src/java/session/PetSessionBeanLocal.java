/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Pet;
import javax.ejb.Local;

/**
 *
 * @author Andrea
 */
@Local
public interface PetSessionBeanLocal {

    public Pet createNewPet(Pet pet);
    
}
