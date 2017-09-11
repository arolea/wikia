package com.learning.wikia.persistence.repositories;

import com.learning.wikia.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

/**
 * Defines persistence operations for Posts
 */
public interface PostRepository extends ElasticsearchRepository<Post, String> {

    Page<Post> findAllByAuthorIdOrVisible(Pageable page, String authorId, boolean visible);

    @Query("{\"bool\" : {\n" +
            "            \"must\" : {\n" +
            "                \"bool\" : {\n" +
            "                    \"should\" : [\n" +
            "                        { \"term\" : { \"visible\" : \"true\" } },\n" +
            "                        { \"match\" : { \"authorId\" : \"?0\" } }\n" +
            "                        ]\n" +
            "                }\n" +
            "                },\n" +
            "            \"must\" : { \n" +
            "                   \"match_phrase\" : { \"content\" : \"?1\" } }\n" +
            "           }\n" +
            "}")
    Page<Post> findByContent(Pageable page, String authorId, String content);

    List<Post> findAllByContentLike(String content);

    Long countByAuthorIdOrVisible(String authorId, boolean visible);

    void deleteAllByAuthorId(String authorId);

}
