package com.technomori.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.technomori.dscatalog.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
