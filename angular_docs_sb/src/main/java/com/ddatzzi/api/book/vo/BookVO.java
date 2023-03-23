package com.ddatzzi.api.book.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class BookVO {
  
  private String title;
  private String description;
  private String author;
  private int rating;
  private Date createdAt;
  private Date updatedAt;
  private Date deletedAt;

}
