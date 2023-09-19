import filterItem from '@/core/ReviewSchedule'
import type Question from '@/types/Question'

const reciteData: Question[] = [{
  "id": 119,
  "category": "Spring",
  "uploadDate": "2023-09-06",
  "context": "What is Spring Web MVC?",
  "answer": "Spring Web MVC is like a traffic cop for your web app. It's a framework for building web applications using the Model-View-Controller architectural pattern."
},
{
  "id": 120,
  "category": "Spring",
  "uploadDate": "2023-09-06",
  "context": "Explain Spring Boot Profiles.",
  "answer": "Spring Boot Profiles are like customized settings for your app. They allow you to define different configurations for different environments, making your app adaptable."
}, {
  "id": 111,
  "category": "Spring",
  "uploadDate": "2023-09-05",
  "context": "What is Spring Boot Auto-configuration?",
  "answer": "Spring Boot Auto-configuration acts like a helpful assistant. It configures beans automatically based on project dependencies, saving developers from manual setup."
},
{
  "id": 112,
  "category": "Spring",
  "uploadDate": "2023-09-05",
  "context": "Explain the Spring IoC Container.",
  "answer": "The Spring IoC Container is like a magic box for your objects. It manages their creation, configuration, and lifecycle, promoting flexibility and easy testing."
},
{
  "id": 113,
  "category": "Spring",
  "uploadDate": "2023-09-05",
  "context": "What is a Spring Bean Scope?",
  "answer": "Bean Scope defines how long a bean lives in Spring. It's like deciding if an object should be short-lived or persist through the application's lifetime."
},
{
  "id": 114,
  "category": "Spring",
  "uploadDate": "2023-09-05",
  "context": "Explain Spring Boot Starters.",
  "answer": "Spring Boot Starters are like recipe cards for your project. They provide predefined templates for common tasks, saving time and simplifying development."
},
{
  "id": 115,
  "category": "Spring",
  "uploadDate": "2023-09-05",
  "context": "What is Spring Data JPA?",
  "answer": "Spring Data JPA simplifies database access using the Java Persistence API, reducing boilerplate code in data-related operations."
},
{
  "id": 116,
  "category": "Spring",
  "uploadDate": "2023-09-05",
  "context": "Explain the Spring Boot Actuator.",
  "answer": "Spring Boot Actuator is like a health monitor for your app. It provides insights into application metrics, health, and various runtime information."
},
{
  "id": 117,
  "category": "Spring",
  "uploadDate": "2023-09-05",
  "context": "What is Spring Cloud?",
  "answer": "Spring Cloud is like a cloud conductor. It offers tools and libraries for building cloud-native microservices, handling common tasks like service discovery and configuration."
},
{
  "id": 118,
  "category": "Spring",
  "uploadDate": "2023-09-05",
  "context": "Explain the Spring Boot DevTools.",
  "answer": "Spring Boot DevTools are like a developer's best friend. They enhance development by providing features like automatic restarts and live reloading."
},
{
  "id": 101,
  "category": "Spring",
  "uploadDate": "2023-09-04",
  "context": "What are the core modules of Spring Framework?",
  "answer": "Spring Framework includes essential parts like Spring Core Container, which manages objects, Spring AOP for handling concerns, Spring Data Access and Integration, and Spring Web."
},
{
  "id": 102,
  "category": "Spring",
  "uploadDate": "2023-09-04",
  "context": "What is Spring Framework?",
  "answer": "Spring Framework is like a trusty companion for Java developers. It's open-source and simplifies the creation of strong and flexible Java applications."
},
{
  "id": 103,
  "category": "Spring",
  "uploadDate": "2023-09-04",
  "context": "Explain Dependency Injection in Spring.",
  "answer": "Dependency Injection is all about providing your classes with what they need in Spring. It enhances code flexibility and makes development smoother."
},
{
  "id": 104,
  "category": "Spring",
  "uploadDate": "2023-09-04",
  "context": "What is Inversion of Control (IoC) in Spring?",
  "answer": "IoC means Spring takes charge. It manages object creation and handling, allowing you to focus on writing clean, efficient code."
},
{
  "id": 105,
  "category": "Spring",
  "uploadDate": "2023-09-04",
  "context": "What is a Bean in Spring?",
  "answer": "In Spring, a Bean is like a ready-to-use ingredient in a recipe. It's a managed Java object defined in Spring's configuration, ready for use."
},
{
  "id": 106,
  "category": "Spring",
  "uploadDate": "2023-09-04",
  "context": "What is Aspect-Oriented Programming (AOP) in Spring?",
  "answer": "AOP helps keep your code organized by separating concerns like logging or security from your main logic."
},
{
  "id": 107,
  "category": "Spring",
  "uploadDate": "2023-09-04",
  "context": "What is Spring Boot?",
  "answer": "Spring Boot is like a fast pass at an amusement park. It simplifies building Java apps, reducing setup work and getting you started quickly."
},
{
  "id": 108,
  "category": "Spring",
  "uploadDate": "2023-09-04",
  "context": "What is the purpose of the Spring BeanFactory?",
  "answer": "The Spring BeanFactory acts like a manager for your beans. It creates, configures, and oversees beans in the Spring setup, ensuring they're ready for action."
},
{
  "id": 109,
  "category": "Spring",
  "uploadDate": "2023-09-04",
  "context": "Explain the concept of Spring MVC (Model-View-Controller).",
  "answer": "Spring MVC is like orchestrating a dance. It's a framework for building web apps, with models for data, views for presentation, and controllers for handling user input."
},
{
  "id": 110,
  "category": "Spring",
  "uploadDate": "2023-09-04",
  "context": "What is Spring Security?",
  "answer": "Spring Security acts as a protective shield for your app. It handles authentication, authorization, and guards against security threats, ensuring your Spring app stays secure."
}, {
  "id": 21,
  "category": "English",
  "uploadDate": "2023-09-02",
  "context": "很高兴认识你。",
  "answer": "Nice to meet you."
}, {
  "id": 22,
  "category": "English",
  "uploadDate": "2023-09-02",
  "context": "我爱你。",
  "answer": "I love you."
}, {
  "id": 23,
  "category": "English",
  "uploadDate": "2023-09-02",
  "context": "你最喜欢的食物是什么？",
  "answer": "What's your favorite food?"
}, {
  "id": 24,
  "category": "English",
  "uploadDate": "2023-09-02",
  "context": "我喜欢披萨。",
  "answer": "I like pizza."
}, {
  "id": 25,
  "category": "English",
  "uploadDate": "2023-09-02",
  "context": "你会说英语吗？",
  "answer": "Do you speak English?"
}, {
  "id": 26,
  "category": "English",
  "uploadDate": "2023-09-02",
  "context": "是的，我会。",
  "answer": "Yes, I do."
}, {
  "id": 27,
  "category": "English",
  "uploadDate": "2023-09-02",
  "context": "不，我不会。",
  "answer": "No, I don't."
}, {
  "id": 28,
  "category": "English",
  "uploadDate": "2023-09-02",
  "context": "这要多久？",
  "answer": "How long will it take?"
}, {
  "id": 29,
  "category": "English",
  "uploadDate": "2023-09-02",
  "context": "我不知道。",
  "answer": "I don't know."
}, {
  "id": 30,
  "category": "English",
  "uploadDate": "2023-09-02",
  "context": "你能重复一遍吗？",
  "answer": "Can you repeat that?"
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