import filterItem from '@/core/ReviewSchedule'
import type Question from '@/types/Question'

const reciteData: Question[] = [{
  id: 10,
  category: 'Spring',
  uploadDate: '2023-09-01',
  context: 'How does Spring support declarative transaction management?',
  answer: 'Spring provides support for declarative transaction management through AOP. You can define transactional behavior using annotations or XML configuration, and Spring manages the transactions behind the scenes.'
}, {
  id: 9,
  category: 'Spring',
  uploadDate: '2023-09-01',
  context: 'Explain the Spring Data JPA framework.',
  answer: 'Spring Data JPA is a part of the Spring Data project that provides simplified data access for JPA (Java Persistence API) based repositories. It eliminates much of the boilerplate code required for data access.'
}, {
  id: 8,
  category: 'Spring',
  uploadDate: '2023-09-01',
  context: 'What is Spring Security?',
  answer: 'Spring Security is a powerful and customizable security framework for securing Spring-based applications. It provides authentication, authorization, and protection against common security vulnerabilities.'
}, {
  id: 7,
  category: 'Spring',
  uploadDate: '2023-09-01',
  context: 'What is the difference between Spring MVC and Spring Boot?',
  answer: 'Spring MVC is a module within the Spring Framework for building web applications. Spring Boot, on the other hand, is a separate project that simplifies the configuration and deployment of Spring applications, including Spring MVC.'
}, {
  id: 6,
  category: 'Spring',
  uploadDate: '2023-09-01',
  context: 'What is the Spring Bean lifecycle?',
  answer: 'The Spring Bean lifecycle consists of several stages: Instantiation, Initialization, Usage, and Destruction. Spring provides methods (callbacks) for customization at each stage.'
}, {
  id: 5,
  category: 'Spring',
  uploadDate: '2023-09-01',
  context: 'What is AOP in Spring?',
  answer: 'Aspect-Oriented Programming (AOP) is a technique in Spring that allows separating cross-cutting concerns, such as logging and security, from the main business logic. It enables modularization of concerns.'
}, {
  id: 4,
  category: 'Spring',
  uploadDate: '2023-08-31',
  context: 'What is Inversion of Control (IoC) in Spring?',
  answer: 'IoC is a principle where the control over the flow of a program\'s execution is shifted from the program itself to a container. Spring\'s IoC container manages the instantiation and configuration of objects.'
}, {
  id: 3,
  category: 'Spring',
  uploadDate: '2023-08-31',
  context: 'Explain Dependency Injection in Spring.',
  answer: 'Dependency Injection is a design pattern in Spring where the dependencies of an object are provided by an external entity rather than being created within the object itself. It promotes loose coupling and easier testing.'
}, {
  id: 2,
  category: 'Spring',
  uploadDate: '2023-08-31',
  context: 'What are the core modules of Spring Framework?',
  answer: 'The core modules of Spring Framework are: Spring Core Container, Spring AOP (Aspect-Oriented Programming), Spring Data Access/Integration, and Spring Web.'
}, {
  id: 1,
  category: 'Spring',
  uploadDate: '2023-08-31',
  context: 'What is Spring Framework?',
  answer: 'Spring Framework is an open-source Java platform that provides comprehensive infrastructure support for developing robust and flexible Java applications.'
}]

export function getCategories() {
  return Array.from(new Set(reciteData.map(reciteItem => reciteItem.category)))
}

export function listBySchedule() {
  return filterItem<Question>(reciteData, question => question.uploadDate)
}

export function listByCategory(category: string) {
  return reciteData.filter(reciteItem => reciteItem.category === category)
}

export function listByDate(uploadDate: string) {
  return reciteData.filter(reciteItem => reciteItem.uploadDate === uploadDate)
}