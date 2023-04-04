/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package enumeration;

/**
 *
 * @author cally
 */
public enum ServiceEnum {
    BOARDING, PET_TAXI, DAYCARE, DROP_IN;

  /*  private final String value;

    ServiceEnum(String value) {
        this.value = value;
    }

    // method so that we can pass service enum as string from FE
    public static ServiceEnum getServiceEnumFromString(String value) {
        for (ServiceEnum serviceEnum : ServiceEnum.values()) {
            if (serviceEnum.value.equalsIgnoreCase(value)) {
                return serviceEnum;
            }
        }
        throw new IllegalArgumentException("Invalid Service Choice: " + value);
    }*/
}
