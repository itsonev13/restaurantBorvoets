package com.example.demo.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.MenuItem;
import com.example.demo.repository.MenuItemRepository;

@RestController
@RequestMapping(value = "/rest/menuitems")
public class MenuItemResource {
	@Autowired
	MenuItemRepository mip;

	@GetMapping(value = "/all")
	public List<MenuItem> getall() {
		return mip.findAll();
	}

	@PostMapping(value = "/load")
	public List<MenuItem> persist(@RequestBody final MenuItem items) {
		mip.save(items);
		return mip.findAll();
	}

}