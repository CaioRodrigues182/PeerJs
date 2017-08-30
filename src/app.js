import getUserMedia from 'getusermedia'
import Peer from 'peerjs'

   /* var pc1 = new Peer({key: 'z79zbhhm7j1hsemi',
      config: {'iceServers': [
          { url: 'stun:stun1.l.google.com:19302' },
          { url: 'turn:numb.viagenie.ca',
          }
      ]}
    }); */
navigator.webkitGetUserMedia({video : true, audio: false}, function(stream) {
  /*var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  }) */  
    var peer = new Peer({key: 'z79zbhhm7j1hsemi'});

    peer.on('open', function (call) {
      document.getElementById('peerId').innerHTML = peer.id;
    })   

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = document.getElementById('otherId').value;
    var call = peer.call(otherId, stream);
    call.on('stream', function (stream) {
      var video = document.createElement('video')
      document.body.appendChild(video)
  
      video.src = window.URL.createObjectURL(stream)
      video.play()
    })
  })

  peer.on('call', function (call) {
    call.answer(stream);
    call.on('stream', function (stream) {
      var video = document.createElement('video')
      document.body.appendChild(video)
  
      video.src = window.URL.createObjectURL(stream)
      video.play()
    })
  })

  
}, function (err) {
    console.log(err);
})
 




