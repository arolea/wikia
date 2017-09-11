package com.learning.wikia.rest.config.authentication;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

/**
 * Used as payload for login requests.
 */
public class AccountCredentials {

    private String username;
    private String password;

    private AccountCredentials(){

    }

    public AccountCredentials(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        AccountCredentials that = (AccountCredentials) o;

        return new EqualsBuilder()
                .append(username, that.username)
                .append(password, that.password)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(username)
                .append(password)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "AccountCredentials{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

}
