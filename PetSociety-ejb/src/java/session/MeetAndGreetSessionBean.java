/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.MeetAndGreetRequest;
import entity.PetParent;
import entity.User;
import enumeration.RequestStatusEnum;
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
    public List<MeetAndGreetRequest> getRequests(String status, Long userId) {
        User u = em.find(User.class, userId);
        Query q;
        RequestStatusEnum statusEnum;

        if (status.equals("pending")) {
            statusEnum = RequestStatusEnum.PENDING;
        } else if (status.equals("upcoming")) {
            statusEnum = RequestStatusEnum.ACCEPTED;
        } else if (status.equals("rejected")) {
            statusEnum = RequestStatusEnum.REJECTED;
        } else {
            // archived tab
            statusEnum = RequestStatusEnum.ARCHIVED;
        }

        if (u instanceof PetParent) {
            //if user is a parent
            q = em.createQuery("SELECT mg FROM MeetAndGreetRequest mg WHERE mg.parent.userId LIKE :parentId AND mg.status = :enum")
                    .setParameter("parentId", userId)
                    .setParameter("enum", statusEnum);
            //check status of required bookings
        } else {
            q = em.createQuery("SELECT mg FROM MeetAndGreetRequest mg WHERE mg.sitter.userId LIKE :sitterId AND mg.status = :enum")
                    .setParameter("sitterId", userId)
                    .setParameter("enum", statusEnum);
        }
        return q.getResultList();
    }
}
