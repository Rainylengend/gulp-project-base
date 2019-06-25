const Event = require('events')

const event = new Event()
const requestList = []
let isEnd = true

event.on('add', function (val) {
  requestList.push(request.bind(null, val))
  requestList[0]()
})


function request(data) {
  if (!isEnd) {
    return
  }
  isEnd = false
  return new Promise(resolve => {
    setTimeout(function () {
      console.log(data);
      requestList.splice(0, 1)
      isEnd = true
      requestList[0] && requestList[0]()
    }, 1000)
  })
}


event.emit('add', 1)
event.emit('add', 2)
event.emit('add', 3)
event.emit('add', 4)
