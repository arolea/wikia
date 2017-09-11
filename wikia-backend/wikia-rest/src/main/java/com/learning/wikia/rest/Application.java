package com.learning.wikia.rest;

import com.learning.wikia.model.Comment;
import com.learning.wikia.model.Post;
import com.learning.wikia.model.User;
import com.learning.wikia.model.UserRole;
import com.learning.wikia.persistence.repositories.PostRepository;
import com.learning.wikia.persistence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

/**
 * Application boot.
 */
@SpringBootApplication
public class Application implements CommandLineRunner {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ElasticsearchTemplate template;

    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }

    @Override
    public void run(String... strings) throws Exception {
        template.deleteIndex(User.class);
        template.deleteIndex(Post.class);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User firstUser = new User("admin", encoder.encode("admin"));
        Set<UserRole> roles = new HashSet<>();
        roles.add(UserRole.ROLE_ADMIN);
        firstUser.setRoles(roles);
        firstUser = repository.save(firstUser);

        User secondUser = new User("user", encoder.encode("user"));
        roles = new HashSet<>();
        roles.add(UserRole.ROLE_USER);
        secondUser.setRoles(roles);
        secondUser = repository.save(secondUser);

        createPosts(firstUser);
        createPosts(secondUser);

    }

    private void createPosts(User firstUser) {
        for (int i = 0; i < 20; i++) {
            String content = "Content " + i;
            if (i % 3 == 0) {
                content = "Some more complex content for full text search";
            }
            Post currentPost = new Post(firstUser.getId(), "Title " + i, content, i % 2 == 0);
            List<Comment> comments = new LinkedList<>();
            for (int j = 0; j < 2; j++) {
                comments.add(new Comment(firstUser.getUsername(), "Content " + j));
            }
            currentPost.setComments(comments);
            currentPost.setDateCreated(LocalDateTime.now().minusDays(i));
            postRepository.save(currentPost);
        }
    }
}
