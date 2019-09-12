class Player {
  constructor(summonerName, server, champion) {
    this.node = document.querySelector("#player");
    this._profileIcon = this.node.querySelector("#profileIcon");
    this._champion = this.node.querySelector("#champion");
    this._summonerName = this.node.querySelector("#summonerName");
    this._summonerSpells = this.node.querySelectorAll(".summonerSpell");
    this._score = this.node.querySelector("#score");

    if (summonerName !== undefined) {
      this.summonerName = summonerName;
    }
    if (server !== undefined) {
      this.server = server;
    }
    if (champion !== undefined) {
      this.champion = champion;
    }
  }


  set summonerName(name) {
    const url = new URL(this._profileIcon.src);
    url.pathname = `/${url.pathname.split("/")[1]}/${name}.png`;

    this._profileIcon.src = url;
    this._summonerName.textContent = name.replace("_", " ");
  }

  get summonerName() {
    return _summonerName.textContent;
  }


  set server(server) {
    const url = new URL(this._profileIcon.src);
    url.pathname = `/${server}/${url.pathname.split("/")[2]}.png`;

    this._profileIcon.src = url;
  }

  get server() {
    const url = new URL(this._profileIcon.src);
    return url.pathname.split("/")[1];
  }


  set champion(name) {
    this._champion.textContent = name;
  }

  get champion() {
    return this._champion.textContent;
  }


  set summonerSpells(spells) {
    if (!(spells instanceof Array)) {
      throw new TypeError("Summoner spells must be of type Array");
    }

    const spell1 = spells[0].capitalize();
    this._summonerSpells[0].querySelector("small").textContent = spell1;
    this._summonerSpells[0].querySelector("img").src = `http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/Summoner${spell1}.png`;

    const spell2 = spells[1].capitalize();
    this._summonerSpells[1].querySelector("small").textContent = spell2;
    this._summonerSpells[1].querySelector("img").src = `http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/Summoner${spell2}.png`;
  }

  get summonerSpells() {
    return [
      this._summonerSpells[0].querySelector("small").textContent,
      this._summonerSpells[1].querySelector("small").textContent
    ];
  }


  set score(kda) {
    if (!(kda instanceof Object) && !(kda instanceof Array)) {
      throw new TypeError("Summoner spells must be of type Object or Array");
    }

    if (kda instanceof Object) {
      this._score.textContent = `${kda.kills}/${kda.deaths}/${kda.assists}`;
    } else {
      this._score.textContent = `${kda[0]}/${kda[1]}/${kda[2]}`;
    }
  }

  get score() {
    const kda = this._score.textContent.split("/");
    return {
      kills: kda[0],
      deaths: kda[1],
      assists: kda[2]
    };
  }
}
