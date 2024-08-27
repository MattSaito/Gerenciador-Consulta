package com.vh.hms.domain.user;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "USERS")

public class User implements Serializable, UserDetails {
    private final static long serialVersionUID = 1l;
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID userUUID;
    private String login;
    private String password;
    private UserRole role;

    public User(UUID userUUID, String login, String password, UserRole role) {
        this.userUUID = userUUID;
        this.login = login;
        this.password = password;
        this.role = role;
    }

    public User() {}

    public User(String login, String password, String userRole) {
        this.login = login;
        this.password = password;
        this.role = UserRole.valueOf(userRole);
    }

    public User(String login, String password, UserRole userRole) {
        this.login = login;
        this.password = password;
        this.role = userRole;
    }

    public UUID getUserUUID() {
        return userUUID;
    }

    public void setUserUUID(UUID userUUID) {
        this.userUUID = userUUID;
    }

    public String getLogin() {
        return login;
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

    public void setLogin(String username) {
        this.login = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_PATIENT"), new SimpleGrantedAuthority("ROLE_DOCTOR"));
        else if (this.role == UserRole.PATIENT) return List.of(new SimpleGrantedAuthority("ROLE_PATIENT"));
        else return List.of(new SimpleGrantedAuthority("ROLE_DOCTOR"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(userUUID, user.userUUID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userUUID);
    }
}
