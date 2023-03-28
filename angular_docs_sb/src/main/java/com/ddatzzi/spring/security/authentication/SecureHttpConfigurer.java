package com.ddatzzi.spring.security.authentication;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

/*
 * AbstractHttpConfigurer : 스프링 시큐리티에서 HTTP보안 구성을 위한 설정 클래스의 기본 클래스.
 * 
 * configure() : HTTP보안 구성을 작성하는 메서드
 * 
 * add() : 이전에 구성한 내용에 추가 할 수 있는 메서드
 */
public class SecureHttpConfigurer extends AbstractHttpConfigurer<SecureHttpConfigurer, HttpSecurity> {

  // 로그인 성공 핸들러
  AuthenticationSuccessHandler authenticationSuccessHandler;
  // 로그인 실패 핸들러
  AuthenticationFailureHandler authenticationFailureHandler;

  // 생성자를 통해 핸들러 초기화
  public SecureHttpConfigurer(AuthenticationSuccessHandler successHandler, AuthenticationFailureHandler failureHandler) {
    this.authenticationSuccessHandler = successHandler;
    this.authenticationFailureHandler = failureHandler;
  }

  public static SecureHttpConfigurer customDsl(AuthenticationSuccessHandler successHandler, AuthenticationFailureHandler failureHandler ) {
    return new SecureHttpConfigurer(successHandler, failureHandler);
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {
    
    // HttpSecurity를 통해 설정한 AuthenticationManager를 가져오기.
    AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);

    SecureUsernamePasswordAuthenticationFilter supaf = new SecureUsernamePasswordAuthenticationFilter(authenticationManager);
    supaf.setAuthenticationManager(authenticationManager); // 이미 생성자로 전달했는데 또 AuthenticationManager를 전달? (🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️)

    // 인자로 건네준 String 타입의 url(default: "/login")을 주면 해당 url요청일때 자동으로 
    // AbstractAuthenticationProcessingFilter.attemptAuthentication()가 실행된다.
    supaf.setFilterProcessesUrl(null);

    // 로그인 폼의 username의 필드명
    supaf.setUsernameParameter("username");

    // 로그인 폼의 password의 필드명
    supaf.setPasswordParameter("password");

    // 생성자로부터 생성된 로그인 성공 핸들러를 로그인 필터에게 전달
    supaf.setAuthenticationSuccessHandler(this.authenticationSuccessHandler);

    // 생성자로부터 생성된 로그인 실패 핸들러를 로그인 필터에게 전달
    supaf.setAuthenticationFailureHandler(this.authenticationFailureHandler);

    // 객체가 생성된 후 프로퍼티 설정이 완료되었는지 확인하고, 필요한 값들이 모두 설정되었는지 검증 ( 해당 빈의 설정을 모두 완료한 후 호출 )
    supaf.afterPropertiesSet();

    // SecureUsernamePasswordAuthenticationFilter를 보안설정에 추가한다.
    http.addFilter(supaf);
  }

}
