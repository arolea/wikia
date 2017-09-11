package com.learning.wikia.rest.config.authentication;

import com.learning.wikia.model.User;
import com.learning.wikia.model.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;

import java.util.Collection;

/**
 * Custom UserDetails implementation
 */
public class WikiaUserDetails implements UserDetails {

    private static final long serialVersionUID = 1L;
    private Collection<? extends GrantedAuthority> authorities;
    private String userId;
    private String username;
    private String password;
    private boolean isAdmin;

    public WikiaUserDetails(User user) {
        String roles = StringUtils.collectionToCommaDelimitedString(user.getRoles());
        this.authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
        this.userId = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.isAdmin = user.getRoles().contains(UserRole.ROLE_ADMIN);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getUserId() {
        return userId;
    }

    public Boolean isAdmin() { return isAdmin; }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

}
