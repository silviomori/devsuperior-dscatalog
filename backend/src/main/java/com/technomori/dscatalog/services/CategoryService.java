package com.technomori.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.technomori.dscatalog.dto.CategoryDTO;
import com.technomori.dscatalog.entities.Category;
import com.technomori.dscatalog.exceptions.DatabaseException;
import com.technomori.dscatalog.exceptions.ResourceNotFoundException;
import com.technomori.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Transactional(readOnly = true)
	public Page<CategoryDTO> findAllPaged(Pageable pageable) {
		return categoryRepository
					.findAll(pageable)
					.map(item -> new CategoryDTO(item));
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

	public void delete(Long id) {
		try {
			categoryRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(
					String.format("Category ID %d not found", id));
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException(
					String.format("Integrity violation: Category ID %d", id));
		}
	}

}
