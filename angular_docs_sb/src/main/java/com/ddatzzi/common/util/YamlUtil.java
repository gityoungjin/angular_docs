package com.ddatzzi.common.util;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.yaml.snakeyaml.Yaml;

public class YamlUtil {
  
  /*
   * 지정한 YAML 파일을 읽어서 Map<String, Object> 타입으로 반환한다.
   */
  @SuppressWarnings("unchecked")
  public static Map<String, Object> readYaml(String filePath) {
    
    Map<String, Object> yamlConfig = new HashMap<String, Object>();
    Yaml yaml = new Yaml();

    try {
      yamlConfig = (Map<String, Object>)yaml.load(new ClassPathResource(filePath).getInputStream());

      if ( yamlConfig == null || yamlConfig.isEmpty() == true ) {
        throw new RuntimeException("Empty config file");
      }
    } catch (FileNotFoundException e) {
      System.out.println("No such file" + filePath);
    } catch (Exception e) {
      System.out.println("Failed to read config file");
    }

    return yamlConfig;
  }
  
  /*
   * 지정한 YAML 파일을 읽어서 + 특정 카테고리의 Map<String, Object> 타입으로 반환한다.
   */
  @SuppressWarnings("unchecked")
  public static Map<String, Object> readYaml(String filePath, String category) {
    
    Map<String, Object> categoryConfig = new HashMap<String, Object>();
    Yaml yaml = new Yaml();
    
    try {
      Map<String, Object> yamlConfig = new HashMap<String, Object>();
      yamlConfig = (Map<String, Object>)yaml.load(new ClassPathResource(filePath).getInputStream());

      if ( yamlConfig == null || yamlConfig.isEmpty() == true ) {
        throw new RuntimeException("Empty config file");
      }

      categoryConfig = (Map<String, Object>)yamlConfig.get(category);
      if ( categoryConfig == null || categoryConfig.isEmpty() == true ) {
        throw new RuntimeException("Empty config file");
      }
    } catch (FileNotFoundException e) {
      System.out.println("No such file" + filePath);
    } catch (Exception e) {
      System.out.println("Failed to read config file");
    }

    return categoryConfig;
  }


}
