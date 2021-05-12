package com.technomori.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.technomori.dscatalog.dto.CategoryDTO;
import com.technomori.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Transactional
	public List<CategoryDTO> findAll() {
		return categoryRepository
				.findAll()
				.stream()
				.map(item -> new CategoryDTO(item))
				.collect(Collectors.toList());
	}

}
