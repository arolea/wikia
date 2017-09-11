package com.learning.wikia.rest.config.authentication;

import com.learning.wikia.core.logging.ILogger;
import com.learning.wikia.core.logging.LogManager;
import com.learning.wikia.persistence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * Custom UserDetailsService implementation
 */
@Component
public class WikiaUserDetailsService implements UserDetailsService {

    private static final ILogger LOG = LogManager.getLogger(WikiaUserDetailsService.class);

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            return new WikiaUserDetails(repository.findOneByUsername(username));
        } catch ( Exception e ){
            throw new RuntimeException("Login failed");
        }
    }

}
