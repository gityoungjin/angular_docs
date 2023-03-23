package com.ddatzzi.api.book.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ddatzzi.api.book.service.BookService;
import com.ddatzzi.api.book.vo.BookVO;

@RestController
@RequestMapping()
public class BookController {
  
  @Autowired
  private BookService bookService;
  
  @GetMapping(value = "/")
  public ResponseEntity<List<BookVO>> selectBookList(HttpServletRequest requset, HttpServletResponse response, @Param("title") String title) throws Exception {
    System.out.println(title);
    List<BookVO> data = bookService.selectBookList(title);
    System.out.println(data);
    return new ResponseEntity<List<BookVO>>(data, HttpStatus.OK);
  }

}
