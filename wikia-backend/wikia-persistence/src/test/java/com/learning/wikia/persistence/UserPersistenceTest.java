package com.learning.wikia.persistence;

import com.learning.wikia.model.User;
import com.learning.wikia.model.UserRole;
import com.learning.wikia.persistence.config.PersistenceConfig;
import com.learning.wikia.persistence.repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests persistence operations for Users
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {PersistenceConfig.class})
@ActiveProfiles(profiles = {"test"})
public class UserPersistenceTest {

    @Autowired
    private UserRepository repository;

    @Autowired
    private ElasticsearchTemplate template;

    @Before
    public void before() {
        template.deleteIndex(User.class);
    }

    @Test
    public void testBasicOperations() {
        User user = new User("username","password");
        Set<UserRole> roles = new HashSet<>();
        roles.add(UserRole.ROLE_ADMIN);
        roles.add(UserRole.ROLE_USER);
        user.setRoles(roles);

        // test create
        user = repository.save(user);
        // test count
        assertThat(repository.count()).as("User count").isEqualTo(1);
        assertThat(user.getId()).as("The generated id is not null").isNotNull();
        assertThat(user.getRoles()).as("Roles are persisted and fetched").isNotNull();
        assertThat(user.getRoles().contains(UserRole.ROLE_ADMIN)).as("Admin role is fetched").isTrue();
        assertThat(user.getRoles().contains(UserRole.ROLE_USER)).as("User role is fetched").isTrue();
        // test find by id
        assertThat(repository.findOne(user.getId())).as("Entity from db").isEqualTo(user);

        // test update
        roles.remove(UserRole.ROLE_ADMIN);
        user.setRoles(roles);
        user = repository.save(user);
        assertThat(user.getRoles()).as("Roles are persisted and fetched").isNotNull();
        assertThat(user.getRoles().contains(UserRole.ROLE_ADMIN)).as("Admin role is removed").isFalse();
        assertThat(user.getRoles().contains(UserRole.ROLE_USER)).as("User role is fetched").isTrue();

        // test find all
        repository.save(new User("secondUsername","secondPassword"));
        Iterable<User> users = repository.findAll();
        List<User> userList = new ArrayList<>();
        users.forEach(userList::add);
        assertThat(userList.size()).as("User count").isEqualTo(2);

        assertThat(repository.findOneByUsername("username")).as("Find bu username").isNotNull();

        // test delete by id
        repository.delete(user.getId());
        assertThat(repository.count()).as("User count").isEqualTo(1);

        // test delete all
        repository.deleteAll();
        assertThat(repository.count()).as("User count").isEqualTo(0);
    }

}
