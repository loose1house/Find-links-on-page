

/* функция для желтого выделения */
function highlightFoundLink(str, target){
    var openSpan ="<span style=\"background-color:#ffff00\">";
    var closeSpan ="</span>";
    let pos = 0;
    let indexFound = true;
    while (indexFound) {
      let foundPos = str.toLowerCase().indexOf(target.toLowerCase(), pos);
      if (foundPos == -1) {indexFound = false;}
      else {
      console.log( `Найдено тут: ${foundPos}` );
        str = str.substring(0, foundPos) + openSpan + str.substring(foundPos, target.length+foundPos) + closeSpan + str.substring(foundPos+target.length);
        console.log(str);
      pos = foundPos + target.length+openSpan.length + closeSpan.length; // продолжаем со следующей позиции
      }
    }
    return str;
    }

/* ПРЯЧЕМ ОКНО ПОИСКА ЕСЛИ ЩЕЛКНУТЬ НЕ НА НЕГО*/
window.onload = function(){
    var divToHide = document.getElementById('cftResult_box');
    var searchClear = document.getElementById('cftSearchInput');
    var resultText = document.getElementById('cftResult_text');
    document.onclick = function(e){
      if((e.target.id !== 'cftResult_box') && (e.target.id !== 'cftSearchInput')){
          divToHide.style.opacity = 0;
          searchClear.value = "";
          resultText.style.opacity = 0;
      }
    };    
};
  
  
/* ФУНКЦИЯ ПОИСКА*/
var divToIns = document.getElementById("cftFoo");
var parentDiv = divToIns.parentNode;
  
function includes(){    
    document.getElementById('cftResult_box').innerHTML = ""; /* Очистить содержимое выведенного списка*/
    var f = document.links;       
    var valOfSearch = document.getElementById('cftSearchInput').value;
    var i;
    var selectedLinkList = "";
    var numCoinc = 0; /*Счетчик совпадений*/
    var length = f.length; /*Делаем длину массива статической, чтобы не создать бесконечность при for */
          for (i = 0; i < length; i++) {
              /* Поиск игнорирует регистр*/
              if (((f[i].innerText.toLowerCase().includes(valOfSearch.toLowerCase())) == true) && valOfSearch.length > 0) {
              document.getElementById('cftResult_text').style.opacity = 1;
              document.getElementById('cftResult_box').style.opacity = 1;
              var href = f[i].href;
              var text = highlightFoundLink(f[i].innerText, valOfSearch)+"<br>";                
              var newlink = document.createElement("a");
                            
              /*text.replace("","<span style=color:blue" + )*/
              newlink.insertAdjacentHTML('beforeend', text);

              newlink.setAttribute('href', href); 
              selectedLinkList = selectedLinkList + newlink.outerHTML;
              numCoinc++;
                  } else if (valOfSearch.length < 1 ) {
                      document.getElementById('cftResult_box').style.opacity = 0;
                      document.getElementById('cftResult_text').style.opacity = 0;
                  } else {};
          }
    
    /* Вставляем строку со всеми ссылками в div*/                 
    parentDiv.insertAdjacentHTML('beforeend', selectedLinkList);
    
    /*Прописывает сколько совпадений справа от окна поиска + если совпадений нет убирает div*/
    document.getElementById("cftResult_text").innerHTML = `Найдено ${numCoinc}`;  
    if (numCoinc == '0') {document.getElementById('cftResult_box').style.opacity = 0;} else {};        
};

/* вызов функции поиска каждый раз, когда в окне поиска вводят что-либо */
document.getElementById("cftSearchInput").oninput = function() {
includes();
};
 