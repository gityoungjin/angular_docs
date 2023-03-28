package com.ddatzzi.spring.security.authentication;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ddatzzi.common.util.YamlUtil;

/*
 * UsernamePasswordAuthenticationFilter : 기본적으로 사용자의 이름과 비밀번호를 인증하는데 사용. ( AuthenticationManager를 사용함 )
 *  - 인증에 성공하면 AuthenticationSuccessHandler를 호출하여 로그인 성공 후의 동작을 처리
 *  - 인증에 실패하면 AuthenticationFailureHandler를 호출하여 로그인 실패 후의 동작을 처리
 */
public class SecureUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
  
  // 생성자를 통해 부모(AbstractAuthenticationProcessingFilter)에게 AuthenticationManager를 전달함
  public SecureUsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager) {
    super.setAuthenticationManager(authenticationManager);
  }

  // 부모의 setAuthenticationManager() 오버라이드 ( 이 코드가 꼭 필요한지 모르겠음 🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️ )
  @Override
  public void setAuthenticationManager(AuthenticationManager authenticationManager) {
    super.setAuthenticationManager(authenticationManager);
  }

  /*
   * SecureUsernamePasswordAuthenticationFilter의 setFilterProcessesUrl()에서 설정한 url(default : "/login")로 요청이 들어올때 자동 실행.
   */
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

    // obtainUsername() 로그인 폼의 "username" 필드의 값을 추출. 필드 명이 다를 경우 obtainUsername() 함수를 오버라이드 하여 사용 가능.
    String username = obtainUsername(request);
    username = ( username != null ) ? username : "";
    username = username.trim();

    // obtainPassword() 로그인 폼의 "password" 필드의 값을 추출. 필드 명이 다를 경우 obtainPassword() 함수를 오버라이드 하여 사용 가능.
    String password = obtainPassword(request);
    password = ( password != null ) ? password : "";

    HttpSession session = request.getSession();

    if ( username.isEmpty() ) {
      username = (String)session.getAttribute("SESS_USER_ID");
    }
    
    // credentials
    Map<String, Object> authConfig = YamlUtil.readYaml("/config/constants.yml", "auth");
    String credentials = (String)authConfig.get("credentials");

    String input_password = (String)session.getAttribute("SESS_USER_PW");
    if ( input_password != null && !input_password.isEmpty() ) {
      credentials = input_password;
      session.setAttribute("SESS_USER_PW", null);
    }

    SecureUsernamePasswordAuthenticationToken authRequest = new SecureUsernamePasswordAuthenticationToken(username, credentials);

    setDetails(request, authRequest);
    return this.getAuthenticationManager().authenticate(authRequest);
  }

}
