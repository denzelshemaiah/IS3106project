/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Pet;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Andrea
 */
@Stateless
public class PetSessionBean implements PetSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    @Override
    public Pet createNewPet(Pet pet) {
        em.persist(pet);
        em.flush();
        
        return pet;
    }
    
}
