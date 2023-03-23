package com.ddatzzi.spring.security.metadata;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import com.ddatzzi.spring.security.auth.service.SecurityDataService;
import com.ddatzzi.spring.security.auth.vo.SecurityUrlAndAuthVO;

public class UrlAndRoleResourcesMapLoader {
  
  @Autowired
  SecurityDataService securityDataService;

  public LinkedHashMap<RequestMatcher, List<ConfigAttribute>> getUrlAndRoleResourcesMap() {

    List<SecurityUrlAndAuthVO> list = null;
    
    try {
      list = securityDataService.loadUrlAndAuth();
    } catch (Exception e) {
      System.out.println(e);
    }
    
    return convertResourcesMap(list);
  }

  // url과 권한을 Spring Security가 사용할 수 있도록 가공하는 메서드? 
  private LinkedHashMap<RequestMatcher, List<ConfigAttribute>> convertResourcesMap(List<SecurityUrlAndAuthVO> list) {

    LinkedHashMap<RequestMatcher, List<ConfigAttribute>> resourcesMap = new LinkedHashMap<RequestMatcher, List<ConfigAttribute>>();
    String preUrl = null;
    List<ConfigAttribute> configAttributeList;

    for ( SecurityUrlAndAuthVO vo : list ) {
      String url = vo.getUrl();
      String auth = vo.getAccessAuth();

      // RequestMatcher : http 요청을 매치하는 인터페이스
      // 전달된 url 문자열이 Ant 스타일 패턴에 일치하는지 여부를 판단하여 RequestMatcher를 생성.
      RequestMatcher requestMatcher = new AntPathRequestMatcher(url);
      SecurityConfig securityConfig = new SecurityConfig(auth);

      if ( preUrl != null && url.equals(preUrl) ) {
        List<ConfigAttribute> existConfigAttributeList = resourcesMap.get(requestMatcher);
        existConfigAttributeList.add(securityConfig);
      } else {
        configAttributeList = new LinkedList<ConfigAttribute>();
        configAttributeList.add(securityConfig);

        resourcesMap.put(requestMatcher, configAttributeList);
      }

      preUrl = url;
    }

    return resourcesMap;
  }

}
