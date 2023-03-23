package com.ddatzzi.spring.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
  
  // 보안 구성을 위한 설정.
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    
    // csrf 보호기능 비활성화. ( 성능개선 but csrf공격에 대한 보호 기능 비활성화 )
    http.csrf().disable();

    http.addFilterBefore(null, null);

    return http.build();
  }

  /*
   * FilterSecurityInterceptor : Spring Security의 핵심 인터셉터 중 하나로, 요청이 들어올 때마다 권한 검사 등의 필터링 처리를 담당.
   * 
   * 🌈 AuthenticationManger 설정.
   * 🌈 SecurityMetadataSocure 설정.
   * 🌈 AccessDecisionManager 설정.
   */
  @Bean
  public FilterSecurityInterceptor filterSecurityInterceptor() throws Exception {

    FilterSecurityInterceptor filterSecurityInterceptor = new FilterSecurityInterceptor();

    // 인증 매니저를 설정. 인증 매니저는 인증에 대한 처리를 담당. ( 로그인에 성공하면 == 인증에 성공하면 -> 해당 사용자에 대한 인증 정보를 생성 )
    filterSecurityInterceptor.setAuthenticationManager(null);

    // 인가 정보를 처리하기 위한 메타데이터 소스를 설정. ( URL별 권한이나 ⭐️계층 권한⭐️ 등의 정보 )
    filterSecurityInterceptor.setSecurityMetadataSource(null);

    // 권한 검사를 처리하는 AccessDecisionManager를 설정. 인증 정보를 바탕으로 사용자가 권한이 있는지 판단.
    filterSecurityInterceptor.setAccessDecisionManager(null);
    
    return filterSecurityInterceptor;
  }

  // @Bean
  // public AuthenticationManager

}
