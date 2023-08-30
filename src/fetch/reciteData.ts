import filterItem from '@/core/ReviewSchedule'
import type Question from '@/types/Question'

const reciteData: Question[] = [{
  id: 1,
  category: 'Spring',
  uploadDate: '2023-08-30',
  context: 'What is Spring Framework?',
  answer: 'Spring Framework is an open-source Java platform that provides comprehensive infrastructure support for developing robust and flexible Java applications.'
}, {
  id: 2,
  category: 'Spring',
  uploadDate: '2023-08-30',
  context: 'What are the core modules of Spring Framework?',
  answer: 'The core modules of Spring Framework are: Spring Core Container, Spring AOP (Aspect-Oriented Programming), Spring Data Access/Integration, and Spring Web.'
}, {
  id: 3,
  category: 'Spring',
  uploadDate: '2023-08-29',
  context: 'What is Spring Framework?',
  answer: 'Spring Framework is an open-source Java platform that provides comprehensive infrastructure support for developing robust and flexible Java applications.'
}, {
  id: 4,
  category: 'Typescript',
  uploadDate: '2023-08-30',
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