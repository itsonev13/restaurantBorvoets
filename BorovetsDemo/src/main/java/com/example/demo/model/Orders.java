package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Orders {
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	@Column(name = "dish_id")
	private Integer dish_id;
	@Column(name = "dish_name")
	private String dish_name;
	@Column(name = "quantity")
	private Integer quantity;
	@Column(name = "client_id")
	private Integer clientid;

	public Orders() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getDish_id() {
		return dish_id;
	}

	public void setDish_id(Integer dish_id) {
		this.dish_id = dish_id;
	}

	public String getDish_name() {
		return dish_name;
	}

	public void setDish_name(String dish_name) {
		this.dish_name = dish_name;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getClient_id() {
		return clientid;
	}

	public void setClient_id(Integer client_id) {
		this.clientid = client_id;
	}

}
