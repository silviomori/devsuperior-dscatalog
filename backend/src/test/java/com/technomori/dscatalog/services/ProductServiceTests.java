package com.technomori.dscatalog.services;

import static org.mockito.ArgumentMatchers.any;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.technomori.dscatalog.dto.ProductDTO;
import com.technomori.dscatalog.entities.Product;
import com.technomori.dscatalog.exceptions.ResourceNotFoundException;
import com.technomori.dscatalog.helpers.Factory;
import com.technomori.dscatalog.repositories.CategoryRepository;
import com.technomori.dscatalog.repositories.ProductRepository;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;

	@Mock
	private ProductRepository productRepository;
	@Mock
	private CategoryRepository categoryRepository;

	private Long existingId;
	private Long nonExistingId;
	private PageImpl<Product> page;
	private Product existingProduct;

	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = -1L;
		existingProduct = Factory.createProduct();
		existingProduct.setId(existingId);
		page = new PageImpl<>(List.of(existingProduct));

		Mockito.doNothing().when(productRepository).deleteById(existingId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(productRepository).deleteById(nonExistingId);
		Mockito.when(productRepository.findAll(any(Pageable.class))).thenReturn(page);
		Mockito.when(productRepository.find(any(), any(), any())).thenReturn(page);
		Mockito.when(productRepository.findById(existingId)).thenReturn(Optional.of(existingProduct));
		Mockito.when(productRepository.findById(nonExistingId)).thenReturn(Optional.empty());
		Mockito.when(productRepository.save(ArgumentMatchers.any())).thenReturn(existingProduct);
		Mockito.when(productRepository.getOne(existingId)).thenReturn(existingProduct);
		Mockito.doThrow(EntityNotFoundException.class).when(productRepository).getOne(nonExistingId);
		existingProduct.getCategories()
				.forEach((catDTO) -> Mockito.when(categoryRepository.getOne(catDTO.getId())).thenReturn(catDTO));
	}

	@Test
	public void deleteShouldNotThrowExceptionWhenIdExists() {
		Assertions.assertDoesNotThrow(() -> service.delete(existingId));
		Mockito.verify(productRepository, Mockito.times(1)).deleteById(existingId);
	}

	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> service.delete(nonExistingId));
		Mockito.verify(productRepository, Mockito.times(1)).deleteById(nonExistingId);
	}

	@Test
	public void findAllPagedShouldReturnPage() {
		PageRequest pageRequest = PageRequest.of(0, 10);

		Page<ProductDTO> result = service.findAllPaged(null, null, pageRequest);

		Assertions.assertNotNull(result);
		Mockito.verify(productRepository, Mockito.times(1)).find(any(), any(), any());
	}

	@Test
	public void findByIdShouldReturnDTOWhenIdExists() {
		ProductDTO dto = service.findById(existingId);

		Assertions.assertNotNull(dto);
		Mockito.verify(productRepository, Mockito.times(1)).findById(existingId);
	}

	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> service.findById(nonExistingId));
		Mockito.verify(productRepository, Mockito.times(1)).findById(nonExistingId);
	}

	@Test
	public void updateShouldReturnDTOWhenIdExists() {
		ProductDTO product = new ProductDTO(existingProduct);
		product.setName("New Name");

		ProductDTO updatedProduct = service.update(existingId, product);

		Assertions.assertNotNull(updatedProduct);
		Assertions.assertEquals(product.getId(), updatedProduct.getId());
		Assertions.assertEquals(product.getName(), updatedProduct.getName());
		Mockito.verify(productRepository, Mockito.times(1)).save(ArgumentMatchers.any());
		Mockito.verify(productRepository, Mockito.never()).findById(ArgumentMatchers.any());
		Mockito.verify(productRepository, Mockito.times(1)).getOne(existingId);
		Mockito.verify(categoryRepository, Mockito.never()).findById(ArgumentMatchers.any());
		Mockito.verify(categoryRepository, Mockito.times(product.getCategories().size()))
				.getOne(ArgumentMatchers.any());
	}

	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		ProductDTO product = new ProductDTO(existingProduct);

		Assertions.assertThrows(ResourceNotFoundException.class, () -> service.update(nonExistingId, product));
	}

}
