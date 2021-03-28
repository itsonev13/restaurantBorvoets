package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "role")
public class Role implements GrantedAuthority {

	@Id
	@GeneratedValue(generator = "uuid-string")
	@GenericGenerator(name = "uuid-string", strategy = "org.hibernate.id.UUIDGenerator")
	@Column(name = "id", nullable = false, unique = true, updatable = false)
	private String id;
	@Column()
	private String authority;

	public Role(String authority) {
		this.authority = authority;
	}

	public Role() {
		super();
	}

	@Override
	public String getAuthority() {
		return this.authority;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}
}
