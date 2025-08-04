package com.backend.Backend.Service;


import com.backend.Backend.DTO.UserDTO;
import com.backend.Backend.Entity.User;
import com.backend.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    public boolean isUserExists(String email){
        return userRepo.findByEmail(email).isEmpty();
    }


    public User addUser(UserDTO userDTO){
        System.out.println(userDTO.toString());
        try{
            User user = new User();
            user.setFullname(userDTO.getFullName());
            user.setEmail(userDTO.getEmail());
            user.setPassword(userDTO.getPassword());
            System.out.println(user.getEmail());
            System.out.println(user.getFullname());
            System.out.println(user.getPassword());
            userRepo.save(user);
            return user;
        } catch (Exception E){
            E.printStackTrace();
        }
        return null;
    }

    public boolean AuthenticateUser(String email, String Password){
        Optional<User> OptUser = userRepo.findByEmail(email);
        System.out.println(OptUser.isEmpty());
        if(OptUser.isEmpty()) return false;
        User user = OptUser.get();
        System.out.println(user.toString());
        System.out.println(user.getPassword().equals(Password));
        if(user.getPassword().equals(Password)) return true;
        return false;
    }




}
