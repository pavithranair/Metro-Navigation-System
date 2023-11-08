const SMALL_ENOUGH = 0.005;
const GAMMA = 0.9;
const TRANS_PROB = 0.80;
const allStates = Array.from({ length: 21 }, (_, i) => i);
const rewards = setReward(0); 

const actions = {
  0: ["R", "M1"],
  1: ["L", "R"],
  2: ["L", "R"],
  3: ["L", "R"],
  4: ["L", "R"],
  5: ["L", "R"],
  6: ["L", "R"],
  7: ["L", "R", "M1"],
  8: ["L", "R"],
  9: ["L", "R"],
  10: ["L", "R"],
  11: ["L", "R"],
  12: ["L", "R"],
  13: ["L", "R"],
  14: ["L", "R"],
  15: ["L", "R", "S"],
  16: ["L", "R"],
  17: ["L", "R", "M2"],
  18: ["L", "R"],
  19: ["L", "R"],
  20: ["L", "M2"],
};

const policy = {};
for (const s in actions) {
  policy[s] = actions[s][Math.floor(Math.random() * actions[s].length)];
}

const V = {};
for (const s of allStates) {
  if (s in actions) {
    V[s] = 0;
  }
}

function setReward(end) {
  const rewards = Array.from({ length: 21 }, () => -0.3);
  rewards[4] = -5;
  rewards[10] = 3;
  rewards[15] = 3;
  rewards[end] = 5;
  return rewards;
}

function valueIterationPolicyIteration(rewards) {
    let iteration = 0;
    while (true) {
      let biggestChange = 0;
      for (const s of allStates) {
        if (s in policy) {
          const oldV = V[s];
          let newV = 0;
          for (const a of actions[s]) {
            const availableActions = actions[s].filter((action) => action !== a);
            const aRand = availableActions[Math.floor(Math.random() * availableActions.length)];
            const nxt = step(s, a);
            const nxtRand = step(s, aRand);
            const V_s_1_ALL_STATES_sum = availableActions.reduce((sum, a_) => sum + V[step(s, a_)], 0);
  
            let transitionProb = TRANS_PROB;
            const TRANSITION_PROB_WALK = 1;
            const TRANSITION_PROB_METRO = 0.66;
            if (a === "R" || a === "L" || a === "S") {
              transitionProb = TRANSITION_PROB_WALK;
            } else {
              transitionProb = TRANSITION_PROB_METRO;
            }
  
            const v =
              rewards[s] + GAMMA * (transitionProb * V[nxt] + (1 - transitionProb) * V[nxtRand]);
            if (v > newV) {
              newV = v;
              policy[s] = a;
            }
          }
  
          V[s] = newV;
          biggestChange = Math.max(biggestChange, Math.abs(oldV - V[s]));
        }
      }

      if (biggestChange < SMALL_ENOUGH) {
        break;
      }
  
      console.log(iteration);
      iteration += 1;
    }
  
    console.log(V, policy);
    return policy;
  }
  
  function findShortestPath(start, end) {
    var start = parseInt(document.getElementById("startStation").value);
    var end = parseInt(document.getElementById("endStation").value);
    console.log(start);
    console.log(end);
    const reward = setReward(end);
    const policy = valueIterationPolicyIteration(reward);
    if (start === end) {
      alert("Start and end stations are the same!");
      return [];
    }
  
    const path = [];
    let current_state = start;
  
    while (current_state !== end) {
      const best_action = policy[current_state];
      path.push(best_action);
      current_state = step(current_state, best_action);
    }
  
    const pathData = path.join("->");
    const pathUrl = `path.html?path=${pathData}&startStation=${start}&endStation=${end}`;
    window.location.href = pathUrl;
  }
  

function step(s, a) {
  if (a === "M1") {
    return s + 5;
  }
  if (a === "M2") {
    return s - 6;
  }
  if (a === "L") {
    return s - 1;
  }
  if (a === "R") {
    return s + 1;
  }
  if (a === "S") {
    return s;
  }
}

document.getElementById("findPathButton").addEventListener("click", findShortestPath);
