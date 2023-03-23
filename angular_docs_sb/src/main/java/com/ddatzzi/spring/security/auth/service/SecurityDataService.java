package com.ddatzzi.spring.security.auth.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.ddatzzi.spring.security.auth.repository.SecurityDataRepository;
import com.ddatzzi.spring.security.auth.vo.SecurityUrlAndAuthVO;
import com.ddatzzi.spring.security.auth.vo.SecurityUserVO;

@Service
public class SecurityDataService {
  
  @Autowired
  SecurityDataRepository securityDataRepository;

  // username에 해당하는 유저정보 반환.
  public SecurityUserVO loadUserByUsername(String username) {
    SecurityUserVO user = securityDataRepository.loadUserByUserName(username);
    user = setAuthorities(user, username);
    return user;
  }
  
  // username에 해당하는 권한 목록을 user객체에 세팅하여 반환.
  private SecurityUserVO setAuthorities(SecurityUserVO user, String username) {

    if ( user != null ) {
      List<String> authorities = securityDataRepository.loadUserAuthoritiesByUsername(username);
      List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();

      for ( String auth : authorities ) {
        grantedAuthorities.add(new SimpleGrantedAuthority(auth));
      }

      user.setAuthorities(grantedAuthorities);
    }

    return user;
  }

  // url과 권한 목록을 반환한다.
  public List<SecurityUrlAndAuthVO> loadUrlAndAuth() {

    List<SecurityUrlAndAuthVO> list = new ArrayList<SecurityUrlAndAuthVO>();

    SecurityUrlAndAuthVO vo1 = new SecurityUrlAndAuthVO();
    vo1.setUrl("/api/test1/**");
    vo1.setAccessAuth("AUTH001");
    list.add(vo1);
    
    SecurityUrlAndAuthVO vo2 = new SecurityUrlAndAuthVO();
    vo2.setUrl("/api/test2/**");
    vo2.setAccessAuth("AUTH002");
    list.add(vo2);

    SecurityUrlAndAuthVO vo3 = new SecurityUrlAndAuthVO();
    vo3.setUrl("/api/test3/**");
    vo3.setAccessAuth("AUTH003");
    list.add(vo3);

    return list;
    
    // return securityDataRepository.loadUrlAndAuth();
  }

}
