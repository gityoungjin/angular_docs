package com.ddatzzi.spring.security.authentication;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

/*
 * UsernamePasswordAuthenticationToken
 *  - 사용자 이름과 암호를 나타내는 Principal과 Credentials를 캡슐화하는 인증 토큰이다.
 *  - 이 토큰은 인증 프로바이더에 의해 검증되고, 인증 성공 시 Authentication 객체로 반환된다.
 */
public class SecureUsernamePasswordAuthenticationToken extends UsernamePasswordAuthenticationToken{
  
  private static final long serialVersionUID = -8134868957238616808L;

  public SecureUsernamePasswordAuthenticationToken(Object principal, Object credentials) {
    super(principal, credentials);
  }

}
