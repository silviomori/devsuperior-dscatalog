package com.technomori.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.technomori.dscatalog.dto.ProductDTO;
import com.technomori.dscatalog.entities.Category;
import com.technomori.dscatalog.entities.Product;
import com.technomori.dscatalog.exceptions.DatabaseException;
import com.technomori.dscatalog.exceptions.ResourceNotFoundException;
import com.technomori.dscatalog.repositories.CategoryRepository;
import com.technomori.dscatalog.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CategoryRepository categoryRepository;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(List<Long> categoryIds, String name, Pageable pageable) {
		List<Category> categories = categoryIds == null || categoryIds.isEmpty() ? null :
			categoryIds.stream()
				.map(id -> categoryRepository.getOne(id))
				.collect(Collectors.toList());
		name = name == null ? "" : name.trim();
		return productRepository
					.find(categories, name, pageable)
					.map(item -> new ProductDTO(item));
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Product product = productRepository
				.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(
						String.format("Product ID %d not found", id)));
		return new ProductDTO(product, product.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO productDTO) {
		Product productEntity = new Product();
		copyDataFromDtoToEntity(productDTO, productEntity);
		productEntity = productRepository.save(productEntity);
		return new ProductDTO(productEntity);
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO productDTO) {
		try {
			Product productEntity = productRepository.getOne(id);
			copyDataFromDtoToEntity(productDTO, productEntity);
			productEntity = productRepository.save(productEntity);
			return new ProductDTO(productEntity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(
					String.format("Product ID %d not found", id));
		}
	}

	private void copyDataFromDtoToEntity(ProductDTO productDTO, Product productEntity) {
		productEntity.setDate(productDTO.getDate());
		productEntity.setDescription(productDTO.getDescription());
		productEntity.setImgUrl(productDTO.getImgUrl());
		productEntity.setName(productDTO.getName());
		productEntity.setPrice(productDTO.getPrice());

		productEntity.getCategories().clear();
		productDTO.getCategories().forEach(catDTO -> {
			productEntity.getCategories().add(categoryRepository.getOne(catDTO.getId()));
		});
	}

	public void delete(Long id) {
		try {
			productRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(
					String.format("Product ID %d not found", id));
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException(
					String.format("Integrity violation: Product ID %d", id));
		}
	}

}
