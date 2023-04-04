/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PetParent;
import entity.User;
import error.NoResultException;
import error.ParentNotFoundException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author Andrea
 */
@Stateless
public class PetParentSessionBean implements PetParentSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

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
    
    @Override
     public List<PetParent> retrieveAllParents() {
         Query query = em.createQuery("SELECT p FROM PetParent p");
        
        List<PetParent> parents = query.getResultList();
        
        return parents;
     }
     
    // update
    @Override
    public void updateParent(PetParent parent) throws ParentNotFoundException {
        PetParent oldParent = retrieveParentByParentId(parent.getUserId());
        
        // from user
        oldParent.setFirstName(parent.getFirstName());
        oldParent.setLastName(parent.getLastName());
        oldParent.setContactNum(parent.getContactNum());
        oldParent.setEmail(parent.getEmail());
        oldParent.setPassword(parent.getPassword());
        oldParent.setAge(parent.getAge());
        oldParent.setEmergencyContact(parent.getEmergencyContact());
        oldParent.setProfilePicture(parent.getProfilePicture());
        oldParent.setBillingAddress(parent.getBillingAddress());
        oldParent.setStatus(parent.getStatus());
        
        // from user, foreign
        oldParent.setReportsAgainstUser(parent.getReportsAgainstUser());
        oldParent.setReportsUserMade(parent.getReportsUserMade());
        
        oldParent.setBankAcc(parent.getBankAcc());
        
        oldParent.setRatingsForUsers(parent.getRatingsForUsers());
        oldParent.setRatingsUserMade(parent.getRatingsUserMade());
        
        oldParent.setCc(parent.getCc());
        
        // entity specific
        oldParent.setSearches(parent.getSearches());
        oldParent.setMgRequests(parent.getMgRequests());
        oldParent.setBookings(parent.getBookings());
    } 
    
    // delete 
    @Override
    public void deleteParent(Long parentId) throws NoResultException, ParentNotFoundException {
        PetParent parent = retrieveParentByParentId(parentId);
        
        // not sure what assocs to remove/set null yet
        
        em.remove(parent);
    }
}
