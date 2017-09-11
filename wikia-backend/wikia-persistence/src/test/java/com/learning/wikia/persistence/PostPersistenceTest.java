package com.learning.wikia.persistence;

import com.learning.wikia.model.Comment;
import com.learning.wikia.model.Post;
import com.learning.wikia.persistence.config.PersistenceConfig;
import com.learning.wikia.persistence.repositories.PostRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests persistence operations for Posts
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {PersistenceConfig.class})
@ActiveProfiles(profiles = {"test"})
public class PostPersistenceTest {

    private static final int NUMBER_OF_POSTS = 20;
    private static final int NUMBER_OF_COMMENTS = 2;

    @Autowired
    private PostRepository repository;

    @Autowired
    private ElasticsearchTemplate template;

    @Before
    public void before() {
        template.deleteIndex(Post.class);
    }

    @Test
    public void testBasicOperations() {
        // create some posts
        for( int i = 0 ; i < NUMBER_OF_POSTS; i ++ ){
            String content = "Content " + i;
            if( i % 3 == 0 ){
                content = "Some more complex content for full text search";
            }
            Post currentPost = new Post("Author"+i,"Title " + i, content, i % 2 == 0 );
            List<Comment> comments = new LinkedList<>();
            for ( int j = 0 ; j < NUMBER_OF_COMMENTS; j ++ ){
                comments.add(new Comment("Author" + j,"Content " + j));
            }
            currentPost.setComments(comments);
            currentPost.setDateCreated(LocalDateTime.now().minusDays(i));
            repository.save(currentPost);
        }

        // basic paging
        for( int i = 0 ; i < 3 ; i ++ ) {
            System.out.println("Page " + i );
            repository.findAllByAuthorIdOrVisible(new PageRequest(i, 5, Sort.Direction.DESC, "dateCreated"),"Author3",true).forEach(System.out::println);
        }

        // content based paging
        for( int i = 0 ; i < 3 ; i ++ ) {
            System.out.println("Page " + i );
            repository.findByContent(new PageRequest(i, 5, Sort.Direction.DESC, "dateCreated"),"Author3", "more complex").forEach(System.out::println);
        }

        assertThat(repository.count()).as("Number of posts").isEqualTo(NUMBER_OF_POSTS);

    }

}
