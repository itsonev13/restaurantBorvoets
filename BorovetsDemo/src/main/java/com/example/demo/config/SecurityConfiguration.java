package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
		http.authorizeRequests().antMatchers("/adminmenu", "/adminlunch").authenticated().and().formLogin()
				.loginPage("/admin").loginProcessingUrl("/check").permitAll().passwordParameter("password")
				.usernameParameter("username").failureUrl("/").defaultSuccessUrl("/adminmenu").and().csrf().disable();

	}

}
