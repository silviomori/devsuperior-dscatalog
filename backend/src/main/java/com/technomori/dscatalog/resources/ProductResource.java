package com.technomori.dscatalog.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.technomori.dscatalog.dto.ProductDTO;
import com.technomori.dscatalog.services.ProductService;

@RestController
@RequestMapping(value = "/products")
public class ProductResource {

	@Autowired
	private ProductService productService;

	@GetMapping
	public ResponseEntity<Page<ProductDTO>> findAllPaged(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "6") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "name") String orderBy) {
		PageRequest pageRequest = PageRequest.of(
				page, linesPerPage, Direction.valueOf(direction), orderBy);
		Page<ProductDTO> productPage = productService.findAllPaged(pageRequest);
		return ResponseEntity.ok().body(productPage);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> findById(@PathVariable Long id) {
		return ResponseEntity.ok().body(productService.findById(id));
	}

//	@PostMapping
//	public ResponseEntity<ProductDTO> insert(@RequestBody ProductDTO productDTO) {
//		productDTO = productService.insert(productDTO);
//		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
//					.path("/{id}").buildAndExpand(productDTO.getId()).toUri();
//		return ResponseEntity.created(uri).body(productDTO);
//	}
//
//	@PutMapping(value = "/{id}")
//	public ResponseEntity<ProductDTO> update(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
//		productDTO = productService.update(id, productDTO);
//		return ResponseEntity.ok().body(productDTO);
//	}
//
//	@DeleteMapping(value = "/{id}")
//	public ResponseEntity<Void> update(@PathVariable Long id) {
//		productService.delete(id);
//		return ResponseEntity.noContent().build();
//	}

}
