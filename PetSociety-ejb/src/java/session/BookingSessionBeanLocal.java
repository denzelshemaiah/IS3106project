/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BookingRequest;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author cally
 */
@Local
public interface BookingSessionBeanLocal {
    public Long createNewBooking(BookingRequest b);
    public List<BookingRequest> getPendingRequests(Long userId);
    public List<BookingRequest> getUpcomingRequests(Long userId);
    public List<BookingRequest> getRejectedRequests(Long userId);
    public List<BookingRequest> getArchivedRequests(Long userId);
}
