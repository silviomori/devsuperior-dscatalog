package com.technomori.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.technomori.dscatalog.dto.CategoryDTO;
import com.technomori.dscatalog.entities.Category;
import com.technomori.dscatalog.exceptions.ResourceNotFoundException;
import com.technomori.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {
		return categoryRepository
					.findAll()
					.stream()
					.map(item -> new CategoryDTO(item))
					.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Category category = categoryRepository
				.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(
						String.format("Category ID %d not found", id)));
		return new CategoryDTO(category);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO categoryDTO) {
		Category categoryEntity = new Category();
		categoryEntity.setName(categoryDTO.getName());
		categoryEntity = categoryRepository.save(categoryEntity);
		return new CategoryDTO(categoryEntity);
	}

	@Transactional
	public CategoryDTO update(Long id, CategoryDTO categoryDTO) {
		try {
			Category categoryEntity = categoryRepository.getOne(id);
			categoryEntity.setName(categoryDTO.getName());
			categoryEntity = categoryRepository.save(categoryEntity);
			return new CategoryDTO(categoryEntity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(
					String.format("Category ID %d not found", id));
		}
	}

}
