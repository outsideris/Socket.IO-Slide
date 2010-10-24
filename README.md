HTML5 Slide for Socket.IO
=================================

[HTML5 Slide](http://github.com/sioked/html5-slides) about [Socket.IO](http://github.com/LearnBoost/Socket.IO-node) for presentation in [FRENDS](http://frends.kr)

## Requirements
- node.js (tested in 0.2.3)
- Socket.IO (tested in 0.5.3)

## How to use
run node server(you have to run server.js in socket.io directory)

    cd socket.io/
	node socketio-slide.js

* connect at web browser - `http://localhost:8124/`

### Explain

This Slide is about `Socket.IO` using [HTML5 Slide](http://github.com/sioked/html5-slides).

It contained some demo in slide.

Actually two sockets is used in slide, one is for demo. 
another is for sync page of slide with others. page sync is operated only when id is matched. so you can connect to like `http://localhost:8124/?id=test` for sync page. then sync page with each other(eg. `?id=test`). if id isn't exist. slide doesn't sync.

### Slide Scenario

* connect to url at more than two browser(use `?id=sameid`)
* explain slide (all slide synced page)
* at `io.Socket() Object Properties` page, you have to connect to server at all browser.
* at `Communication with Server` page, demo for send(). your message will be received to your browser not other.
* at `Broadcast via server` page, demo for broadcast(). your message will be broadcase to other browser(if those are connected), not your browser.
