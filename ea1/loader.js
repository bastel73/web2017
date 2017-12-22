'use strict';
let txt;

let playerListFirstNames;
let path;
let docElement;
let childElement;

function onPressAdd() {

    /*let pic=document.getElementById("mainContent");
    let img1=document.createElement('img');
    img1.setAttribute('id', 'pic1')
    img1.setAttribute('src','svo_logo.png');
    pic.appendChild(img1);*/
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getPlayerList(xhttp.responseXML);
        }
    };
    xhttp.open("GET", "mannschaftsliste_neu.xml", true);
    xhttp.send();

    /*let xmlString=  '<?xml version="1.0" encoding="ISO-8859-1"?>'+
                    '<artists>'+
                        '<artist name="Kyuss">'+
                            '<albums>'+
                                '<album>'+
                                    '<title>Wretch</title>'+
                                    '<year>1991</year>'+
                                '</album>'+
                            '</albums>'+
                        '</artist>'+
                    '</artists>';
    let domParser=new DOMParser();
    let xmlDOM=domParser.parseFromString(xmlString, 'text/xml');
    let xmlSerializer=new XMLSerializer();
    let xmlStringSerialized=xmlSerializer.serializeToString(xmlDOM);
    console.log(xmlStringSerialized);*/
}

function onPressDelete() {
    let docElement;
    docElement=document.querySelector("aside");
    docElement.lastElementChild.remove();
}

/*function showResult(xml) {

    let vorname=document.querySelector('#spieler').value;
    path = "/teamlist/player[firstName='"+vorname+"']/lastName";
    if (xml.evaluate) {
        let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        let result = nodes.iterateNext();
        while (result) {
            txt += result.childNodes[0].nodeValue + "<br>";
            result = nodes.iterateNext();
        }
        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xml.setProperty("SelectionLanguage", "XPath");
        let nodes = xml.selectNodes(path);
        for (let i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
    document.getElementById("mainAsideID").innerHTML = txt;
}*/

    function getPlayerList(xml) {
        path = "/teamlist/player/firstName";
        docElement = document.querySelector('aside');
        console.log(docElement.lastElementChild.getAttribute('id'));
        if(docElement.lastElementChild.getAttribute('id')==='playerListTotal'){
            return;
        }
        let list = document.createElement('ul');
        list.setAttribute('id', 'playerListTotal');
        list.className = 'playerList';
        docElement.appendChild(list);

        //list = document.querySelector('ul');


        let listItem;
        let textListItem;
        let dragNum=1;

        if (xml.evaluate) {
            playerListFirstNames = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            let result = playerListFirstNames.iterateNext();
            while (result) {

                listItem = document.createElement('li');

                listItem.setAttribute('id','drag'+dragNum);
                listItem.setAttribute('draggable', 'true');
                listItem.setAttribute('ondragstart', 'drag(event)');
                textListItem = document.createTextNode(result.childNodes[0].nodeValue);
                listItem.appendChild(textListItem);
                list.appendChild(listItem);
                dragNum++;
                result = playerListFirstNames.iterateNext();

            }
        } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
            xml.setProperty("SelectionLanguage", "XPath");
            playerListFirstNames = xml.selectNodes(path);
            for (let i = 0; i < playerListFirstNames.length; i++) {

                listItem = document.createElement('li');
                listItem.setAttribute('draggable', 'true');
                listItem.setAttribute('ondragstart', 'drag(event)');
                listItem.setAttribute('id', 'drag' + i);
                list.appendChild(listItem);
                textListItem = document.createTextNode(playerListFirstNames.childNodes[0].nodeValue);
                listItem.appendChild(textListItem);

            }
        }

    }
    function allowDrop(ev) {
        ev.preventDefault();

    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);

    }

    function drop(ev) {
        ev.preventDefault();
        let name;
        let data = ev.dataTransfer.getData("text");

        if(ev.target.innerHTML!='Torwart'){
            name=ev.target.innerHTML;
            ev.target.innerHTML=document.getElementById(data).innerHTML;
            document.getElementById(data).innerHTML=name;
        }else{
            ev.target.innerHTML=document.getElementById(data).innerHTML;
            let parent=document.getElementById(data).parentNode;
            parent.removeChild(document.getElementById(data));
        }



    }



