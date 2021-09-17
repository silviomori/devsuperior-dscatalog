package com.technomori.dscatalog.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import com.technomori.dscatalog.entities.Category;
import com.technomori.dscatalog.entities.Product;

public class ProductDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank(message = "Required field")
	@Size(min = 5, max = 60, message = "Name must be between 5 and 60 characters")
	private String name;
	private String description;
	@Positive(message = "Price must be a positive value")
	private Double price;
	private String imgUrl;
	@PastOrPresent(message = "Date cannot be in the future")
	private Instant date;

	private Set<CategoryDTO> categories = new HashSet<>();

	public ProductDTO() {
	}

	public ProductDTO(Long id, String name, String description, Double price, String imgUrl, Instant date) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.imgUrl = imgUrl;
		this.date = date;
	}

	public ProductDTO(Product productEntity) {
		this(productEntity, productEntity.getCategories());
	}

	public ProductDTO(Product productEntity, Set<Category> categoriesEntity) {
		this(productEntity.getId(), productEntity.getName(), productEntity.getDescription(), productEntity.getPrice(),
				productEntity.getImgUrl(), productEntity.getDate());
		categoriesEntity.forEach(item -> this.categories.add(new CategoryDTO(item)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public Set<CategoryDTO> getCategories() {
		return categories;
	}
	
}
