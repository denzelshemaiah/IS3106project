/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package error;

/**
 *
 * @author Andrea
 */
public class SitterNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>SitterNotFoundException</code> without
     * detail message.
     */
    public SitterNotFoundException() {
    }

    /**
     * Constructs an instance of <code>SitterNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public SitterNotFoundException(String msg) {
        super(msg);
    }
}
