package com.ddatzzi.spring.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import com.ddatzzi.spring.security.auth.service.SecurityDataService;
import com.ddatzzi.spring.security.auth.vo.SecurityUserVO;

// AuthenticationSuccessHandler : 인증 성공 후 실행될 사용자 지정 로직을 구현할 수 있는 인터페이스
public class SecureAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

  // onAuthenticationSuccess()에서 인증된 유저의 정보를 이용하여 메뉴나 아이피정보 등을 db로부터 가져와 사용하기 위함.
  private SecurityDataService securityDataService;

  public SecureAuthenticationSuccessHandler(SecurityDataService securityDataService) {
    this.securityDataService = securityDataService;
  }
  
  // AuthenticationSuccessHandler 인터페이스에 정의됨. 인증 성공후 실행될 사용자 정의 로직을 구현할 수 있는 메서드.
  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    
    // spring security에서 인증된 사용자 정보를 가져온다.
    SecurityUserVO userVO = (SecurityUserVO)authentication.getPrincipal();
    // spring security에서 인증된 사용자의 추가적인 정보를 가져온다.
    WebAuthenticationDetails webDetails = (WebAuthenticationDetails)authentication.getDetails();
    HttpSession session = request.getSession();

    /*
     * 로그인에 성공했을 때 로직을 작성한다.
     * 세션이나 로그인한 유저의 권한에 따라 메뉴를 구성하거나
     * 아이피 주소를 이용하거나 로그를 작성한다.
     * 로그인 이후 화면을 포워딩하기도 한다.
     */
  }

}
