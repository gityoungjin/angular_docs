package com.ddatzzi.spring.configuration;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.vote.AffirmativeBased;
import org.springframework.security.access.vote.RoleVoter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;

import com.ddatzzi.spring.security.auth.service.SecurityUserDetailsService;
import com.ddatzzi.spring.security.metadata.ReloadableFilterInvocationSecuritymetadataSource;
import com.ddatzzi.spring.security.metadata.UrlAndRoleResourcesMapLoader;

/*
 * 인증
 *    - 요청한 사용자가 누구인지 확인한다.
 *    - 사용자가 입력한 인증정보를 검증하고, 검증된 사용자 정보를 저장한다.
 * 
 * 권한부여
 *    - 인증된 사용자가 요청한 자원에 대한 권한이 있는지 확인한다.
 * 
 * 인가
 *    - 권한이 없는 사용자에 대한 처리를 수행한다.
 *    - 접근을 거부하거나 에러페이지를 출력하거나 로깅처리를 수행한다.
 * 
 * 요청 -> filter-chain 동작(인증|로그인|로그아웃|CSRF) -> 인증여부 판단(Authentication Provider|UserDetailsService) ->
 * 사용자의 권한정보 확인(Role-Based Access Control) -> controller & service & mapper
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

  // 스프링 시큐리티의 인증 관련 구성을 설정하는데 사용되는 구성 요소 중 하나.
  @Autowired
  AuthenticationConfiguration authenticationConfiguration;
  
  // 보안 구성을 위한 설정.
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    // 인증을 하지않고 접근 가능한 url
    String[] permittedUrls = {
      "/"
    };
    
    // csrf 보호기능 비활성화. ( 성능개선 but csrf공격에 대한 보호 기능 비활성화 )
    http.csrf().disable();

    /*
     * addFilterBefore
     *    - 필터 체인의 특정 필터 앞에 사용자 정의 필터를 추가하는데 사용된다.
     * 
     * authenticationProvider
     *    - 사용자 정보를 제공하는 provider를 설정한다.
     *    - ⭐️⭐️⭐️⭐️⭐️⭐️ 인증 프로바이더는 인증 처리를 수행합니다. 즉, 인증 프로바이더는 사용자의 인증 정보를 검증하여 
     *      인증에 성공하면 인증 객체(Authentication)를 생성합니다. 
     *      이때 인증 객체는 사용자가 입력한 인증 정보와 권한 정보를 담고 있습니다. 
     *      인증 객체는 인증이 필요한 서비스(보통은 웹 페이지)에서 사용되어 권한 부여를 수행하게 됩니다.
     *      인증 프로바이더는 필터에서 검증된 사용자 정보를 바탕으로 인증 객체를 생성하게 됩니다. 
     *      따라서 필터 이전에 인증 프로바이더를 적용하면 사용자 정보가 검증되지 않아 인증 객체를 생성할 수 없습니다.
     * 
     * 1. addFilterBefore()는 Security Filter Chain에 필터를 추가하고,
     * 2. authenticationProvider()는 인증 프로바이더를 등록한 후,
     * 3. authorizeHttpRequests()는 HTTP 요청에 대한 접근 권한 설정을 하는 것이다.
     */
    http
      // 권한 필터 적용
      .addFilterBefore(filterSecurityInterceptor(), FilterSecurityInterceptor.class)
      // 인증 프로바이더 적용 ( 필터 이후에 적용 해야함. )
      .authenticationProvider(authenticationProvider())
      // http 요청 접근 권한 설정
      .authorizeHttpRequests((authz) -> authz
        // 특정 url은 허용
        .antMatchers(permittedUrls).permitAll()
        // 그밖에 url은 인증된 사용자만 허용
        .anyRequest().authenticated()
      );

    return http.build();
  }

  // _________________________________________________________________________________ FilterSecurityInterceptor

  /*
   * FilterSecurityInterceptor : Spring Security의 핵심 인터셉터 중 하나로, 요청이 들어올 때마다 권한 검사 등의 필터링 처리를 담당.
   * 
   * 🌈 1. AuthenticationManger 설정.
   * 🌈 2. SecurityMetadataSocure 설정.
   * 🌈 3. AccessDecisionManager 설정.
   */
  @Bean
  public FilterSecurityInterceptor filterSecurityInterceptor() throws Exception {

    FilterSecurityInterceptor filterSecurityInterceptor = new FilterSecurityInterceptor();

    // 1. 인증 매니저를 설정. 인증 매니저는 인증에 대한 처리를 담당. ( 로그인에 성공하면 == 인증에 성공하면 -> 해당 사용자에 대한 인증 정보를 생성 )
    filterSecurityInterceptor.setAuthenticationManager(authenticationManager());

    // 2. 인가 정보를 처리하기 위한 메타데이터 소스를 설정. ( URL별 권한이나 ⭐️계층 권한⭐️ 등의 정보 )
    filterSecurityInterceptor.setSecurityMetadataSource(reloadableFilterInvocationSecurityMetadataSource());

    // 3. 권한 검사를 처리하는 AccessDecisionManager를 설정. 인증 정보를 바탕으로 사용자가 권한이 있는지 판단.
    filterSecurityInterceptor.setAccessDecisionManager(accessDecisionManager());
    
    return filterSecurityInterceptor;
  }

  // --------------------------------------------------------------------------------- 1. AuthenticationManager

  // Spring Security가 AuthenticationManagerBuilder를 사용해서 AuthenticationManager 빌드하여 반환함.
  @Bean
  public AuthenticationManager authenticationManager() throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  // --------------------------------------------------------------------------------- 1. AuthenticationManager
  // --------------------------------------------------------------------------------- 2. FilterInvocationSecurityMetadataSource
  
  @Bean
  public FilterInvocationSecurityMetadataSource reloadableFilterInvocationSecurityMetadataSource() {
    return new ReloadableFilterInvocationSecuritymetadataSource(urlAndRoleResourcesMapLoader());
  }
  
  @Bean
  public UrlAndRoleResourcesMapLoader urlAndRoleResourcesMapLoader() {
    return new UrlAndRoleResourcesMapLoader();
  }
  
  // --------------------------------------------------------------------------------- 2. FilterInvocationSecurityMetadataSource
  // --------------------------------------------------------------------------------- 3. AccessDecisionManager
  
  /*
   * AccessDecisionManager
   * 
   * 다수의 AccessDecisionVoter를 사용할 수 있다.
   * 각각의 AccessDecisionVoter는 자신이 지지하는 권한이나 역할을 기준으로 요청에 대해 허가를 판단하는 임무를 수행한다.
   * 다수의 AccessDecisionVoter를 사용할 경우 최소 하나의 voter가 승인을 하면 요청에 대한 허가가 이루어진다.
   * 
   * 🚀 다양한 voter들
   * 
   * 1. RoleVoter
   *    - Authentication객체( 로그인한 사용자 정보 )가 가진 권한 정보와 ConfigAttribute객체( 보안 설정 정보 )가 가진 권한정보를 비교한다.
   *    - setRolePrefix()메서드에서 설정한 prefix를 추가하여 비교한다. ( 기본값 "ROLE_" )
   *      예를들어 setRolePrefix()에 "ROLE_"을 입력하면
   *      "ROLE_USER"권한을 가진 ConfigAttribute객체와 "USER"권한을 가진 Authentication객체가 있을경우
   *      Authentication객체에 설정한 prefix를 붙혀서 비교한다.
   *      
   * 
   * 2. RoleHierarchyVoter
   *    - 계층 권한을 비교하기 위해 사용한다.
   *    - RoleHierarchyVoter는 RoleHierarchyImpl 객체를 이용하여 RoleHierarchy를 구성한다.
   * 
   * 3. WebExpressionVoter
   *    - url기반으로 권한을 설정할때 사용한다.
   *    - SpEL(Spring Expression Language)을 이용하여 권한을 확인할 수 있다.
   *    - WebSecurityConfig의 hasAuthority(), hasAnyAuthority(), hasRole(), hasAnyRole() 메서드를 사용하여 권한을 확인한다.
   * 
   * 4. AuthenticatedVoter
   *    - 인증 여부(로그인)를 확인하여 권한을 부여하는 Voter이다.
   *    - 인증된 사용자에게는 허용, 인증되지 않은 사용자에게는 거부되는 권한을 설정할 수 있다.
   * 
   */
  @Bean
  public AccessDecisionManager accessDecisionManager() {
    List<AccessDecisionVoter<?>> voters = new ArrayList<AccessDecisionVoter<?>>();

    RoleVoter roleVoter = new RoleVoter();
    roleVoter.setRolePrefix("");

    voters.add(roleVoter);

    return new AffirmativeBased(voters);
  }

  // --------------------------------------------------------------------------------- 3. AccessDecisionManager

  // _________________________________________________________________________________ FilterSecurityInterceptor

  /*
   * DaoAuthenticationProvider는 UserDetailsService를 구현한 객체로부터 제공하는 사용자 정보를 가지고 인증을 수행한다.
   * 
   * 1. UserDetailsService에서 제공하는 사용자 정보를 가져와서 입력받은 사용자 ID와 비밀번호와 비교한다.
   * 2. 비밀번호가 일치하면 Authentication 객체를 생성하고, 일치하지 않으면 인증 실패 예외를 발생시킨다.
   * 3. 생성된 Authentication 객체는 인증된 사용자 정보를 가지고 있으며, 이 정보를 이용해 후속 작업을 수행할 수 있다.
   */
  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

    // UserDetailsService를 구현한 객체를 전달.
    daoAuthenticationProvider.setUserDetailsService(userDetailsService());
    // 비밀번호 인코더객체 전달.
    daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());

    return daoAuthenticationProvider;
  }

  // UserDetailsService를 구현한 객체를 반환한다.
  @Bean
  public UserDetailsService userDetailsService() {
    UserDetailsService userDetailsService = new SecurityUserDetailsService();
    return userDetailsService;
  }

  // 비밀번호 인코더
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(10);
  }

}
