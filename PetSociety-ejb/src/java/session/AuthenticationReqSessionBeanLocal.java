/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.AuthenticationRequest;
import javax.ejb.Local;
import javax.persistence.EntityNotFoundException;

/**
 *
 * @author rachelang
 */
@Local
public interface AuthenticationReqSessionBeanLocal {

    Long createAuthenticationReq(AuthenticationRequest authenticationReq, Long userId) throws EntityNotFoundException;
    
}
