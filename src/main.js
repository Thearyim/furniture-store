import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles.css';
import $ from 'jquery';
import FurnitureStore from "./furniture.js";

$(document).ready(function() {
  let type;

  $('#searchForm').submit(function(event) {
    event.preventDefault();
    $('#matchingFurnitures').html("");
    type = $('#type').val();

    showResults();
  })

function showResults() {
  let furnitureStore = new FurnitureStore();
  let promise1 = furnitureStore.getFurnitures();

  promise1.then(function(response) {
    let body = JSON.parse(response);
    let furnitures = body.data;
    if (type != "") {
      furnitures = furnitureStore.filterByType(furnitures, type);
    }

    let html = '';
    if (furnitures.length == 0) {
      html = '<div>There are no furniture that match your search criteria. Please go to our main menue to view all furniture.</div>';
    }
    else {
      for (let i = 0 ; i < furnitures.length ; i++) {
        html += getFurnitureDetailHtml(furnitures[i]);
      }
    }

    $('#matchingFurnitures').html(html);
  });
}

function getFurnitureDetailHtml(furniture) {
  let data = furniture.datas[0];
  let html =
  `<div>
    <div>${furniture.name}</div>
    <div><img src='${furniture.imageUrl}'></img></div>
    <div>${furniture.description}</div>
    <div>Available colors:${furniture.colors}</div>
    <div>Type: ${furniture.type}</div>
    <div>Deliverable: ${furniture.deliverable}</div>
    <div>Cost: ${furniture.cost}</div>
    <div>Available in stock: ${furniture.stock}</div>`;

    return html;
  }
});
