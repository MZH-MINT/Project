package com.example.Sample.mapper;

import com.example.Sample.dto.EmployeeDto;
import com.example.Sample.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto toDto(Employee employee) {
        if (employee == null) return null;

        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getPosition()
        );
    }

    public static Employee toEntity(EmployeeDto dto) {
        if (dto == null) return null;

        return new Employee(
                dto.getId(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getEmail(),
                dto.getPosition()
        );
    }
}
