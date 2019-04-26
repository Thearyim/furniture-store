import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles.css';
import $ from 'jquery';
import FurnitureStore from "./furniture.js";
import logo from './img/logo.png';

$(document).ready(function() {
  let type = "";
  // let logoImg = document.getElementById('navLogo');
  // logoImg.src = logo;

  $('#searchForm').submit(function(event) {
    event.preventDefault();
    $('#matchingFurnitures').html("");
    type = $('#type').val();

    showResults();
  })

  $('#allFurnitures').click(function(event) {
    event.preventDefault();
    console.log("showroom link clicked");
    showResults();
  })

function showResults() {
  let furnitureStore = new FurnitureStore();
  let promise1 = furnitureStore.getFurnitures();

  promise1.then(function(response) {
    let responseBody = JSON.parse(response);
    let furnitures = responseBody.body.data;
    console.log(furnitures);

    // console.log(body);
    if (type != "") {
      console.log("furniture call back received by type");
      furnitures = furnitureStore.filterByType(furnitures, type);

    }

    let html = '';
    if (furnitures.length == 0) {
      console.log("no furniture found");
      html = '<div>There are no furniture that match your search criteria. Please go to our main menue to view all furniture.</div>';
    }
    else {
      console.log("building furniture html");
        html = getFurnitureDetailHtml(furnitures);
      }

    $('#matchingFurnitures').html(html);
    console.log("furniture call back received");
  });
}

function getFurnitureDetailHtml(furnitures) {
  let html = '';
  for (let i = 0 ; i < furnitures.length ; i++) {
    let furniture = furnitures[i];
    html +=
    `<div>
      <div>${furniture.name}</div>
      <div><img class="furnitureImage" src='${furniture.imageUrl}'></img></div>
      <div>${furniture.description}</div>
      <div>Available colors:${furniture.colors}</div>
      <div>Type: ${furniture.type}</div>
      <div>Deliverable: ${furniture.deliverable}</div>
      <div>Cost: ${furniture.cost}</div>
      <div>Available in stock: ${furniture.stock}</div>
      </div>`;
      console.log(html);
  }
    return html;
  }
});
