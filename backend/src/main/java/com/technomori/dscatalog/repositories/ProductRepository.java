package com.technomori.dscatalog.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.technomori.dscatalog.entities.Category;
import com.technomori.dscatalog.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("SELECT p FROM Product p WHERE (:category IS NULL OR :category MEMBER OF p.categories)")
	Page<Product> find(Category category, Pageable pageable);

}
