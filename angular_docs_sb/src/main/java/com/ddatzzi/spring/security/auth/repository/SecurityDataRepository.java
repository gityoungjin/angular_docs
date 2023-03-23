package com.ddatzzi.spring.security.auth.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ddatzzi.spring.security.auth.vo.SecurityUserVO;

@Repository
public class SecurityDataRepository {
 
  /*
   * SELECT USERNAME
   *        ...
   * FROM USER
   * WHERE USERNAME = #{username}
   */
  public SecurityUserVO loadUserByUserName(String username) {
    return null;
  }

  /*
   * username에 
   * SELECT A.AUTH_CD
   * FROM AUTH_USER A
   * INNER JOIN AUTH B ON A.AUTH_CD = B.AUTH_CD
   * WHERE A.USERNAME = #{username} 
   */
  public List<String> loadUserAuthoritiesByUsername(String username) {
    return null;
  }

}
