var data = 
  [
    {
      "name": "Tyrion Lannister",
      "birthday": "12/02/1978"
    }, {
      "name": "Cersei Lannister",
      "birthday": "11/30/1975"
    }, {
      "name": "Daenerys Targaryen",
      "birthday": "11/24/1991"
    }, {
      "name": "Arya Stark",
      "birthday": "11/25/1996"
    }, {
      "name": "Jon Snow",
      "birthday": "12/03/1989"
    }, {
      "name": "Sansa Stark",
      "birthday": "15/08/1992"
    }, {
      "name": "Jorah Mormont",
      "birthday": "12/16/1968"
    }, {
      "name": "Jaime Lannister",
      "birthday": "12/06/1975"
    }, {
      "name": "Sandor Clegane",
      "birthday": "11/07/1969"
    }, {
      "name": "Tywin Lannister",
      "birthday": "10/12/1951"
    }, {
      "name": "Theon Greyjoy",
      "birthday": "12/31/1989"
    }, {
      "name": "Samwell Tarly",
      "birthday": "12/07/1990"
    }, {
      "name": "Joffrey Baratheon",
      "birthday": "06/12/1992"
    }, {
      "name": "Catelyn Stark",
      "birthday": "12/03/1962"
    }, {
      "name": "Bran Stark",
      "birthday": "12/02/1995"
    }, {
      "name": "Petyr Baelish",
      "birthday": "11/20/1974"
    }, {
      "name": "Robb Stark",
      "birthday": "11/28/1986"
    }, {
      "name": "Brienne of Tarth",
      "birthday": "11/27/1985"
    }, {
      "name": "Margaery Tyrell",
      "birthday": "12/02/1989"
    }, {
      "name": "Stannis Baratheon",
      "birthday": "09/14/1971"
    }, {
      "name": "Davos Seaworth",
      "birthday": "02/13/1973"
    }, {
      "name": "Tormund Giantsbane",
      "birthday": "12/14/1974"
    }, {
      "name": "Jeor Mormont",
      "birthday": "11/01/1955"
    }, {
      "name": "Eddard Stark",
      "birthday": "12/02/1963"
    }, {
      "name": "Khal Drogo",
      "birthday": "12/05/1980"
    }, {
      "name": "Ramsay Bolton",
      "birthday": "12/05/1976"
    }, {
      "name": "Robert Baratheon",
      "birthday": "12/02/1965"
    }, {
      "name": "Daario Naharis",
      "birthday": "12/02/1985"
    }, {
      "name": "Viserys Targaryen",
      "birthday": "12/06/1984"
    }
];

window.onload = function(){
    document.getElementById("jsonDataTextArea").value = JSON.stringify(data);
}

var getData = function(year){
    return data;
}


var getDay = function(bday){
    var bday_Day = new Date(bday).getDay();
    var weekday=new Array(7);
        weekday[0]="SUN";
        weekday[1]="MON";
        weekday[2]="TUE";
        weekday[3]="WED";
        weekday[4]="THU";
        weekday[5]="FRI";
        weekday[6]="SAT"

    return weekday[bday_Day];
}

var getShortNames = function(fullName){
    return fullName && fullName.match(/\b\w/g).join('') || "";
}

var updateData = function(){
    var selectedYear = document.getElementById("yearInput").value;
    var newData = JSON.parse(document.getElementById("jsonDataTextArea").value);
    data = newData;
    var filteredDates = data.filter((year) => Number((year.birthday).split("/")[2]) === Number(selectedYear));
    var resultArray = filteredDates.map(function(dateObj){
        return { ...dateObj,  day: getDay(dateObj['birthday']), shortName: getShortNames(dateObj['name'])}
    });
    
    //remove old DIVs
    var wrapperContainerChildren = document.querySelector(".wrapper-container").children;
    for (var iChild =0; iChild < wrapperContainerChildren.length; iChild++) {
      if(wrapperContainerChildren[iChild].querySelectorAll(".bdayData")[0].childElementCount) {
        var childList = wrapperContainerChildren[iChild].querySelectorAll(".bdayData")[0].childNodes;
        var childListLength = wrapperContainerChildren[iChild].querySelectorAll(".bdayData")[0].childNodes.length;
        for (var jChild=0; jChild<childListLength; jChild++) {
          wrapperContainerChildren[iChild].querySelectorAll(".bdayData")[0].removeChild(childList[0]);
        }
      }
    }
    var metaData = {};

    for (var iKey in resultArray) {
      if(!metaData[resultArray[iKey].day]) {
          metaData[resultArray[iKey].day] = new Array();
        }
      metaData[resultArray[iKey].day].push(resultArray[iKey]);
    }
    var counter = 0;
    var colorArray = [];
    for (var iCount in metaData){
        counter = (metaData[iCount].length > counter) ? metaData[iCount].length : counter;
    }
    getRandomColor(counter, colorArray)
    for (var bday in metaData){
      var dayArray = metaData[bday];
      //sorting date wise
      dayArray.sort(function(a,b){
        return new Date(a.birthday) - new Date(b.birthday);
      });
 
      for (var jBday in dayArray) {
        var innerWidth = document.getElementById(dayArray[jBday].day).clientWidth;
        var dayArrayLength = dayArray.length;
        var childWidth = (innerWidth  / dayArrayLength);
        var iDiv = document.createElement("div");
        iDiv.className = "person-sec";
        iDiv.id = "person-name-" + bday + "-" + jBday;
        document.getElementById(dayArray[jBday].day).appendChild(iDiv);
        document.getElementById(iDiv.id).innerHTML = dayArray[jBday].shortName;
        document.getElementById(iDiv.id).style.width = childWidth + 'px';
        document.getElementById(iDiv.id).style.height = childWidth + 'px';
        document.getElementById(iDiv.id).style.backgroundColor = colorArray[jBday];
      }
    }
}
function getRandomColor(counter, colorArray) {
  var letters = '0123456789ABCDEF';
  for(var iCounter = 0; iCounter < counter; iCounter++){
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colorArray.push(color);
  }
  return colorArray;
}
