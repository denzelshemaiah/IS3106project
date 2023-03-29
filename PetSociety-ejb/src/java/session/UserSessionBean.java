/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.User;
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

    @Override
    public User getUser(Long userId) throws EntityNotFoundException {
        User user = em.find(User.class, userId);
        if (user == null) {
            throw new EntityNotFoundException("No user found with this UserId");
        }
        return user;
    }
    
    // need to add update user

    @Override
    public List<User> retrieveAllUsers() {
        Query q = em.createQuery("SELECT u FROM User u");
        return q.getResultList();
    }

    @Override
    public List<User> searchUsersByUsername(String username) {
        Query q = em.createQuery("SELECT u FROM User u WHERE u.username LIKE ?1");
        q.setParameter(1, username);
        return q.getResultList();
    }

    @Override
    public List<User> searchUsersByEmail(String email) {
        Query q = em.createQuery("SELECT u FROM User u WHERE u.email LIKE ?1");
        q.setParameter(1, email);
        return q.getResultList();
    }

    @Override
    public List<User> searchUsersByContactNum(String contactNum) {
        Query q = em.createQuery("SELECT u FROM User u WHERE u.contactNum LIKE ?1");
        q.setParameter(1, contactNum);
        return q.getResultList();
    }
}
