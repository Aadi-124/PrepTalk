package com.backend.Backend.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController{

    @GetMapping("/welcome")
    public String greet(){
        return "Welcome to Prep Talk!";
    }

}