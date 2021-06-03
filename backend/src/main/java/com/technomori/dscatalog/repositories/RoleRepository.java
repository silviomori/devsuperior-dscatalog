package com.technomori.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.technomori.dscatalog.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
