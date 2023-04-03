/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PetParent;
import entity.PetSitter;
import entity.User;
import enumeration.UserStatusEnum;
import error.UserNotFoundException;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author Andrea
 */
@Stateless
public class UserSessionBean implements UserSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    // create (aka registration)
    @Override
    public void createNewUser(User user) {
        em.persist(user);          
    }
    
    // registering their roles 
    // (note to self: need to create indiv petparent and petsitter attributes first before passing it in here)
    @Override
    public void createNewParent(User user, PetParent petParent) {
        createNewUser(user);
        petParent.setUser(user);
        em.persist(petParent);
    }
    
    @Override
    public void createNewSitter(User user, PetSitter petSitter) {
        createNewUser(user);
        petSitter.setUser(user);
        em.persist(petSitter);
    }
    
    

    @Override
    public User getUser(Long userId) throws EntityNotFoundException {
        User user = em.find(User.class, userId);
        if (user == null) {
            throw new EntityNotFoundException("No user found with this UserId");
        }
        return user;
    }
    
    // getPetParent
    @Override
    public User getPetParent(Long userId) throws EntityNotFoundException {
        PetParent petParent = em.find(PetParent.class, userId);
        if (petParent == null) {
            throw new EntityNotFoundException("No pet parent found with this UserId");
        }
        return petParent;
    }
    
    // getPetSitter
    @Override
    public User getPetSitter(Long userId) throws EntityNotFoundException {
        PetSitter petSitter = em.find(PetSitter.class, userId);
        if (petSitter == null) {
            throw new EntityNotFoundException("No pet sitter found with this UserId");
        }
        return petSitter;
    }
    
    
    
    
    // need to add update user
    @Override
    public void updateUser(User user) throws UserNotFoundException {
        User oldUser = getUser(user.getUserId());

        oldUser.setFirstName(user.getFirstName());
        oldUser.setLastName(user.getLastName());
        oldUser.setContactNum(user.getContactNum());
        oldUser.setEmail(user.getEmail());
        oldUser.setPassword(user.getPassword());
    }

    @Override
    public List<User> retrieveAllUsers() {
        Query q = em.createQuery("SELECT u FROM User u");
        return q.getResultList();
    }

    @Override
    public List<User> searchUsersByUsername(String username) {
        Query q = em.createQuery("SELECT u FROM User u WHERE u.username LIKE ?1");
        q.setParameter(1, "%" + username + "%");
        return q.getResultList();
    }

    @Override
    public List<User> searchUsersByEmail(String email) {
        Query q = em.createQuery("SELECT u FROM User u WHERE u.email LIKE ?1");
        q.setParameter(1, "%" + email + "%");
        return q.getResultList();
    }

    @Override
    public List<User> searchUsersByContactNum(String contactNum) {
        Query q = em.createQuery("SELECT u FROM User u WHERE u.contactNum LIKE ?1");
        q.setParameter(1, "%" + contactNum + "%");
        return q.getResultList();
    }

    @Override
    public void disableUser(Long userId, int duration) throws EntityNotFoundException {
        User user = em.find(User.class, userId);
        if (user == null) {
            throw new EntityNotFoundException("No user found with this userId");
        }
        user.setDaysDisabled(duration);
        user.setStatus(UserStatusEnum.DISABLED);
    }

    @Override
    public void enableUser(Long userId) throws EntityNotFoundException {
        User user = em.find(User.class, userId);
        if (user == null) {
            throw new EntityNotFoundException("No user found with this userId");
        }
        user.setDaysDisabled(0);
        user.setStatus(UserStatusEnum.APPROVED);
    }

    @Override
    public List<User> retrieveAllDisabledUsers() {
        Query q = em.createQuery("SELECT u FROM User u WHERE u.status = :enum");
        q.setParameter("enum", UserStatusEnum.DISABLED);
        return q.getResultList();
    }
}
