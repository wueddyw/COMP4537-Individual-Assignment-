let quoteCounter;
let clicked = false;
let quoteData = [];
function init(){
    initCount();
    
}

function initCount(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'admin-count',true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            quoteCounter = parseInt(xhr.responseText,10)
            getDBInfo();
        }
    };  
    
}
function loadQuestions(){
    for(i = 0; i < quoteCounter;i++){
        let div = document.getElementById('newQuestion');
        let quoteDiv = document.createElement('div');
        quoteDiv.setAttribute('id', "div"+i)
        div.appendChild(quoteDiv);
        let h4 = document.createElement('h4');
        h4.textContent = "Author:";
        quoteDiv.appendChild(h4);
        let authorInput = document.createElement('p');
        authorInput.setAttribute('id', "author"+ i);
        authorInput.textContent = quoteData[i].quote;
        quoteDiv.appendChild(authorInput);
        let linebreak3 = document.createElement("br");
        let linebreak4 = document.createElement("br");
        let h4Quote = document.createElement('h4');
        h4Quote.textContent = "Quote:";
        quoteDiv.appendChild(h4Quote);
        let quoteBox = document.createElement('p')
        quoteBox.setAttribute('id', "quote" + i);
        quoteBox.textContent = quoteData[i].author;
        quoteDiv.appendChild(quoteBox);
        quoteDiv.appendChild(linebreak3); 
        quoteDiv.appendChild(linebreak4); 
    }
}

function getDBInfo(){
    if (quoteCounter === 0){
        alert("No quotes are stored in database")
    }
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'admin-data',true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            quoteData = JSON.parse(xhr.responseText)
            if(quoteCounter ==  quoteData.length)
            {
                loadQuestions();
            }
        }
    }; 
    
}

function getRecentQuote(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'API/v1/quotes/1');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            if(clicked === false && quoteCounter > 0){
                let linebreak3 = document.createElement("br");
                let linebreak4 = document.createElement("br");
                let div = document.getElementById('latestQuoteBtn')
                div.after(linebreak3); 
                div.after(linebreak4);
                let quoteBox = document.createElement('p')
                quoteBox.setAttribute('id', "quote" + i);
                quoteBox.textContent = data[0].author;
                div.after(quoteBox);
                let h4Quote = document.createElement('h4');
                h4Quote.textContent = "Latest Quote:";
                div.after(h4Quote)
                let authorInput = document.createElement('p');
                authorInput.setAttribute('id', "author"+ i);
                authorInput.textContent = data[0].quote;
                div.after(authorInput);
                let h4 = document.createElement('h4');
                h4.textContent = "Latest Author:";
                div.after(h4);
                clicked = true;
            }    
        }
        
    };
}