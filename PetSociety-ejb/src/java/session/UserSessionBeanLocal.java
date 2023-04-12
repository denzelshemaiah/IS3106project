/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PetParent;
import entity.PetSitter;
import entity.User;
import error.UserNotFoundException;
import java.util.HashMap;
import java.util.List;
import javax.ejb.Local;
import javax.persistence.EntityNotFoundException;

/**
 *
 * @author Andrea
 */
@Local
public interface UserSessionBeanLocal {

    public void createNewUser(User user);

    User getUser(Long userId) throws EntityNotFoundException;

    List<User> retrieveAllUsers();

    List<User> searchUsersByUsername(String username);

    List<User> searchUsersByEmail(String email);

    List<User> searchUsersByContactNum(String contactNum);

    void disableUser(Long userId, int duration) throws EntityNotFoundException;

    void enableUser(Long userId) throws EntityNotFoundException;

    List<User> retrieveAllDisabledUsers();

    public void updateUser(User user) throws UserNotFoundException;

    public void createNewSitter(User user, PetSitter petSitter);

    public void createNewParent(User user, PetParent petParent);

    public User getPetParent(Long userId) throws EntityNotFoundException;

    public User getPetSitter(Long userId) throws EntityNotFoundException;
    
    public User userLogin(String email, String password) throws EntityNotFoundException;
    
}
