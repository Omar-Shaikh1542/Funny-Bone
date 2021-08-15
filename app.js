const layouts = document.querySelector(".layout")

class UI{
    Layout(ID, CATEGORY, TITLE, BODY){

        const design = `<div class="about">
        <h1 class="identity">${ID}</h1>
        <h6 class="category">${CATEGORY}</h6>
        </div>
        <h4 class="title">${TITLE}</h4>
        <h5 class="Body">${BODY}</h5>`;
        
        
        layouts.innerHTML = design
        
        
    }
    async FilterJSON(buttonId, ID, CATEGORY, TITLE, BODY){
        
        var jokeSet = []
        await JokesJson.GetJson(jokeSet);
        const ArrayLength = jokeSet[buttonId].Set.length
        
        var randomIndex = this.GetRandom(ArrayLength)
         
        ID = jokeSet[buttonId].Set[randomIndex].id
        TITLE = jokeSet[buttonId].Set[randomIndex].title
        CATEGORY = jokeSet[buttonId].Set[randomIndex].category
        BODY = jokeSet[buttonId].Set[randomIndex].body
        return {
            ID: ID, 
            CATEGORY: CATEGORY,
            TITLE: TITLE, 
            BODY: BODY
        };
    }
    
    GetRandom(ArrayLength){
        
        var randomIndex = Math.floor((Math.random()*ArrayLength)+0)
        randomIndexMemory.push(randomIndex)
        
        if(randomIndexMemory.length > 1 && randomIndexMemory[randomIndexMemory.length-1] == randomIndexMemory[randomIndexMemory.length-2]){    
            while(randomIndexMemory[randomIndexMemory.length-1] == randomIndexMemory[randomIndexMemory.length-2]) {
                randomIndex = Math.floor((Math.random()*ArrayLength)+0)
                break;
            }
            randomIndexMemory.push(randomIndex)
        }
        if(randomIndexMemory.length > 5){
            for(var i = 0; i<=4; i++){
                randomIndexMemory.shift()
            }
        }
        return randomIndex
    }
    
}
class JokesJson {
    static async GetJson(jokeSet){
        const link = "jokes.json"
        const res = await fetch(link)
        const data = await res.json()
        jokeSet.push(...data)
        // fetch(link).then(res => res.json()).then(data => {
        //     jokeSet.push(...data)
        //     console.log(data); //output 1: 49
        //     console.log(jokeSet); //output 2: 50 
        // })
        // console.log(jokeSet); //output 3: 53 outside the .then block
        return jokeSet;
    }
    
}

const ui = new UI();
const jokesjson = new JokesJson();
var randomIndexMemory = []

var button
var buttonMemory = []
const btn = document.addEventListener("click", async e => {
    button = e.target
    if(button.tagName == "BUTTON"){
        var buttonId = button.id
        buttonMemory.push(buttonId)
        const buttonClassName = button.className
        
        var ID = ""
        var CATEGORY  = ""
        var TITLE = ""
        var BODY = ""
        
        if(buttonClassName == "Prev" && buttonId == "13" || buttonClassName == "Next" && buttonId == "14"){
            buttonMemory.pop()
            buttonId = buttonMemory[buttonMemory.length-1]
            var ITEM = await ui.FilterJSON(buttonId, ID, CATEGORY, TITLE, BODY) 
            ID = ITEM.ID;
            CATEGORY = ITEM.CATEGORY;
            BODY = ITEM.BODY;
            TITLE = ITEM.TITLE;

            ui.Layout(ID, CATEGORY, TITLE, BODY)
        }
        else {
            var ITEM = await ui.FilterJSON(buttonId, ID, CATEGORY, TITLE, BODY) 
            ID = ITEM.ID;
            CATEGORY = ITEM.CATEGORY;
            BODY = ITEM.BODY;
            TITLE = ITEM.TITLE;

            ui.Layout(ID, CATEGORY, TITLE, BODY)
        }
        if(buttonMemory.length == 5){
            for(var i = 0; i<=3; i++){
                buttonMemory.shift()
            }
        }
    } else { 
        e.preventDefault()
    } 
})
