package com.learning.wikia.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

/**
 * Models a wiki post
 */
@Document(indexName = "posts", type = "post", shards = 3, replicas = 2)
public class Post implements Serializable {

    @Id
    private String id;
    private String authorId;
    @NotNull
    private String title;
    @NotNull
    private String content;
    @Field(type=FieldType.Attachment,includeInParent = true, store = true)
    private List<Comment> comments;
    @NotNull
    private Boolean visible;
    @Field(type=FieldType.Date,includeInParent = true, store = true)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime dateCreated;

    private Post(){

    }

    public Post(String authorId, String title, String content, Boolean visible) {
        this.authorId = authorId;
        this.title = title;
        this.content = content;
        this.visible = visible;
        this.comments = new LinkedList<>();
        this.dateCreated = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Post post = (Post) o;

        return new EqualsBuilder()
                .append(id, post.id)
                .append(authorId, post.authorId)
                .append(title, post.title)
                .append(content, post.content)
                .append(comments, post.comments)
                .append(visible, post.visible)
                .append(dateCreated, post.dateCreated)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(authorId)
                .append(title)
                .append(content)
                .append(comments)
                .append(visible)
                .append(dateCreated)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", authorId=" + authorId +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", comments=" + comments +
                ", visible=" + visible +
                ", dateCreated=" + dateCreated +
                '}';
    }

}
