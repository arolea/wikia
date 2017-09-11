package com.learning.wikia.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * Models a post comment
 */
public class Comment implements Serializable {

    @NotNull
    private String authorName;
    @NotNull
    private String content;

    private Comment(){

    }

    public Comment(String authorName, String content) {
        this.authorName = authorName;
        this.content = content;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Comment comment = (Comment) o;

        return new EqualsBuilder()
                .append(authorName, comment.authorName)
                .append(content, comment.content)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(authorName)
                .append(content)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "Comment{" +
                "authorName='" + authorName + '\'' +
                ", content='" + content + '\'' +
                '}';
    }

}
