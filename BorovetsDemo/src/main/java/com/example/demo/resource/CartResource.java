package com.example.demo.resource;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Optional;
import java.util.Queue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.model.Client;
import com.example.demo.model.Fullorder;
import com.example.demo.model.Idint;
import com.example.demo.model.LunchItem;
import com.example.demo.model.MenuItem;
import com.example.demo.model.Orders;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.LunchItemRepository;
import com.example.demo.repository.MenuItemRepository;
import com.example.demo.repository.OrdersRepository;

@Controller
public class CartResource {
	@Autowired
	MenuItemRepository mip;
	@Autowired
	LunchItemRepository lir;
	Queue<Fullorder> orders = new LinkedList<>();
	@Autowired
	ClientRepository cr;
	@Autowired
	OrdersRepository or;

	@PostMapping(value = "/addtocart")
	public @ResponseBody MenuItem addtocart(@RequestBody Idint id, Model model) {
		Optional<MenuItem> fullItem = mip.findById(id.getId());
		if (fullItem.isPresent()) {

			return fullItem.get();
		} else {
			return null;
		}
	}

	@PostMapping(value = "/addtocartLunch")
	public @ResponseBody LunchItem addtocartlunch(@RequestBody Idint id, Model model) {
		Optional<LunchItem> fullItem = lir.findById(id.getId());
		if (fullItem.isPresent()) {
			return fullItem.get();
		} else {
			return null;
		}
	}

	@GetMapping(value = "/kitchen")
	public String kitchen(Model model) {
		model.addAttribute("client", cr.findAll());
		model.addAttribute("orders", or.findAll());
		return "kitchen";
	}

	@PostMapping(value = "/kitchen")
	public String kitchenupdate(Model model) {
		model.addAttribute("client", cr.findAll());
		model.addAttribute("orders", or.findAll());
		return "kitchen";
	}

	@PostMapping(value = "/order")
	public @ResponseBody String order(@RequestBody Fullorder fullorder, Model model) {
		Client client = new Client();
		ArrayList<Orders> allOrders = new ArrayList<>();
		client.setEmail(fullorder.getCustomer().getEmail());
		client.setName(fullorder.getCustomer().getName());
		client.setPhone(fullorder.getCustomer().getPhone());
		client.setAddress(fullorder.getCustomer().getAddress());
		client.setNote(fullorder.getCustomer().getNote());
		cr.save(client);
		////////////////////////////////////////////////////////
		Optional<Client> x = cr.findByPhone(client.getPhone());
		if (x.isPresent()) {
			int client_id = x.get().getId();
			for (int i = 0; i < fullorder.getOrders().length; i++) {
				Orders order = new Orders();
				order.setClient_id(client_id);
				order.setDish_id(Integer.parseInt(fullorder.getOrders()[i].getId()));
				order.setDish_name(fullorder.getOrders()[i].getName());
				order.setQuantity(Integer.parseInt(fullorder.getOrders()[i].getQuantity()));
				allOrders.add(order);
			}
			or.saveAll(allOrders);
		}

		return "order";
	}

	@Transactional
	@PostMapping(value = "/ordy")
	public @ResponseBody String ordready(@RequestBody Idint client, Model model) {
		or.deleteByClientid(client.getId());
		cr.deleteById(client.getId());
		return "orderready";
	}
}
