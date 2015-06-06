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

    this.ai.lastHP = warrior.health();

  }
}

class Ai{
  constructor(warrior) {
    this.unit = warrior;

    this.lastHP = this.baseHP = warrior.health();

    this.underAttack = false;
    this.inDanger = false;
  }
  decide(direction){

    var hp = this.unit.health();

    if(this.unit.health() < 8){
      this.inDanger = true;
    }else if(hp === this.baseHP){
      this.inDanger = false;
    }

    if(this.unit.health() < this.lastHP){
      this.underAttack = true;
    }else{
      this.underAttack = false;
    }

    return this.weighAction();

  }
  weighAction(){
    var action;

    if(this.inDanger){
      if(this.underAttack){
        if(this.unit.feel(this.actionDirection).isEnemy()){
          action = 'attack';
        }else{
          this.actionDirection = 'forward';
          action = 'walk';
        }
      }else if(this.unit.feel(this.actionDirection).isEnemy()){
        action = 'walk';
        this.actionDirection = 'backward';
      } else {
        action = 'rest';
      }
    }else{
      if(this.unit.feel(this.actionDirection).isEnemy()){
        action = 'attack';
      }else{
        this.actionDirection = 'forward';
        action = 'walk';
      }
    }

    return action;
  }

}

class Opponent{
  constructor(enemy) {

  }
}

global.Player = Player;
