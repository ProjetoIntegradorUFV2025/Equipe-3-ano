package com.provaConceito.provaConceito;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ProvaConceitoApplication extends SpringBootServletInitializer {
  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(ProvaConceitoApplication.class);
  }

  public static void main(String[] args) {
    SpringApplication.run(ProvaConceitoApplication.class, args);
  }

}
