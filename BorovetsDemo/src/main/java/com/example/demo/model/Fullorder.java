package com.example.demo.model;

public class Fullorder {
	private Orderitem[] orders;
	private Customer customer;

	public Fullorder() {

	}

	public Orderitem[] getOrders() {
		return orders;
	}

	public void setOrders(Orderitem[] orders) {
		this.orders = orders;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

}
