package dev.library.backend.services;

import dev.library.backend.dto.mappers.CategoryMapper;
import dev.library.backend.dto.requests.CategoryRequestDto;
import dev.library.backend.dto.response.CategoryResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import dev.library.backend.models.Category;
import dev.library.backend.repositories.CategoryRepository;

@Service
public class CategoryService
{
    @Autowired
    private CategoryMapper categoryMapper;
    @Autowired
    private CategoryRepository categoryRepository;
    public Page<CategoryResponseDto> getCategories(int page , int size , String sortBy , String sortOrder)
    {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Category> collection = this.categoryRepository.findAll(pageable);
        return collection.map(this.categoryMapper::toDataTransferObject);
    }
    public CategoryResponseDto getCategory(Long id)
    {
        return this.categoryRepository.existsById(id) ? this.categoryMapper.toDataTransferObject(this.categoryRepository.findById(id).orElseThrow()) : null;
    }
    public CategoryResponseDto createCategory(CategoryRequestDto request)
    {
        Category category = new Category();
        category.setName(request.getName());
        return this.categoryMapper.toDataTransferObject(this.categoryRepository.save(category));
    }
    public CategoryResponseDto updateCategory(Long id, CategoryRequestDto request)
    {
        Category category = this.categoryRepository.findById(id).orElseThrow();
        category.setName(request.getName());
        return this.categoryMapper.toDataTransferObject(this.categoryRepository.save(category));
    }
    public void deleteCategory(Long id)
    {
        if (this.getCategory(id) == null)
        {
            throw new EntityNotFoundException();
        }
        this.categoryRepository.deleteById(id);
    }
}
