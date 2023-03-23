package com.ddatzzi.spring.security.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.ddatzzi.spring.security.auth.vo.SecurityUserVO;

public class SecurityUserDetailsService implements UserDetailsService {
  
  @Value("${spring.profiles.active}")
  private String activeProfile;

  @Autowired
  private SecurityDataService securityDataService;

  // spring.profiles.active에 따라 다른 방법으로 username에 해당하는 유저정보 취득.
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    
    SecurityUserVO user = null;

    try {
      // spring.profiles.active가 prodgroup일 경우.
      if ( activeProfile != null && activeProfile.equals("prodgroup") ) {
        user = securityDataService.loadUserByUsername(username);
      }
      // spring.profiles.active가 localgroup이나 devgroup일 경우.
      else {
        user = securityDataService.loadUserByUsername(username);
      }
    } catch (Exception e) {
      System.out.println(e);
    }

    if ( user == null ) {
      throw new UsernameNotFoundException(username);
    }

    return user;
  }

}
