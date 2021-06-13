package com.technomori.dscatalog.services.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import com.technomori.dscatalog.dto.UserUpdateDTO;
import com.technomori.dscatalog.entities.User;
import com.technomori.dscatalog.repositories.UserRepository;
import com.technomori.dscatalog.resources.exceptions.FieldValidationMessage;

public class UserUpdateValidatorImpl implements ConstraintValidator<UserUpdateValidator, UserUpdateDTO> {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private UserRepository userRepository;

	@Override
	public void initialize(UserUpdateValidator ann) {
	}

	@Override
	public boolean isValid(UserUpdateDTO dto, ConstraintValidatorContext context) {
		@SuppressWarnings("unchecked")
		Map<String, String> uriVars = (Map<String, String>) request
				.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		long userId = Long.parseLong(uriVars.get("id"));

		List<FieldValidationMessage> errors = new ArrayList<>();

		User user = userRepository.findByEmail(dto.getEmail());
		if (user != null && user.getId() != userId) {
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