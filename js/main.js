
// Note:
// 1. window.getComputedStyle()
// 2. document.querySelectorAll()
// 3. parentNode
// 4. setAttribute()
// 5. setInterval
// 6. setTimeOut(), dalam detik

/* Jam Dinding */
function localClocks() {
  let date = new Date;
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  
  let hands = [
    {
      hand: "hours",
      angle: (hours * 30) + (minutes / 2)
    },
    {
      hand: "minutes",
      angle: (minutes * 6)
    },
    {
      hand: "seconds",
      angle: (seconds * 6)
    }
  ]

  for (let j = 0; j < hands.length; j++) {
    let elements = document.querySelectorAll('.' + hands[j].hand);
    for (let k = 0; k < elements.length; k++) {
      elements[k].style.transform = "rotateZ(" + hands[j].angle + "deg)";
      elements[k].style.webkitTransform = "rotateZ(" + hands[j].angle + "deg)";

      if (hands[j].hand === "minutes") {
        elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
      }
    }
  }
}

function setUpMinuteHands() {
  let containers = document.querySelectorAll(".minutes-container") 
  let secondAngle = containers[0].getAttribute("data-second-angle")
  if (secondAngle > 0) {
    let delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
    setTimeout(function() {
      moveMinuteHands(containers);
    }, delay)
  }
}

function moveMinuteHands(containers) {
  for (let i = 0; i < containers.length; i++) {
    containers[i].style.transform = "rotateZ(6deg)";
    containers[i].style.webkitTransform = "rotateZ(6deg)";
  }

  setInterval(function() {
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 12;
      } else {
        containers[i].angle += 6
      };
      containers[i].style.webkitTransform = "rotateZ(" + containers[i].angle + "deg)"
      containers[i].style.transform = "rotateZ(" + containers[i].angle + "deg)"
    }
  }, 60000)
}

function moveSecondHands() {
  let containers = document.querySelectorAll(".seconds-container");
  setInterval(function() {
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 6;
      } else {
        containers[i].angle += 6;
      }
      containers[i].style.webkitTransform = "rotateZ(" + containers[i].angle + "deg)";
      containers[i].style.transform = "rotateZ(" + containers[i].angle + "deg)";
    }
  }, 1000);
}

localClocks()
moveSecondHands();
setUpMinuteHands()

