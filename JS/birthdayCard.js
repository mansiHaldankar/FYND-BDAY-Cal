var data = [
    {
      "name": "Tyrion Lannister",
      "birthday": "11/30/1975"
    }, {
      "name": "Cersei Lannister",
      "birthday": "11/30/1975"
    }, {
      "name": "Daenerys Targaryen",
      "birthday": "11/30/1975"
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

window.onload = () => {
    document.getElementById("jsonDataTextArea").value = JSON.stringify(getData());
}

var getData = (year) => {
    return data;
}

var getDay = (bday) => {
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

var getShortNames = (fullName) => {
    return fullName && fullName.match(/\b\w/g).join('') || "";
}
var resultArray;
var updateData = () => {
    var selectedYear = document.getElementById("yearInput").value;
    var filteredDates = data.filter((year) => Number((year.birthday).split("/")[2]) === Number(selectedYear));
    resultArray = filteredDates.map(dateObj => {
        return { ...dateObj,  day: getDay(dateObj['birthday']), shortName: getShortNames(dateObj['name'])}
    });
}
function appendBirthDayDiv(){
    var parentDiv = document.getElementsByClassName("bdayData");
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }
    updateData();
    var iDiv = document.createElement("div");
    iDiv.className = "person-sec";
    
    for (var bday in resultArray){
        // iDiv.id = "person-name" + bday;
        document.getElementById(resultArray[bday].day).appendChild(iDiv);
        // document.getElementById("person-name")
    }
}
