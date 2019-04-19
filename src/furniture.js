export default class FurnitureStore {
  getFurnitures() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://it771mq5n2.execute-api.us-west-2.amazonaws.com/production/furniture`

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
      let furnitureType = furnitures[i].type[0];
      let typeTerms = this.splitTerms(type);
      for (let j = 0 ; j < typeTerms.length ; j++) {
        if (furnitureType.includes(typeTerms[j])) {
          matchingFurnitures.push(furnitures[i]);
          break;
        }
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
