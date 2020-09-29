package com.example.demo.resource;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.model.Admin;
import com.example.demo.model.LunchItem;
import com.example.demo.model.MenuItem;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.CoursesRepository;
import com.example.demo.repository.LunchItemRepository;
import com.example.demo.repository.MenuItemRepository;

@Controller
public class WebResource {
	@Autowired
	MenuItemRepository mip;
	@Autowired
	CoursesRepository cr;
	@Autowired
	LunchItemRepository li;
	@Autowired
	AdminRepository ar;
	boolean logedin = false;

	@GetMapping(value = "/menu")
	public String hello(Model model) {
		model.addAttribute("courses", cr.findAll());
		model.addAttribute("menuitems", mip.findAll());
		return "menu";
	}

	@GetMapping(value = "/home")
	public String home(Model model) {

		return "index";
	}

	@GetMapping(value = "/lunch")
	public String lunch(Model model) {
		model.addAttribute("lunchitems", li.findAll());
		return "lunch";
	}

	@GetMapping(value = "/adminmenu")
	public String adminmenu(Model model) {
		if (logedin) {
			model.addAttribute("courses", cr.findAll());
			model.addAttribute("menuitems", mip.findAll());
			return "adminmenu";
		} else
			return "error";
	}

	@GetMapping(value = "/adminlunch")
	public String adminlunch(Model model) {
		if (logedin) {
			model.addAttribute("lunchitems", li.findAll());
			return "adminlunch";
		} else
			return "error";
	}

	@GetMapping(value = "/delete/{menuitem_id}")
	public String delete(@PathVariable int menuitem_id, Model model) {
		Optional<MenuItem> menu = mip.findById(menuitem_id);
		if (menu.isPresent()) {
			mip.delete(menu.get());
			return "redirect:/adminmenu";

		} else {
			throw new RuntimeException("MenuItem is not found");
		}
	}

	@GetMapping(value = "/deleteLunch/{lunchitem_id}")
	public String deleteLunch(@PathVariable int lunchitem_id, Model model) {
		Optional<LunchItem> lunch = li.findById(lunchitem_id);
		if (lunch.isPresent()) {
			li.delete(lunch.get());
			return "redirect:/adminlunch";

		} else {
			throw new RuntimeException("LunchItem is not found");
		}
	}

	@GetMapping(value = "/add/{course_id}/{name}/{price}/{description}")
	public String add(@PathVariable int course_id, @PathVariable String name, @PathVariable double price,
			@PathVariable String description, Model model) {
		MenuItem newitem = new MenuItem();
		newitem.setName(name);
		newitem.setPrice(price);
		if (!description.equalsIgnoreCase("no description")) {
			newitem.setDescription(description);
		}
		newitem.setCourse_id(course_id);
		mip.save(newitem);
		return "add";
	}

	@GetMapping(value = "/addLunch/{name}/{price}/{description}")
	public String addLunch(@PathVariable String name, @PathVariable double price, @PathVariable String description,
			Model model) {
		LunchItem newitem = new LunchItem();
		newitem.setName(name);
		newitem.setPrice(price);
		if (!description.equalsIgnoreCase("no description")) {
			newitem.setDescription(description);
		}
		li.save(newitem);
		return "addLunch";
	}

	@PostMapping(value = "/check")
	public @ResponseBody boolean check(@RequestBody Admin admin, Model model) {
		Optional<Admin> admincheck = ar.findByEmailAndPassword(admin.getEmail(), admin.getPassword());
		if (admincheck.isPresent()) {
			logedin = true;
			return true;
		} else {
			return false;
		}
	}

	@GetMapping(value = "/admin")
	public String admin(Model model) {

		return "admin";
	}

	@PostMapping(value = "/update")
	public @ResponseBody String update(@RequestBody MenuItem item) {
		Optional<MenuItem> item4update = mip.findById(item.getId());
		if (item4update.isPresent()) {
			item4update.get().setName(item.getName());
			item4update.get().setPrice(item.getPrice());
			if (item.getDescription().equalsIgnoreCase("no description")) {
				item4update.get().setDescription("");
			} else
				item4update.get().setDescription(item.getDescription());
			item4update.get().setId(item.getId());
			mip.save(item4update.get());
			return "update";

		} else {
			throw new RuntimeException("MenuItem is not found");
		}
	}

	@PostMapping(value = "/updateLunch")
	public @ResponseBody String updateLunch(@RequestBody LunchItem item) {
		Optional<LunchItem> item4update = li.findById(item.getId());
		if (item4update.isPresent()) {
			item4update.get().setName(item.getName());
			item4update.get().setPrice(item.getPrice());
			if (item.getDescription().equalsIgnoreCase("no description")) {
				item4update.get().setDescription("");
			} else
				item4update.get().setDescription(item.getDescription());
			item4update.get().setId(item.getId());
			li.save(item4update.get());
			return "updateLunch";

		} else {
			throw new RuntimeException("MenuItem is not found");
		}
	}

	@GetMapping(value = "/logout")
	public String logout(Model model) {
		logedin = false;
		return "admin";
	}
}
