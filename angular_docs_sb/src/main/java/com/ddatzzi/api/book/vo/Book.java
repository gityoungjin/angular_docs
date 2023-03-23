package com.ddatzzi.api.book.vo;

import java.util.Date;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Book {
  
  @Id
  private String id;
  private String title;
  private String description;
  private String author;
  private int rating;
  private Date createdAt;
  private Date updatedAt;
  private Date deletedAt;

}
