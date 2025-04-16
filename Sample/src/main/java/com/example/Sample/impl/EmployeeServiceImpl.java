package com.example.Sample.impl;

import com.example.Sample.dto.EmployeeDto;
import com.example.Sample.entity.Employee;
import com.example.Sample.exception.EmployeeExcep;
import com.example.Sample.mapper.EmployeeMapper;
import com.example.Sample.repository.EmployeeRepository;
import com.example.Sample.service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<EmployeeDto> getAllEmployees() {
        logger.info("Fetching all employees");
        List<EmployeeDto> employees = employeeRepository.findAll()
                .stream()
                .map(EmployeeMapper::toDto)
                .collect(Collectors.toList());
        if (employees.isEmpty()) {
            logger.warn("No employees found in the system");
        }
        return employees;
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        logger.info("Fetching employee with ID: {}", id);
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            logger.info("Employee found with ID: {}", id);
            return EmployeeMapper.toDto(optionalEmployee.get());
        } else {
            // Throw custom exception when employee not found
            logger.error("Employee with ID: {} not found", id);
            throw new EmployeeExcep("No employee found with ID: " + id);
        }
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        logger.info("Creating new employee: {}", employeeDto);
        Employee employee = EmployeeMapper.toEntity(employeeDto);
        Employee saved = employeeRepository.save(employee);
        logger.info("Employee created with ID: {}", saved.getId());
        return EmployeeMapper.toDto(saved);
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {
        logger.info("Updating employee with ID: {}", id);
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee existing = optionalEmployee.get();
            existing.setFirstName(employeeDto.getFirstName());
            existing.setLastName(employeeDto.getLastName());
            existing.setEmail(employeeDto.getEmail());
            existing.setPosition(employeeDto.getPosition());

            Employee updated = employeeRepository.save(existing);
            logger.info("Employee updated with ID: {}", id);
            return EmployeeMapper.toDto(updated);
        } else {
            // Throw custom exception when employee not found for update
            logger.error("Employee with ID: {} not found for update", id);
            throw new EmployeeExcep("No employee found with ID: " + id);
        }
    }

    @Override
    public void deleteEmployee(Long id) {
        logger.info("Deleting employee with ID: {}", id);
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            logger.info("Employee with ID: {} deleted", id);
        } else {
            // Throw exception if trying to delete an employee that doesn't exist
            logger.error("Employee with ID: {} not found for deletion", id);
            throw new EmployeeExcep("No employee found with ID: " + id);
        }
    }
}
