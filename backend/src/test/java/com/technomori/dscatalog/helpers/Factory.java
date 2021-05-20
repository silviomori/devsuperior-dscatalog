package com.technomori.dscatalog.helpers;

import java.time.Instant;

import com.technomori.dscatalog.dto.ProductDTO;
import com.technomori.dscatalog.entities.Category;
import com.technomori.dscatalog.entities.Product;

public class Factory {

	public static Product createProduct() {
		Product product = new Product(1L, "Phone", "Good phone", 800.0, "https://img.com/img.png",
				Instant.parse("2021-05-20T03:00:00Z"));
		product.getCategories().add(new Category(2L, "Electronics"));
		return product;
	}

	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}

}
