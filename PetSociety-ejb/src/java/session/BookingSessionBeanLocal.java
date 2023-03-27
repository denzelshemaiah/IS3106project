/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BookingRequest;
import error.NoResultException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author cally
 */
@Local
public interface BookingSessionBeanLocal {
    public Long createNewBooking(BookingRequest b);
    public List<BookingRequest> getBookings(String status, Long userId);
    public void updateBooking(BookingRequest b) throws NoResultException;
    public void cancelBooking(Long bookingId) throws NoResultException;
}
