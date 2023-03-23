package com.ddatzzi.spring.security.auth.vo;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Data
public class SecurityUserVO implements UserDetails {

  private String username;
  private String password;
  private List<GrantedAuthority> authorities;

  // 문자열 auth에 해당하는 권한을 가지고 있으면 true, 그렇지 않으면 false 반환.
  public boolean hasAuth(String auth) {
    return authorities.contains(new SimpleGrantedAuthority(auth));
  }
  
  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}
