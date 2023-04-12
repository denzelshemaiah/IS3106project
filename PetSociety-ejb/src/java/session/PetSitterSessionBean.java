/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PetSitter;
import error.NoResultException;
import error.SitterNotFoundException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author rachelrphy
 */
@Stateless
public class PetSitterSessionBean implements PetSitterSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

   // create
    @Override
    public Long createNewSitter(PetSitter sitter) {
        em.persist(sitter);
        em.flush();
        return sitter.getUserId();
    }

    // retrieve
    @Override
     public PetSitter retrieveSitterBySitterId(Long sitterId) throws SitterNotFoundException {
        PetSitter sitter = em.find(PetSitter.class, sitterId);
        
        if (sitter != null) {
            return sitter;
        } else {
            throw new SitterNotFoundException("Pet Sitter with Sitter ID " + sitterId + " does not exist!");
        }
    }
     
    @Override
     public List<PetSitter> retrieveAllSitters() {
         Query query = em.createQuery("SELECT s FROM PetSitter s");
        
        List<PetSitter> sitters = query.getResultList();
        System.out.println(sitters);
        return sitters;
     }
    
    // update
    @Override
    public void updateSitter(PetSitter sitter) throws SitterNotFoundException {
        PetSitter oldSitter = retrieveSitterBySitterId(sitter.getUserId());
        
        // from user
        oldSitter.setFirstName(sitter.getFirstName());
        oldSitter.setLastName(sitter.getLastName());
        oldSitter.setContactNum(sitter.getContactNum());
        oldSitter.setEmail(sitter.getEmail());
        oldSitter.setPassword(sitter.getPassword());
        oldSitter.setAge(sitter.getAge());
        oldSitter.setEmergencyContact(sitter.getEmergencyContact());
        oldSitter.setProfilePicture(sitter.getProfilePicture());
        oldSitter.setBillingAddress(sitter.getBillingAddress());
        oldSitter.setStatus(sitter.getStatus());
        
        // from user, foreign
        oldSitter.setReportsAgainstUser(sitter.getReportsAgainstUser());
        oldSitter.setReportsUserMade(sitter.getReportsUserMade());
        
        oldSitter.setBankAcc(sitter.getBankAcc());
        
        oldSitter.setRatingsForUsers(sitter.getRatingsForUsers());
        oldSitter.setRatingsUserMade(sitter.getRatingsUserMade());
        
        oldSitter.setCc(sitter.getCc());
        
        // entity specific
        oldSitter.setServiceAddress(sitter.getServiceAddress());
        oldSitter.setRegion(sitter.getRegion());
        oldSitter.setPetPreference(sitter.getPetPreference());
        oldSitter.setMaxNumPets(sitter.getMaxNumPets());
        oldSitter.setMaxWeightPreference(sitter.getMaxWeightPreference());
        oldSitter.setSchedule(sitter.getSchedule());
        oldSitter.setRate(sitter.getRate());
        oldSitter.setService(sitter.getService());
        
        oldSitter.setAuthenReq(sitter.getAuthenReq());
        oldSitter.setExpForm(sitter.getExpForm());
        oldSitter.setSafetyForm(sitter.getSafetyForm());
        oldSitter.setBookings(sitter.getBookings());
        oldSitter.setMgRequests(sitter.getMgRequests());
    }
    
    // delete
    @Override
    public void deleteSitter(Long sitterId) throws NoResultException, SitterNotFoundException {
        PetSitter sitter = retrieveSitterBySitterId(sitterId);
        
        // not sure what assocs to remove/set null yet
        
        em.remove(sitter);
    }
    
}
