/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.MeetAndGreetRequest;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author cally
 */
@Local
public interface MeetAndGreetSessionBeanLocal {
    public Long createNewMeetAndGreet(MeetAndGreetRequest m);
    public List<MeetAndGreetRequest> getAllRequests();
}
