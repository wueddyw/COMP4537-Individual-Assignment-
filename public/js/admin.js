let quoteCounter;
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
        let authorInput = document.createElement('input');
        authorInput.setAttribute('type','text');
        authorInput.setAttribute('style', 'width: 340px;');
        authorInput.setAttribute('style', 'color : black;');
        authorInput.setAttribute('id', "author"+ i);
        authorInput.value = quoteData[i].quote;
        quoteDiv.appendChild(authorInput);
        let linebreak = document.createElement("br");
        let linebreak2 = document.createElement("br");
        let linebreak3 = document.createElement("br");
        let linebreak4 = document.createElement("br");
        quoteDiv.appendChild(linebreak); 
        quoteDiv.appendChild(linebreak2); 
        let h4Quote = document.createElement('h4');
        h4Quote.textContent = "Quote:";
        quoteDiv.appendChild(h4Quote);
        let quoteBox = document.createElement('textarea')
        quoteBox.setAttribute('rows', '4');
        quoteBox.setAttribute('cols', '50');
        quoteBox.setAttribute('id', "quote" + i);
        quoteBox.value = quoteData[i].author;
        quoteDiv.appendChild(quoteBox);
        quoteDiv.appendChild(linebreak3); 
        quoteDiv.appendChild(linebreak4); 
        let updateButton = document.createElement('button');
        updateButton.textContent = "Update To Database"
        updateButton.setAttribute('onclick','updateQuote('+quoteData[i].id+','+ i +')')
        quoteDiv.appendChild(updateButton);
        let deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete Quote"
        deleteButton.setAttribute('onclick','deleteQuote('+quoteData[i].id+',div'+i+')')
        quoteDiv.appendChild(deleteButton);
        quoteDiv.appendChild(linebreak); 
        quoteDiv.appendChild(linebreak2); 
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

function addQuestion(dbid){
    let div = document.getElementById('newQuestion');
    let quoteDiv = document.createElement('div');
    quoteDiv.setAttribute('id' , 'div'+quoteCounter)
    div.appendChild(quoteDiv);
    let h4 = document.createElement('h4');
    h4.textContent = "Author:";
    quoteDiv.appendChild(h4);
    let authorInput = document.createElement('input');
    authorInput.setAttribute('type','text');
    authorInput.setAttribute('style', 'width: 340px;');
    authorInput.setAttribute('style', 'color : black;');
    authorInput.setAttribute('id', "author"+ quoteCounter);
    quoteDiv.appendChild(authorInput);
    let linebreak = document.createElement("br");
    let linebreak2 = document.createElement("br");
    let linebreak3 = document.createElement("br");
    let linebreak4 = document.createElement("br");
    quoteDiv.appendChild(linebreak); 
    quoteDiv.appendChild(linebreak2); 
    let h4Quote = document.createElement('h4');
    h4Quote.textContent = "Quote:";
    quoteDiv.appendChild(h4Quote);
    let quoteBox = document.createElement('textarea')
    quoteBox.setAttribute('rows', '4');
    quoteBox.setAttribute('cols', '50');
    quoteBox.setAttribute('id', "quote" + quoteCounter);
    quoteDiv.appendChild(quoteBox);
    quoteDiv.appendChild(linebreak3); 
    quoteDiv.appendChild(linebreak4); 
    let updateButton = document.createElement('button');
    updateButton.textContent = "Update To Database"
    updateButton.setAttribute('id', 'quote-btn-'+quoteCounter)
    updateButton.setAttribute('onclick','updateQuote('+null+','+ quoteCounter +',)')
    quoteDiv.appendChild(updateButton);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Quote"
    deleteButton.setAttribute('id', 'delete-btn-'+quoteCounter)
    deleteButton.setAttribute('onclick','deleteQuote('+null+',div'+ quoteCounter +')')
    quoteDiv.appendChild(deleteButton);
    quoteDiv.appendChild(linebreak); 
    quoteDiv.appendChild(linebreak2); 
    quoteCounter++;
}

function deleteQuote(id,div){
    div.remove();
    if(id != null){
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'delete-question',true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhr.send("id="+id);
    }
}

function updateQuote(id,num){
    if(id == null){
        let author = document.getElementById('author' + num).value
        let quote = document.getElementById('quote' +num).value
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'update-question-post',true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('quote-btn-'+num).setAttribute('onclick','updateQuote('+JSON.parse(xhr.responseText)[0].id+','+ num +')')
                document.getElementById('delete-btn-'+num).setAttribute('onclick','deleteQuote('+JSON.parse(xhr.responseText)[0].id+',div'+ num +')')
            }
        };
        xhr.send("quote="+quote+"&author="+author);
    }else{
        let author = document.getElementById('author' + num).value
        let quote = document.getElementById('quote' +num).value
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', 'update-question',true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhr.send("id="+id+"&quote="+quote+"&author="+author);
    }
}