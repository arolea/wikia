package com.learning.wikia.rest.controller;

import com.learning.wikia.core.logging.ILogger;
import com.learning.wikia.core.logging.LogManager;
import com.learning.wikia.model.Comment;
import com.learning.wikia.model.Post;
import com.learning.wikia.persistence.repositories.PostRepository;
import com.learning.wikia.rest.config.authentication.WikiaUserDetails;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Operations on post entities
 * Note : setting values to null since @JsonFilter and @JsonView do not work well with HATEOAS
 */
@RestController
@RequestMapping(value = "/posts")
public class PostController {

    @Autowired
    private PostRepository repository;

    private static final ILogger LOG = LogManager.getLogger(PostController.class);

    @RequestMapping(method = RequestMethod.GET)
    public List<Resource<Post>> getPosts(@RequestParam(value = "pageIndex") int pageIndex,
                                         @RequestParam(value = "pageSize") int pageSize,
                                         @RequestParam(value= "content" , required = false) String content,
                                         Authentication authentication){
        String userId = ((WikiaUserDetails) authentication.getPrincipal()).getUserId();
        Page<Post> postPage;
        if(content == null || StringUtils.isEmpty(content)){
            postPage = repository.findAllByAuthorIdOrVisible(new PageRequest(pageIndex,pageSize, Sort.Direction.DESC,"_id"),userId,true);
        } else {
            postPage = repository.findByContent(new PageRequest(pageIndex,pageSize, Sort.Direction.DESC,"_id"),userId,content);
        }
        List<Resource<Post>> posts = new LinkedList<>();
        postPage.forEach(post->{
            List<Link> links = getLinks(post, userId);
            posts.add(new Resource<>(post,links));
            post.setId(null);
            post.setAuthorId(null);
            post.setContent(null);
            post.setComments(null);
            post.setVisible(null);
        });
        return posts;
    }

    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public Resource<Post> getPost(@PathVariable String id, Authentication authentication){
        LOG.info("Fetching post by id " + id);
        String userId = ((WikiaUserDetails) authentication.getPrincipal()).getUserId();
        Post post = repository.findOne(id);
        Resource<Post> theResource = new Resource<>(post,getLinks(post, userId));
        post.setId(null);
        post.setAuthorId(null);
        return theResource;
    }

    @RequestMapping(value= "/create", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Resource<Post> createPost(@RequestBody @Valid Post post, Authentication authentication){
        LOG.info("Creating new post");
        String userId = ((WikiaUserDetails) authentication.getPrincipal()).getUserId();
        post.setAuthorId(userId);
        post.setDateCreated(LocalDateTime.now());
        post = repository.save(post);
        Resource<Post> theResource = new Resource<>(post,getLinks(post, userId));
        post.setId(null);
        post.setAuthorId(null);
        return theResource;
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public Resource<Post> updatePost(@PathVariable String id, @RequestBody @Valid Post post, Authentication authentication){
        LOG.info("Updating post by id " + id);
        String userId = ((WikiaUserDetails) authentication.getPrincipal()).getUserId();
        post.setId(id);
        post.setAuthorId(userId);
        post = repository.save(post);
        Resource<Post> theResource = new Resource<>(post,getLinks(post, userId));
        post.setId(null);
        post.setAuthorId(null);
        return theResource;
    }

    @RequestMapping(value = "/addComment/{id}", method = RequestMethod.PATCH)
    public Resource<Post> addComment(@PathVariable String id, @RequestBody @Valid Comment comment, Authentication authentication){
        LOG.info("Adding comment to post " + id);
        String userId = ((WikiaUserDetails) authentication.getPrincipal()).getUserId();
        Post post = repository.findOne(id);
        if(post.getComments()==null){
            post.setComments(new LinkedList<>());
        }
        post.getComments().add(comment);
        post = repository.save(post);
        Resource<Post> theResource = new Resource<>(post,getLinks(post, userId));
        post.setId(null);
        post.setAuthorId(null);
        return theResource;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable String id ){
        LOG.info("Deleting post by id " + id);
        repository.delete(id);
    }

    @RequestMapping(value = "/count", method = RequestMethod.GET)
    public Long countPosts(@RequestParam(value= "content" , required = false) String content,
                           Authentication authentication){
        String userId = ((WikiaUserDetails) authentication.getPrincipal()).getUserId();
        if(content == null || StringUtils.isEmpty(content)){
            return repository.countByAuthorIdOrVisible(userId,true);
        } else {
            long counter = repository.findAllByContentLike(content)
                    .stream()
                    .filter(post->post.getAuthorId().equals(userId) || post.getVisible())
                    .collect(Collectors.counting());
            return counter;
        }
    }

    private List<Link> getLinks(Post post, String userId) {
        List<Link> links = new LinkedList<>();
        links.add(new Link("/posts/view/" + post.getId()).withRel("get_self"));
        links.add(new Link("/posts/addComment/" + post.getId()).withRel("comment_self"));
        if(post.getAuthorId().equals(userId)) {
            links.add(new Link("/posts/update/" + post.getId()).withRel("update_self"));
            links.add(new Link("/posts/delete/" + post.getId()).withRel("delete_self"));
        }
        return links;
    }



}
