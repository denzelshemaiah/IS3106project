/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PetParent;
import error.ParentNotFoundException;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Andrea
 */
@Stateless
public class PetParentSessionBean implements PetParentSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    // create (aka registration)
    @Override
    public PetParent createNewParent(PetParent parent) {
        em.persist(parent);
        em.flush();
        
        return parent;
    }
    
    // retrieve
    @Override
     public PetParent retrieveParentByParentId(Long parentId) throws ParentNotFoundException {
        PetParent parent = em.find(PetParent.class, parentId);
        
        if (parent != null) {
            return parent;
        } else {
            throw new ParentNotFoundException("Pet Parent with Parent ID " + parentId + " does not exist!");
        }
    }
    
    
    // update
    
    // delete 
    
}
