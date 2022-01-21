package com.example.SpringBootApp.Controller;

import com.example.SpringBootApp.Error.UserNotFoundException;
import com.example.SpringBootApp.Model.User;
import com.example.SpringBootApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342/")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/user")
    public List<User> GetAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    public User GetUserById (@PathVariable String id){

        User user = userRepository.findById(id).orElse(null);

        if(user == null) {
            throw new UserNotFoundException("User Not Found for Id -> " +id);
        }

        return user;
    }


    @PostMapping("/addUser")
    public User AddUser (@RequestBody User user){
        return userRepository.save(user);
    }

    @PutMapping("/updateUser/{id}")
    public User UpdateUser (@PathVariable String id, @RequestBody User newUser){
        User currentUser = userRepository.findById(id).orElse(null);

        if(currentUser == null) {
            throw new UserNotFoundException("User Not Found for Id -> " +id);
        }
        else {
            currentUser.setName(newUser.getName());
            currentUser.setEmail(newUser.getEmail());
            currentUser.setPassword(newUser.getPassword());

            return userRepository.save(currentUser);
        }

    }

    @DeleteMapping("/deleteUser/{id}")
    public String DeleteUser (@PathVariable String id){
        User user = userRepository.findById(id).orElse(null);

        if(user == null) {
            throw new UserNotFoundException("User Not Found for Id -> " +id);
        }
        else {
            userRepository.deleteById(id);
            return id;
        }
    }

}
