package com.technomori.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.technomori.dscatalog.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
