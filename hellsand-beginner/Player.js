class Player {
  playTurn(warrior) {

    if(typeof this.ai ==='undefined')
      this.ai = new Ai(warrior);

    var action = this.ai.decide('forward');

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
  decide(direction){

    var hp = this.unit.health();
    var action;
    this.actionDirection = direction;

    if(hp < 8){
      this.inDanger = true;
    }else if(hp === this.baseHP){
      this.inDanger = false;
    }

    if(this.inDanger){
      if(this.unit.feel(direction).isEnemy()){
        action = 'walk';
        this.actionDirection = 'backward';
      }else{
        action = 'rest';
      }
    }else{
      if(this.unit.feel(direction).isEnemy()){
        action = 'attack';
      }else{
        action = 'walk';
      }
    }

    return action;

  }

}

global.Player = Player;
