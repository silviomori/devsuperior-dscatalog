package com.technomori.dscatalog.services.validation;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.technomori.dscatalog.dto.UserInsertDTO;
import com.technomori.dscatalog.repositories.UserRepository;
import com.technomori.dscatalog.resources.exceptions.FieldValidationMessage;

public class UserInsertValidatorImpl implements ConstraintValidator<UserInsertValidator, UserInsertDTO> {

	@Autowired
	private UserRepository userRepository;

	@Override
	public void initialize(UserInsertValidator ann) {
	}

	@Override
	public boolean isValid(UserInsertDTO dto, ConstraintValidatorContext context) {

		List<FieldValidationMessage> errors = new ArrayList<>();

		if (userRepository.existsByEmail(dto.getEmail())) {
			errors.add(new FieldValidationMessage("email", "This email address is already being used"));
		}

		errors.forEach(error -> {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(error.getMessage()).addPropertyNode(error.getFieldName())
					.addConstraintViolation();
		});

		return errors.isEmpty();
	}

}