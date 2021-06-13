package com.technomori.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.technomori.dscatalog.dto.UserDTO;
import com.technomori.dscatalog.dto.UserInsertDTO;
import com.technomori.dscatalog.entities.User;
import com.technomori.dscatalog.exceptions.DatabaseException;
import com.technomori.dscatalog.exceptions.ResourceNotFoundException;
import com.technomori.dscatalog.repositories.RoleRepository;
import com.technomori.dscatalog.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(PageRequest pageRequest) {
		return userRepository
					.findAll(pageRequest)
					.map(item -> new UserDTO(item));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		User user = userRepository
				.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(
						String.format("User ID %d not found", id)));
		return new UserDTO(user);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO userInsertDTO) {
		User userEntity = new User();
		copyDataFromDtoToEntity(userInsertDTO, userEntity);
		userEntity.setPassword(passwordEncoder.encode(userInsertDTO.getPassword()));
		userEntity = userRepository.save(userEntity);
		return new UserDTO(userEntity);
	}

	@Transactional
	public UserDTO update(Long id, UserDTO userDTO) {
		try {
			User userEntity = userRepository.getOne(id);
			copyDataFromDtoToEntity(userDTO, userEntity);
			userEntity = userRepository.save(userEntity);
			return new UserDTO(userEntity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(
					String.format("User ID %d not found", id));
		}
	}

	private void copyDataFromDtoToEntity(UserDTO userDTO, User userEntity) {
		userEntity.setEmail(userDTO.getEmail());
		userEntity.setFirstName(userDTO.getFirstName());
		userEntity.setLastName(userDTO.getLastName());
		userEntity.getRoles().clear();
		userDTO.getRoles().forEach(roleDTO ->
			userEntity.getRoles().add(roleRepository.getOne(roleDTO.getId())));
	}

	public void delete(Long id) {
		try {
			userRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(
					String.format("User ID %d not found", id));
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException(
					String.format("Integrity violation: User ID %d", id));
		}
	}

}