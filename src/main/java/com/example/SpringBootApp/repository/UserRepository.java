package com.example.SpringBootApp.repository;

import com.example.SpringBootApp.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository <User, String> {

}
