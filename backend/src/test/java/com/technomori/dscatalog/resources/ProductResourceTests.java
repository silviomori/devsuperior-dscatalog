package com.technomori.dscatalog.resources;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.technomori.dscatalog.dto.ProductDTO;
import com.technomori.dscatalog.exceptions.ResourceNotFoundException;
import com.technomori.dscatalog.helpers.Factory;
import com.technomori.dscatalog.services.ProductService;

@WebMvcTest(ProductResource.class)
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private ProductService service;

	@Autowired
	private ObjectMapper objMapper;

	private Long existingId = 1L;
	private Long nonExistingId = -1L;
	private ProductDTO existingProduct;
	private PageImpl<ProductDTO> page;

	@BeforeEach
	void setUp() throws Exception {
		existingProduct = Factory.createProductDTO();
		existingProduct.setId(existingId);
		page = new PageImpl<>(List.of(existingProduct));

		Mockito.when(service.findAllPaged(ArgumentMatchers.any())).thenReturn(page);
		Mockito.when(service.findById(existingId)).thenReturn(existingProduct);
		Mockito.when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		Mockito.when(service.update(ArgumentMatchers.eq(existingId), ArgumentMatchers.any()))
				.thenReturn(existingProduct);
		Mockito.when(service.update(ArgumentMatchers.eq(nonExistingId), ArgumentMatchers.any()))
				.thenThrow(ResourceNotFoundException.class);
		Mockito.when(service.insert(ArgumentMatchers.any())).thenReturn(existingProduct);
		Mockito.doNothing().when(service).delete(existingId);
		Mockito.doThrow(ResourceNotFoundException.class).when(service).delete(nonExistingId);
	}

	@Test
	public void findAllShoudlReturnPage() {
		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(MockMvcRequestBuilders.get("/products").accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isOk()));
	}

	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() {
		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(MockMvcRequestBuilders.get("/products/{id}", existingId).accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
			.andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
			.andExpect(MockMvcResultMatchers.jsonPath("$.description").exists()));
	}

	@Test
	public void findByIdShouldReturnNotFoundWhenIdDoesNotExist() {
		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(MockMvcRequestBuilders.get("/products/{id}", nonExistingId).accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isNotFound()));
	}

	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws JsonProcessingException {
		String jsonBody = objMapper.writeValueAsString(existingProduct);

		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(MockMvcRequestBuilders.put("/products/{id}", existingId)
					.content(jsonBody)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
			.andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
			.andExpect(MockMvcResultMatchers.jsonPath("$.description").exists()));
	}

	@Test
	public void updateShouldReturnNotFoundWhenIdDoesNotExist() throws JsonProcessingException {
		String jsonBody = objMapper.writeValueAsString(existingProduct);

		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(MockMvcRequestBuilders.put("/products/{id}", nonExistingId)
					.content(jsonBody)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isNotFound()));
	}

	@Test
	public void insertShouldReturnProductDTOCreated() throws JsonProcessingException {
		String jsonBody = objMapper.writeValueAsString(existingProduct);

		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(MockMvcRequestBuilders.post("/products")
					 .content(jsonBody)
					 .contentType(MediaType.APPLICATION_JSON)
					 .accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isCreated())
			.andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
			.andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
			.andExpect(MockMvcResultMatchers.jsonPath("$.description").exists()));
	}

	@Test
	public void deleteShouldReturnNoContentWhenIdExists() {
		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(MockMvcRequestBuilders.delete("/products/{id}", existingId).accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isNoContent()));
	}

	@Test
	public void deleteShouldReturnNotFoundWhenIdDoesNotExist() {
		Assertions.assertDoesNotThrow(() -> mockMvc
				.perform(MockMvcRequestBuilders.delete("/products/{id}", nonExistingId).accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isNotFound()));
	}

}
