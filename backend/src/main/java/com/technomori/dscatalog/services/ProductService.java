package com.technomori.dscatalog.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.technomori.dscatalog.dto.ProductDTO;
import com.technomori.dscatalog.entities.Product;
import com.technomori.dscatalog.exceptions.ResourceNotFoundException;
import com.technomori.dscatalog.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
		return productRepository
					.findAll(pageRequest)
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

//	@Transactional
//	public ProductDTO insert(ProductDTO productDTO) {
//		Product productEntity = new Product();
//		productEntity.setName(productDTO.getName());
//		productEntity = productRepository.save(productEntity);
//		return new ProductDTO(productEntity);
//	}
//
//	@Transactional
//	public ProductDTO update(Long id, ProductDTO productDTO) {
//		try {
//			Product productEntity = productRepository.getOne(id);
//			productEntity.setName(productDTO.getName());
//			productEntity = productRepository.save(productEntity);
//			return new ProductDTO(productEntity);
//		} catch (EntityNotFoundException e) {
//			throw new ResourceNotFoundException(
//					String.format("Product ID %d not found", id));
//		}
//	}
//
//	public void delete(Long id) {
//		try {
//			productRepository.deleteById(id);
//		} catch (EmptyResultDataAccessException e) {
//			throw new ResourceNotFoundException(
//					String.format("Product ID %d not found", id));
//		} catch (DataIntegrityViolationException e) {
//			throw new DatabaseException(
//					String.format("Integrity violation: Product ID %d", id));
//		}
//	}

}
