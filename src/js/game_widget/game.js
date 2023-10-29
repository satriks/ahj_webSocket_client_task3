export default class Game {
  constructor (element, url) {
    this.element = element
    this.sse = new EventSource(url)
    this.onEventSource()
  }

  add (message, type, time) {
    const gameEvent = document.createElement('div')
    gameEvent.className = 'game__event'

    const eventTime = document.createElement('span')
    eventTime.className = 'event__time'
    eventTime.textContent = new Date(time).toLocaleString()

    const eventMessage = document.createElement('span')
    eventMessage.className = 'event__message'
    eventMessage.textContent = message
    if (type === 'goal') eventMessage.classList.add('goal')
    if (type === 'freekick') eventMessage.classList.add('freekick')

    gameEvent.append(eventTime, eventMessage)
    this.element.append(gameEvent)
    gameEvent.scrollIntoView()
  }

  onEventSource () {
    this.sse.addEventListener('message', (e) => {
      const data = JSON.parse(e.data)

      this.add(data.event, data.type, data.date)
      // this.element.append(gameEvent);
    })
    this.sse.addEventListener('logs', (e) => {
      const data = JSON.parse(e.data)
      console.log(data, 'data. logs')
      data.forEach(element => {
        this.add(element.event, element.type, element.date)
      })
      // this.element.append(gameEvent);
    })
  }
}
