package com.backend.Backend.Controller;


import com.backend.Backend.DTO.UserDTO;
import com.backend.Backend.Service.UserService;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.google.genai.Client;

@RestController
public class UserController{

    @GetMapping("/welcome")
    public String greet(){
        return "Welcome to Prep Talk!";
    }

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO){
        if(!userService.isUserExists(userDTO.getEmail())) return ResponseEntity.badRequest().body("User Already Exists!");
        return ResponseEntity.ok().body(userService.addUser(userDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO){
        System.out.println("userDTO.getEmail(), userDTO.getPassword()) = "+userDTO.getEmail()+"__"+userDTO.getPassword());
        System.out.println("userService.AuthenticateUser(userDTO.getEmail(), userDTO.getPassword()) = "+userService.AuthenticateUser(userDTO.getEmail(), userDTO.getPassword()));

        if(userService.AuthenticateUser(userDTO.getEmail(), userDTO.getPassword())) return ResponseEntity.ok(userDTO);
        System.out.println("userService.AuthenticateUser(userDTO.getEmail(), userDTO.getPassword()) = "+userService.AuthenticateUser(userDTO.getEmail(), userDTO.getPassword()));
        return ResponseEntity.badRequest().body("Failed Login");
    }

    @GetMapping("/gemini/sample")
    public String TestGemini(){
        Client client = new Client();

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-2.5-flash",
                        "Explain how AI works in a few words",
                        null);

        return response.text();
    }


}