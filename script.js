const ussAssembly = {
    hull: 20,
    firepower: 5,
    accuracy: 0.7,
}
console.log(ussAssembly.hull)
const alienShips = []
 
for(let i=0; i < 6; i++){
    const alien = {
        hull: Math.floor(Math.random() * (6 - 3) +3),
        firepower: Math.floor(Math.random() * (4 - 2) +2),
        accuracy: Math.random() * (0.8 - 0.6) + 0.6
    }
    alienShips.push(alien)    
}

// queries

const usHull = document.querySelector('#ussaHull')
const usFirepower = document.querySelector('#ussaFirepower')
const usAccuracy = document.querySelector('#ussaAccuracy')
const alnIdx = document.querySelector('#alienIndex')
const alienHull = document.querySelector('#alienHull')
const alienFirepower = document.querySelector('#alienFirepower')
const alienAccuracy = document.querySelector('#alienAccuracy')
const atkbtn = document.querySelector('#attackbtn')
const rtbtn = document.querySelector('#retreatbtn')
const popmsg = document.querySelector('.popup')

let alienIndex = 0
function updateAlien(){ 
    let alien = alienShips[alienIndex] 
    alnIdx.textContent = `Alien: ${alienIndex}`
    alienHull.textContent = `Hull: ${alien.hull}`
    alienFirepower.textContent = `Firepower: ${alien.firepower}`
    alienAccuracy.textContent  = `Accuracy: ${alien.accuracy}`
}
function updateUssAssembly(){
    usHull.textContent = `Hull: ${ussAssembly.hull}`
    usFirepower.textContent = `Firepower: ${ussAssembly.firepower}`
    usAccuracy.textContent = `Accuracy: ${ussAssembly.accuracy}`
}


function displaymessage(message){
popmsg.innerHTML = ""
const p = document.createElement('p')
p.setAttribute('class','message')
p.innerText = message
popmsg.appendChild(p)
}



function attack(){
    const alien = alienShips[alienIndex]    
    // ussAssembly attack
    if(ussAssembly.hull > 0){
    if(Math.random() < ussAssembly.accuracy)
    {
        alien.hull -= ussAssembly.firepower
        if(alien.hull <= 0 && alienIndex >= alienShips.length)
        {
           displaymessage('WINNER WINNER CHICKEN DINNER') 
           return            
        }else if(alien.hull <= 0){            
            displaymessage('You destroyed Alien ship!')
            alienIndex++
            updateAlien()
        }else {
            // updateAlien()
            displaymessage('you hitted target')
        }
    }else{
        displaymessage('ALIEN ESCAPED')        
    }
    }else{
        displaymessage('You are dead game over')
        return
    }
    // Alien attack
    if(alienIndex < alienShips.length){
        if(Math.random() < alienShips[alienIndex].accuracy){
            ussAssembly.hull -= alienShips[alienIndex].firepower
            if(ussAssembly.hull <= 0){
                displaymessage('you are dead. GAME OVER!')
                return
            }else{
                // updateAlien()
                updateUssAssembly()
                displaymessage('you got shot by alien')
            } 
        }
    }else{
        displaymessage('MISSION COMPLETED!')
        return
    }  
    
}


function retreat(){
    displaymessage('You retreated. GAME OVER!') 
    return
}

atkbtn.addEventListener('click',attack)
rtbtn.addEventListener('click',retreat)