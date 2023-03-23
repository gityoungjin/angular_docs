package com.ddatzzi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class WebApplication extends SpringBootServletInitializer{

  static{
    System.setProperty("spring.config.location", "classpath:/config/application.yml,classpath:/config/project.yml");
  }

	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(WebApplication.class);
  }

}
