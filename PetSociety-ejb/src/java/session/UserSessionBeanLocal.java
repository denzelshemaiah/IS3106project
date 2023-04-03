/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.User;
import error.UserNotFoundException;
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
    
}
