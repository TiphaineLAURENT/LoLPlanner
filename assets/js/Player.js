class Player {
  constructor() {
    this.node = document.querySelector("#player");
    this.profileIcon = this.node.querySelector("#profileIcon");
    this.champion = this.node.querySelector("#champion");
    this.summonerName = this.node.querySelector("#summonerName");
    this.summonerSpells = this.node.querySelectorAll(".summonerSpell");
    this.score = this.node.querySelector("#score");
  }
}
