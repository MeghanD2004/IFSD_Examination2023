  const prompt = require("prompt-sync")();

  class Politician {
    constructor(name, vote, money) {
      this.name = name;
      this.vote = vote;
      this.money = money;
    }
  }

  class Party {
    constructor() {
      this.politicians = [];
    }

    addPoliticians() {
      let numPoliticians = prompt("Enter the number of politicians: ");
    
      for (let i = 0; i < numPoliticians; i++) {
        let name = prompt("Enter the name of politician: ");
        let vote = prompt("Enter the number of votes for politician: ");
        let money = prompt("Enter the amount of money for politician: ");
        
        let politician = new Politician(name, parseInt(vote), parseInt(money));
        
        this.politicians.push(politician);
      }
    }

    maxVote() {
      let maxVote = 0;
      let maxVoteName = "";
      for (let i = 0; i < this.politicians.length; i++) {
        if (this.politicians[i].vote > maxVote) {
          maxVote = this.politicians[i].vote;
          maxVoteName = this.politicians[i].name;
        }
      }
      return [maxVote, maxVoteName];
    }

    maxMoney() {
      let maxMoney = 0;
      let maxMoneyName = "";
      for (let i = 0; i < this.politicians.length; i++) {
        if (this.politicians[i].money > maxMoney) {
          maxMoney = this.politicians[i].money;
          maxMoneyName = this.politicians[i].name;
        }
      }
      return [maxMoney, maxMoneyName];
    }

    displayResults() {
      let [maxVote, maxVoteName] = this.maxVote();
      console.log("Max Vote: " + maxVote + " by " + maxVoteName);
      
      let [maxMoney, maxMoneyName] = this.maxMoney();
      console.log("Max Money: " + maxMoney + " by " + maxMoneyName);
    }
  }

  function main() { 
    let party = new Party();
    
    party.addPoliticians();
    
    party.displayResults();
  }

  main();