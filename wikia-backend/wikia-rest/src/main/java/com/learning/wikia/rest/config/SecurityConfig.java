package com.learning.wikia.rest.config;

import com.learning.wikia.persistence.repositories.UserRepository;
import com.learning.wikia.rest.config.filters.CORSFilter;
import com.learning.wikia.rest.config.jwt.JWTLoginFilter;
import com.learning.wikia.rest.config.authentication.WikiaUserDetailsService;
import com.learning.wikia.rest.config.jwt.JWTAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfFilter;

/**
 * Security configuration
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private WikiaUserDetailsService userDetailsService;

    @Autowired
    private UserRepository repository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers(HttpMethod.OPTIONS,"**").permitAll()
                .mvcMatchers(HttpMethod.POST,"/login/**","/logout/**").permitAll()
                .mvcMatchers("/error/**").permitAll()
                .mvcMatchers("/users/**").authenticated()
                .mvcMatchers("/posts/**").authenticated()
                .anyRequest().authenticated()
                .and().requiresChannel()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // JWT
                .and().csrf().disable()
                .addFilterBefore(new JWTLoginFilter("/login", authenticationManager()), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JWTAuthenticationFilter(repository), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new CORSFilter(),CsrfFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(getPasswordEncoder());
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
