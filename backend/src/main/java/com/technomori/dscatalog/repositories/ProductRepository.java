package com.technomori.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.technomori.dscatalog.entities.Category;
import com.technomori.dscatalog.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("SELECT DISTINCT p FROM Product p"
			+ " INNER JOIN p.categories cats"
			+ " WHERE"
			+ " 	(COALESCE(:categories) IS NULL OR cats IN :categories) AND"
			+ " 	(:name = '' OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')))")
	Page<Product> find(List<Category> categories, String name, Pageable pageable);

}
