package com.technomori.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.technomori.dscatalog.entities.Category;
import com.technomori.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;


	public List<Category> findAll() {
		return categoryRepository.findAll();
	}

}
