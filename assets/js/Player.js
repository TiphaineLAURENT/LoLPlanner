class Player {
  constructor(team, summonerName, server, champion) {
    this.id = Player.ids += 1;
    document.querySelector(`.team.is-${team}`).innerHTML += `
    <div class="column is-one-fifth" id="player${this.id}">
                <div class="box is-material">
                  <div class="header is-flex">
                    <figure class="image is-64x64">
                      <img src="http://avatar.leagueoflegends.com/euw/mcpkaosce.png" alt="Image" id="profileIcon">
                    </figure>
                    <div class="names">
                      <h2 class="title has-text-dark is-4" id="champion">Warwick</h2>
                      <h3 class="subtitle has-text-dark is-6" id="summonerName">Kaosce</h3>
                    </div>
                  </div>
                  <div class="content">
                    <p>
                      <div class="summonerSpells is-flex">
                        <figure class="image is-32x32 summonerSpell is-pulled-left">
                          <img src="http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerDot.png" alt="Image" id="profileIcon">
                          <small>Ignite</small>
                        </figure>
                        <figure class="image is-32x32 summonerSpell is-pulled-left">
                          <img src="http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerExhaust.png" alt="Image" id="profileIcon">
                          <small>Exhaust</small>
                        </figure>
                      </div>
                      <br>
                      <p class="has-text-centered" id="score">0/0/0</p>
                    </p>
                  </div>
                  <nav class="level is-mobile">
                    <div class="level-left">
                      <a class="level-item" aria-label="reply">
                        <span class="icon is-small">
                          <i class="fas fa-reply" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a class="level-item" aria-label="retweet">
                        <span class="icon is-small">
                          <i class="fas fa-retweet" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a class="level-item" aria-label="like">
                        <span class="icon is-small">
                          <i class="fas fa-heart" aria-hidden="true"></i>
                        </span>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
`;
    this.node = document.querySelector(`#player${this.id}`);
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

Player.ids = 0;
