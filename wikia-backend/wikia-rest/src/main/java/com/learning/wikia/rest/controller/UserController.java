package com.learning.wikia.rest.controller;

import com.learning.wikia.core.logging.ILogger;
import com.learning.wikia.core.logging.LogManager;
import com.learning.wikia.model.User;
import com.learning.wikia.persistence.repositories.PostRepository;
import com.learning.wikia.persistence.repositories.UserRepository;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.LinkedList;
import java.util.List;

/**
 * Operations on user entities
 * Note : setting values to null since @JsonFilter and @JsonView do not work well with HATEOAS
 */
@RestController
@RequestMapping(value = "/users")
@Secured("ROLE_ADMIN")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private static final ILogger LOG = LogManager.getLogger(PostController.class);

    @RequestMapping(method = RequestMethod.GET)
    public List<Resource<User>> getUsers(){
        List<Resource<User>> users = new LinkedList<>();
        userRepository.findAll().forEach(user -> {
            List<Link> links = getLinks(user);
            users.add(new Resource<>(user,links));
            user.setId(null);
            user.setPassword(null);
        });
        return users;
    }

    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public Resource<User> getUser(@PathVariable String id){
        LOG.info("Fetching user by id " + id);
        User user = userRepository.findOne(id);
        Resource<User> theResource = new Resource<>(user,getLinks(user));
        user.setId(null);
        user.setPassword(null);
        return theResource;
    }

    @RequestMapping(value="/create", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Resource<User> createUser(@RequestBody @Valid User user){
        if(userRepository.countByUsername(user.getUsername()) != 0l){
            throw new RuntimeException("User names must be unique");
        }
        LOG.info("Creating user");
        user.setPassword(encoder.encode(user.getPassword()));
        user = userRepository.save(user);
        Resource<User> theResource = new Resource<>(user,getLinks(user));
        user.setId(null);
        user.setPassword(null);
        return theResource;
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public Resource<User> updateUser(@RequestBody @Valid User user, @PathVariable String id){
        LOG.info("Updating user by id " + id);
        User currentUser = userRepository.findOne(id);
        currentUser.setUsername(user.getUsername());
        currentUser.setRoles(user.getRoles());
        if(!StringUtils.isEmpty(user.getPassword()) && !currentUser.getPassword().equals(user.getPassword())){
            currentUser.setPassword(encoder.encode(user.getPassword()));
        }
        currentUser = userRepository.save(currentUser);
        Resource<User> theResource = new Resource<>(currentUser,getLinks(currentUser));
        currentUser.setId(null);
        user.setPassword(null);
        return theResource;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String id){
        LOG.info("Deleting user by id " + id);
        postRepository.deleteAllByAuthorId(id);
        userRepository.delete(id);
    }

    private List<Link> getLinks(User user) {
        List<Link> links = new LinkedList<>();
        links.add(new Link("/users/view/" + user.getId()).withRel("get_self"));
        links.add(new Link("/users/update/" + user.getId()).withRel("update_self"));
        links.add(new Link("/users/delete/" + user.getId()).withRel("delete_self"));
        return links;
    }

}
