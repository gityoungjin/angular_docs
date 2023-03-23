package com.ddatzzi.spring.security.metadata;

import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.RequestMatcher;

/*
 * 🌈FilterInvocationSecurityMetadataSource
 * 
 * 이 인터페이스를 구현하면 보안에 대한 정보( metadata )를 제공하게 된다. 
 * 필터 체인에서 사용되는 필터인 FilterSecurityInterceptor에서 이정보를 사용해서 보안을 처리한다.
 * 
 * 🔥 @Override getAllConfigAttributes() ⭐️⭐️⭐️
 *    - 모든 보안에 대한 정보를 가져온다.
 * 
 * 🔥 @Override getAttributes() ⭐️⭐️⭐️⭐️⭐️
 *    - 전달된 요청에 대한 보안 정보를 가져온다. 
 *    - FilterSecurityInterceptor가 실행될 때 호출된다.
 *    - 여기서 반환된 보안 정보를 사용하여 인가처리를 수행한다.
 * 
 * 🔥 @Override supports()
 *    - FilterInvocation을 지원하는지 여부를 반환한다.
 */
public class ReloadableFilterInvocationSecuritymetadataSource implements FilterInvocationSecurityMetadataSource {
  
  private UrlAndRoleResourcesMapLoader urlAndRoleResourcesMapLoader;
  private LinkedHashMap<RequestMatcher, List<ConfigAttribute>> requestMap;

  // 생성자로 urlAndRoleResourcesMapLoader를 초기화.
  public ReloadableFilterInvocationSecuritymetadataSource(UrlAndRoleResourcesMapLoader urlAndRoleResourcesMapLoader) {
    this.urlAndRoleResourcesMapLoader = urlAndRoleResourcesMapLoader;
    initRequestMap();
  }

  // urlAndRoleResourcesMapLoader를 초기화 하고 urlAndRoleResourcesMapLoader() 메서드를 통해 SecurityMetadataSource를 취득.
  private void initRequestMap() {
    if ( this.requestMap == null ) {
      this.requestMap = this.urlAndRoleResourcesMapLoader.getUrlAndRoleResourcesMap();
    }
  }

  // SecurityMetadataSource 갱신을 위한 메서드.
  public LinkedHashMap<RequestMatcher, List<ConfigAttribute>> getUrlAndRoleResourcesMap() {
    return urlAndRoleResourcesMapLoader.getUrlAndRoleResourcesMap();
  }

  // SecurityMetadataSource 갱신 메서드 ( 이걸 언제 사용하는지는 의문 .. )
  public void reload() {

    LinkedHashMap<RequestMatcher, List<ConfigAttribute>> reloadedMap = getUrlAndRoleResourcesMap();
    Iterator<Entry<RequestMatcher, List<ConfigAttribute>>> iterator = reloadedMap.entrySet().iterator();

    requestMap.clear();

    while(iterator.hasNext()) {
      Entry<RequestMatcher, List<ConfigAttribute>> entry = iterator.next();
      requestMap.put(entry.getKey(), entry.getValue());
    }
  }

  // -------------------------------------------------------------------------------------------------------------------------

  /*
   * getAllConfigAttributes
   * 
   * 모든 보안에 대한 정보를 가져온다.
   */
  @Override
  public Collection<ConfigAttribute> getAllConfigAttributes() {

    if ( this.requestMap == null ) {
      this.requestMap = getUrlAndRoleResourcesMap();
    }

    Set<ConfigAttribute> allAttributes = new HashSet<ConfigAttribute>();

    for ( Entry<RequestMatcher, List<ConfigAttribute>> entry : requestMap.entrySet() ) {
      allAttributes.addAll(entry.getValue());
    }

    return allAttributes;
  }

  /*
   * getAttributes
   * 
   * 전달된 요청에 대한 보안 정보를 가져온다. 
   * FilterSecurityInterceptor가 실행될 때 호출된다.
   * 여기서 반환된 보안 정보를 사용하여 인가처리를 수행한다.
   */
  @Override
  public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
  
    if ( this.requestMap == null ) {
      this.requestMap = getUrlAndRoleResourcesMap();
    }

    HttpServletRequest request = ((FilterInvocation)object).getRequest();

    for ( Entry<RequestMatcher, List<ConfigAttribute>> entry : requestMap.entrySet() ) {
      if ( entry.getKey().matches(request) ) {
        return entry.getValue();
      }
    }

    return null;
  }

  /*
   * supports
   * 
   * FilterInvocation을 지원하는지 여부를 반환한다.
   */
  @Override
  public boolean supports(Class<?> clazz) {
    return FilterInvocation.class.isAssignableFrom(clazz);
  }

  // -------------------------------------------------------------------------------------------------------------------------

}
