package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	@Query
	void deleteByClientid(Integer clixent_id);
}
