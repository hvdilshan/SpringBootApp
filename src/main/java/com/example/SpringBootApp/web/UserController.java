package com.example.SpringBootApp.web;

import com.example.SpringBootApp.entity.User;
import com.example.SpringBootApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user")
    public List<User> GetAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    public User GetUserById (@PathVariable String id){
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping("/user")
    public User AddUser (@RequestBody User user){
        return userRepository.save(user);
    }

    @PutMapping("/user/{id}")
    public User UpdateUser (@PathVariable String id, @RequestBody User user){
        User currentUser = userRepository.findById(id).orElse(null);
        currentUser.setName(user.getName());
        currentUser.setEmail(user.getEmail());
        currentUser.setPassword(user.getPassword());
        return currentUser;
    }

    @DeleteMapping("/user/{id}")
    public String DeleteUser (@PathVariable String id){
        userRepository.deleteById(id);
        return id;
    }

}
