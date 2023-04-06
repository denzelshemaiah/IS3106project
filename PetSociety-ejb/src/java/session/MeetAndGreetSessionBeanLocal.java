/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.MeetAndGreetRequest;
import error.NoAccessException;
import error.NoResultException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author cally
 */
@Local
public interface MeetAndGreetSessionBeanLocal {

    public Long createNewMeetAndGreet(MeetAndGreetRequest m);

    public List<MeetAndGreetRequest> getRequests(String status, Long userId);
    
    public void updateRequest(MeetAndGreetRequest mg) throws NoResultException;
    
    public void cancelRequest(Long userId, Long mgReqId) throws NoResultException, NoAccessException;
    
    public void rejectRequest(Long userId, Long mgReqId) throws NoResultException, NoAccessException;
    
    public void acceptRequest (Long userId, Long mgReqId) throws NoResultException, NoAccessException;
}
