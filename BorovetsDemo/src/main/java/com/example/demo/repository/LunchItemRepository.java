package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.LunchItem;

public interface LunchItemRepository extends JpaRepository<LunchItem, Integer> {

}
