/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package helper;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author rachelang
 */
public class GetProperties {

    InputStream inputStream;
    private Properties properties;

    public GetProperties() throws FileNotFoundException {
        properties = new Properties();
        inputStream = getClass().getClassLoader().getResourceAsStream("../../config.properties");
        if (inputStream != null) {
            try {
                properties.load(inputStream);
            } catch (IOException ex) {
                ex.printStackTrace(System.out);
            }
        } else {
            throw new FileNotFoundException("property file config.properties not found in the classpath");
        }
//        try {
//            inputStream = new FileInputStream("/../../web/config.properties");
//            properties.load(inputStream);
//        } catch (IOException e) {
//            e.printStackTrace(System.out);
//        }
    }

    public String getImgPath() {
        String imgPath = properties.getProperty("img.path");
        System.out.println("img.path: " + imgPath);
        return imgPath;
    }
}
