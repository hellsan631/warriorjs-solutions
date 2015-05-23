class Player {
  playTurn(warrior) {

    if(typeof this.ai ==='undefined')
      this.ai = new Ai(warrior);

    var action = this.ai.decide();

    if(action === 'attack')
      warrior.attack(this.ai.actionDirection);
    else if(action === 'walk')
      warrior.walk(this.ai.actionDirection);
    else if(action === 'rest')
      warrior.rest();

  }


}

class Ai{
  constructor(warrior) {
    this.unit = warrior;
    this.baseHP = warrior.health();
  }
  decide(){

    var hp = this.unit.health();

    return 'walk';

  }
  danger(){

  }

}

class Opponent{
  constructor(health, damage) {

  }
}

global.Player = Player;
