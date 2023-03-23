package com.ddatzzi.api.book.Repository;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.ddatzzi.api.book.vo.Book;

@Repository
public class BookRepository {

  private final MongoTemplate mongoTemplate;
  
  public BookRepository(MongoTemplate mongoTemplate) {
    this.mongoTemplate = mongoTemplate;
  }
  
  public List<Book> selectBookList(String title) {
    // return mongoTemplate.find(
    //   Query.query(Criteria.where("title").regex(title, "i").and("deletedAt").is(null)),
    //   BookVO.class
    // );
    
    // Query q = new Query();
    // return mongoTemplate.find(q, Book.class);
    
    return mongoTemplate.findAll(Book.class, "books");
  }

}
