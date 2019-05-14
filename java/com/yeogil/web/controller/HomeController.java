package com.yeogil.web.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes({"ctx","css","js","img"})
public class HomeController {
	@Autowired HttpSession session;
	@Autowired HttpServletRequest request;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(HttpSession session, HttpServletRequest request) {
		String ctx = request.getContextPath();
		session.setAttribute("ctx", ctx); 
		session.setAttribute("css", ctx+"/resources/css");
		session.setAttribute("js", ctx+"/resources/js");
		session.setAttribute("img", ctx+"/resources/img");
		return "index";
	}
	
	@RequestMapping(value = "/tour", method = RequestMethod.GET)
	public String changjun(Locale locale, Model model) {
		return "tour_index";
	}
	
	@RequestMapping(value = "/sche", method = RequestMethod.GET)
	public String jiwoo(Locale locale, Model model) {
		return "map_sche";
	}
	
	@RequestMapping(value = "/reser", method = RequestMethod.GET)
	public String seowoo(Locale locale, Model model) {
		return "reser_index";
	}
	
	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	public String admin(Locale locale, Model model) {
		return "admin";
	}

}
