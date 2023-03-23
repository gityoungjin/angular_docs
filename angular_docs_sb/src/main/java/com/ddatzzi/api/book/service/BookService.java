package com.ddatzzi.api.book.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ddatzzi.api.book.Repository.BookRepository;
import com.ddatzzi.api.book.vo.BookVO;

@Service
public class BookService {
  
  @Autowired
  private BookRepository bookRepository;

  public List<BookVO> selectBookList(String title) {
    return bookRepository.selectBookList(title);
  }

}
