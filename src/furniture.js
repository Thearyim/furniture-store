export default class FurnitureStore {
  getFurnitures() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://it771mq5n2.execute-api.us-west-2.amazonaws.com/production/furniture`
      console.log("sending furniture store request");
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }

      request.open("GET", url, true);
      request.send();
    });
  }

  filterByType(furnitures, type) {
    let matchingFurnitures = [];
    for (let i = 0 ; i < furnitures.length ; i++) {
      let furnitureType = furnitures[i].type;
      let typeTerms = this.splitTerms(type);
        if (typeTerms.includes(furnitureType)) {
          matchingFurnitures.push(furnitures[i]);
        }
    }
    return matchingFurnitures;
  }

  splitTerms(text) {
  let terms = [];
  let individualTerms = text.split(' ');
  for (let i = 0 ; i < individualTerms.length ; i++) {
    terms.push(individualTerms[i].toLowerCase());
    }
    return terms;
  }
}
