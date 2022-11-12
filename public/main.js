document.getElementById("heads").onclick = makeReq;
document.getElementById("tails").onclick = makeReq;
let deletebtn = document.querySelectorAll("#deletebtn")

function makeReq(e){
  let userChoice = e.target.value

  // fetch('/api')
  //   .then((response) => response.json())
  //   .then((data) => {
  //   console.log(data.coinToss);
  //   let result = document.querySelector('#result')
  //   if (userChoice === data.coinToss){
  //       result.innerHTML = `You guessed right!`
  //   }else{
  //     result.innerHTML = `You guessed wrong!`
  //   }
  // })

  fetch('coinflip', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'userChoice': userChoice,
    })
  }).then(response => {
    window.location.reload()
    
  })

}


Array.from(deletebtn).forEach(function(element) {
  element.addEventListener('click', function(){
    fetch('delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': element.dataset.id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


