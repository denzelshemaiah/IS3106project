/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.MeetAndGreetRequest;
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
public class MeetAndGreetSessionBean implements MeetAndGreetSessionBeanLocal {
        
    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    @Override
    public Long createNewMeetAndGreet(MeetAndGreetRequest m) {
        if (m.getParent() == null || m.getSitter() == null) {
            //exception?
        } else {
            em.persist(m);
            em.flush();
            m.getParent().getMgRequests().add(m);
            m.getSitter().getMgRequests().add(m);
        }
        return m.getMgReqId();
    }
    
    @Override
    public List<MeetAndGreetRequest> getAllRequests() {
        Query q = em.createQuery("SELECT m FROM MeetAndGreetRequest m");
        return q.getResultList();
    }
}
