class Player {
  constructor() {
    this.node = document.querySelector("#player");
    this._profileIcon = this.node.querySelector("#profileIcon");
    this._champion = this.node.querySelector("#champion");
    this._summonerName = this.node.querySelector("#summonerName");
    this._summonerSpells = this.node.querySelectorAll(".summonerSpell");
    this._score = this.node.querySelector("#score");
  }

  set champion(name) {
    this._champion.textContent = name;
  }

  get champion() {
    return this._champion.textContent;
  }
}
