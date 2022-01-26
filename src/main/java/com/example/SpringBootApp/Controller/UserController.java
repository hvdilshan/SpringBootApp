package com.example.SpringBootApp.Controller;

import com.example.SpringBootApp.Error.UserNotFoundException;
import com.example.SpringBootApp.Model.User;
import com.example.SpringBootApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    //dependency injection
    @Autowired
    private UserRepository userRepository;

    //get all user details
    @GetMapping("/user")
    public List<User> GetAllUsers() {
        return userRepository.findAll();
    }

    //get user details by using id
    @GetMapping("/user/{id}")
    public User GetUserById (@PathVariable String id)throws UserNotFoundException {

        User user = userRepository.findById(id).orElse(null);

        if(user == null) {
            throw new UserNotFoundException("User Not Found for Id -> " +id);
        }

        return user;
    }

    //create new user
    @PostMapping("/addUser")
    public User AddUser (@RequestBody User user){
        return userRepository.save(user);
    }

    //update user details by using id
    @PutMapping("/updateUser/{id}")
    public User UpdateUser (@PathVariable String id, @RequestBody User newUser) throws UserNotFoundException{
        User currentUser = userRepository.findById(id).orElse(null);

        if(currentUser == null) {
            throw new UserNotFoundException("User Not Found for Id -> " +id);
        }
        else {
            currentUser.setName(newUser.getName());
            currentUser.setAddress(newUser.getAddress());
            currentUser.setEmail(newUser.getEmail());
            currentUser.setPhoneNo(newUser.getPhoneNo());

            return userRepository.save(currentUser);
        }

    }

    //delete user details by id
    @DeleteMapping("/deleteUser/{id}")
    public String DeleteUser (@PathVariable String id) throws UserNotFoundException{
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
