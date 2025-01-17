function hello(name: string = 'World'): string {
  const greetings = ['Hello', 'Hi', 'Greetings', 'Hey', 'Bonjour']
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
  return `${randomGreeting}, ${name}!`
}

export { hello }
