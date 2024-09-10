package com.example.clinicalconcepts.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("*")  // Allows requests from any origin
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allows these HTTP methods
                .allowedHeaders("*")  // Allows all headers
                .allowCredentials(false);  // Credentials like cookies are not allowed
    }
}
