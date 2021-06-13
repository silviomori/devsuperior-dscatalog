package com.technomori.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.technomori.dscatalog.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	boolean existsByEmail(String email);

}
