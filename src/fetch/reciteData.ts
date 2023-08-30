const reciteData = [{
  category: 'spring',
  question: 'What is Spring Framework?',
  answer: 'Spring Framework is an open-source Java platform that provides comprehensive infrastructure support for developing robust and flexible Java applications.'
}, {
  category: 'spring',
  question: 'What are the core modules of Spring Framework?',
  answer: 'The core modules of Spring Framework are: Spring Core Container, Spring AOP (Aspect-Oriented Programming), Spring Data Access/Integration, and Spring Web.'
}, {
  category: 'spring',
  question: 'What is Spring Framework?',
  answer: 'Spring Framework is an open-source Java platform that provides comprehensive infrastructure support for developing robust and flexible Java applications.'
}, {
  category: 'spring',
  question: 'What is Spring Framework?',
  answer: 'Spring Framework is an open-source Java platform that provides comprehensive infrastructure support for developing robust and flexible Java applications.'
}]

export function listByCategory() {
  return reciteData.slice(0, 10)
}