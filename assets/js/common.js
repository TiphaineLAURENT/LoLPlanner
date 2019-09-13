const https = require('https');

String.prototype.capitalize = function(lower) {
  return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};

const PATCH_VERSION = "6.24.1"

function getAssets(assetid, id) {
  switch (assetid) {
    case "profileIcon":
      return `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/profileicon/${id}.png`;

    case "championSquare":
      return `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/champion/${id}.png`;

    case "passive":
      return `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/passive/${id}_P.png`;

    case "ability":
      return `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/spell/${id}.png`;

    case "summonerSpell":
      return `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/spell/Summoner${id}.png`;

    case "item":
      return `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/item/${id}.png`;

    case "mastery":
      return `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/mastery/${id}.png`;

    case "rune":
      return `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/rune/${id}.png`;

    case "minimap":
      return `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/map/map${id}.png`;

    case "icon":
      return `http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/${id}.png`;

    case "champions":
      const request = new XMLHttpRequest();
      request.open('GET', `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/data/en_US/champion.json`, false);
      request.send();
      return JSON.parse(request.responseText).data;
  }
}

function get(url) {
  return new Promise(resolve => {
    https.get(url, (resp) => {
      let data = "";
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        resolve(data);
      });
    });
  });
}

module.exports = {
  PATCH_VERSION: PATCH_VERSION,
  getAssets: getAssets,
  get: get
}
