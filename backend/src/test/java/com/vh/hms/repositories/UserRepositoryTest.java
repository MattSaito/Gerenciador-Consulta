package com.vh.hms.repositories;

import com.vh.hms.domain.user.User;
import com.vh.hms.domain.user.UserRole;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import jakarta.persistence.EntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class UserRepositoryTest {

    @Autowired
    EntityManager entityManager;

    @Test
    @DisplayName("Should save and find a user")
    void shouldSaveAndFetchUser() {
        User user = new User();
        user.setLogin("user");
        user.setPassword("123456789");
        user.setRole(UserRole.ADMIN);

        entityManager.persist(user);

        User foundUser = entityManager.find(User.class, user.getUserUUID());

        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getUserUUID()).isEqualTo(user.getUserUUID());
        assertThat(foundUser.getLogin()).isEqualTo("user");
        assertThat(foundUser.getPassword()).isEqualTo("123456789");
        assertThat(foundUser.getRole()).isEqualTo(UserRole.ADMIN);
    }
}
