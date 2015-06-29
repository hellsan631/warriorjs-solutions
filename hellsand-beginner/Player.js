class Player {
  playTurn(warrior) {

    if(typeof this.ai ==='undefined')
      this.ai = new Ai(warrior);

    var action = this.ai.decide('forward');

    if(action === 'attack')
      warrior.attack(this.ai.actionDirection);
    else if(action === 'walk')
      warrior.walk(this.ai.actionDirection);
    else if(action === 'rescue')
      warrior.rescue(this.ai.actionDirection);
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

    if(this.unit.health() < this.baseHP){
      this.inDanger = true;
    }else if(hp === this.baseHP){
      this.inDanger = false;
    }

    if(this.unit.health() < this.lastHP){
      this.underAttack = true;
    }else{
      this.underAttack = false;
    }

    this.obsticle = this.unit.feel(this.actionDirection);

    return this.weighAction();

  }
  weighAction(){
    var action;

    if(this.obsticle.isEnemy()){
      if(this.underAttack){
        action = 'attack';
        this.actionDirection = 'forward';
      } else if(this.inDanger){
        action = 'walk';
        this.actionDirection = 'backward';
      } else {
        action = 'attack';
      }
    } else if(this.obsticle.isCaptive()){
      action = 'rescue';
      this.actionDirection = 'forward';
    } else {
      if(this.underAttack){
        action = 'walk';
        this.actionDirection = 'forward';
      }else if(this.inDanger){
        action = 'rest';
      }else {
        action = 'walk';
      }
    }

    return action;
  }

}

global.Player = Player;
