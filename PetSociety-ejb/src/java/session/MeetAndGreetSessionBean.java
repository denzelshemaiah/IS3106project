/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.MeetAndGreetRequest;
import entity.PetParent;
import entity.PetSitter;
import entity.User;
import enumeration.RequestStatusEnum;
import error.NoAccessException;
import error.NoResultException;
import java.util.Date;
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
    public Long createNewMeetAndGreet(MeetAndGreetRequest m, Long sitterId, Long parentId) {
        PetSitter sitter = em.find(PetSitter.class, sitterId);
        PetParent parent = em.find(PetParent.class, parentId);
        
        if (sitter == null || parent == null) {
            //exception?
        } else {
            m.setParent(parent);
            m.setSitter(sitter);
            m.setStatus(RequestStatusEnum.PENDING);
            em.persist(m);
            em.flush();
            sitter.getMgRequests().add(m);
            parent.getMgRequests().add(m);
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
            System.out.println(userId);
        }
        return q.getResultList();
    }
    
    @Override
    public void updateRequest (MeetAndGreetRequest mg) throws NoResultException {
        MeetAndGreetRequest old = em.find(MeetAndGreetRequest.class, mg.getMgReqId());
        if (mg.getMgReqId() == null) {
            throw new NoResultException("No booking can be found!");
        } else {
            old.setMgDesc(mg.getMgDesc());
            old.setMgDate(mg.getMgDate());
            old.setStatus(RequestStatusEnum.PENDING);
            em.merge(old);
        }
    }
    
    @Override
    public void rejectRequest(Long userId, Long mgReqId) throws NoResultException, NoAccessException {
        User u = em.find(User.class, userId);
        MeetAndGreetRequest mg = em.find(MeetAndGreetRequest.class, mgReqId);

        if (u == null) {
            throw new NoResultException("User could not be found!");
        } else if (mg == null) {
            throw new NoResultException("Meet And Greet Request could not be found!");
        } else if (u instanceof PetParent) {
            throw new NoAccessException("Only Pet Sitters can reject bookings!");
        } else {
            mg.setStatus(RequestStatusEnum.REJECTED);
            em.merge(mg);
        }
    }
    
    @Override
    public void cancelRequest(Long userId, Long mgReqId) throws NoResultException, NoAccessException {
        User u = em.find(User.class, userId);
        MeetAndGreetRequest mg = em.find(MeetAndGreetRequest.class, mgReqId);

        if (u == null) {
            throw new NoResultException("User could not be found!");
        } else if (mg == null) {
            throw new NoResultException("Meet and greet request could not be found!");
        } else {
            mg.setStatus(RequestStatusEnum.ARCHIVED);
        }
    }
    
    @Override
    public void acceptRequest (Long userId, Long mgReqId) throws NoResultException, NoAccessException {
        User u = em.find(User.class, userId);
        MeetAndGreetRequest mg = em.find(MeetAndGreetRequest.class, mgReqId);
        Date bookingStart = mg.getMgDate();
        Date current = new Date();

        int result = bookingStart.compareTo(current);

        if (u == null) {
            throw new NoResultException("User could not be found!");
        } else if (mg == null) {
            throw new NoResultException("Meet and greet request could not be found!");
        } else if (u instanceof PetParent) {
            throw new NoAccessException("Only Pet Sitters can accept meet and greet requests!");
        } else {
            if (result < 0) {
                throw new NoAccessException("Meet and greet has already started and cannot be accepted!");
            }
            mg.setStatus(RequestStatusEnum.ACCEPTED);
            em.merge(mg);
        }
    }
}
