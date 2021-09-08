package com.technomori.dscatalog.resources;

import static org.mockito.ArgumentMatchers.any;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.technomori.dscatalog.dto.ProductDTO;
import com.technomori.dscatalog.exceptions.ResourceNotFoundException;
import com.technomori.dscatalog.helpers.Factory;
import com.technomori.dscatalog.services.ProductService;
import com.technomori.dscatalog.tests.TokenUtil;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductResourceTests {

	@Autowired
	private TokenUtil tokenUtil;

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
	private String username;
	private String password;

	@BeforeEach
	void setUp() throws Exception {
		username = "maria@gmail.com";
		password = "123456";
		existingProduct = Factory.createProductDTO();
		existingProduct.setId(existingId);
		page = new PageImpl<>(List.of(existingProduct));

		Mockito.when(service.findAllPaged(any(), any(), any())).thenReturn(page);
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
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		String jsonBody = objMapper.writeValueAsString(existingProduct);

		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(MockMvcRequestBuilders.put("/products/{id}", existingId)
					.header("Authorization", "Bearer " + accessToken)
					.content(jsonBody)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
			.andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
			.andExpect(MockMvcResultMatchers.jsonPath("$.description").exists()));
	}

	@Test
	public void updateShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		String jsonBody = objMapper.writeValueAsString(existingProduct);

		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(MockMvcRequestBuilders.put("/products/{id}", nonExistingId)
					.header("Authorization", "Bearer " + accessToken)
					.content(jsonBody)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isNotFound()));
	}

	@Test
	public void insertShouldReturnProductDTOCreated() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		String jsonBody = objMapper.writeValueAsString(existingProduct);

		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(MockMvcRequestBuilders.post("/products")
					 .header("Authorization", "Bearer " + accessToken)
					 .content(jsonBody)
					 .contentType(MediaType.APPLICATION_JSON)
					 .accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isCreated())
			.andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
			.andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
			.andExpect(MockMvcResultMatchers.jsonPath("$.description").exists()));
	}

	@Test
	public void deleteShouldReturnNoContentWhenIdExists() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		Assertions.assertDoesNotThrow(() -> mockMvc
				.perform(MockMvcRequestBuilders.delete("/products/{id}", existingId)
						.header("Authorization", "Bearer " + accessToken)
						.accept(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isNoContent()));
	}

	@Test
	public void deleteShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		Assertions.assertDoesNotThrow(() -> mockMvc
				.perform(MockMvcRequestBuilders.delete("/products/{id}", nonExistingId)
						.header("Authorization", "Bearer " + accessToken)
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isNotFound()));
	}

}
