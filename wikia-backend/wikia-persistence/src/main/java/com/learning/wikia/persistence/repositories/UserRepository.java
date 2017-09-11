package com.learning.wikia.persistence.repositories;

import com.learning.wikia.model.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Defines persistence operations for Users
 */
public interface UserRepository extends ElasticsearchRepository<User, String> {

    User findOneByUsername(String username);

    Long countByUsername(String username);

}
