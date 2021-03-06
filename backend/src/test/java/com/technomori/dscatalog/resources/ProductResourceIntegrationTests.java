package com.technomori.dscatalog.resources;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.technomori.dscatalog.dto.ProductDTO;
import com.technomori.dscatalog.helpers.Factory;
import com.technomori.dscatalog.tests.TokenUtil;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProductResourceIntegrationTests {

	@Autowired
	private TokenUtil tokenUtil;

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objMapper;

	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProducts;
	private ProductDTO productDTO;
	private String username;
	private String password;

	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = -1L;
		countTotalProducts = 25L;
		productDTO = Factory.createProductDTO();
		username = "maria@gmail.com";
		password = "123456";
	}

	@Test
	public void findAllShouldReturnSortedPageWhenSortByName() {
		assertDoesNotThrow(() -> mockMvc
			.perform(get("/products?page=0&size=12&sort=name,ASC").accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.totalElements").value(countTotalProducts))
			.andExpect(jsonPath("$.content").exists())
			.andExpect(jsonPath("$.content[0].name").value("Macbook Pro"))
			.andExpect(jsonPath("$.content[1].name").value("PC Gamer"))
			.andExpect(jsonPath("$.content[2].name").value("PC Gamer Alfa")));
	}

	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		String jsonBody = objMapper.writeValueAsString(productDTO);

		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(put("/products/{id}", existingId)
					.header("Authorization", "Bearer " + accessToken)
					.content(jsonBody)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").value(existingId))
			.andExpect(jsonPath("$.name").value(productDTO.getName()))
			.andExpect(jsonPath("$.description").value(productDTO.getDescription())));
	}

	@Test
	public void updateShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
		String jsonBody = objMapper.writeValueAsString(productDTO);

		Assertions.assertDoesNotThrow(() -> mockMvc
			.perform(put("/products/{id}", nonExistingId)
					.header("Authorization", "Bearer " + accessToken)
					.content(jsonBody)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isNotFound()));
	}

}
