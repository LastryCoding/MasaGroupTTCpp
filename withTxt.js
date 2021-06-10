const formatInput = (input) => {
  // Spliting strings at spaces and getting numbers as Number type in a list of numbers
  let listOfNumbers = input.split(" ");
  for (let i = 0; i < listOfNumbers.length; i++) {
    listOfNumbers[i] = parseFloat(listOfNumbers[i]);
  }
  return listOfNumbers;
};
const getMaxSubArray = (listOfNumbers) => {
  let maxSum = 0;
  let bestMaxSum = 0;
  let maxSumNumbers = [];
  let bestMaxSumNumbers = [];
  for (let i = 0; i < listOfNumbers.length; i++) {
    const oneNumber = listOfNumbers[i];
    if (i === 0) {
      // Initialisation de nos variables avec le premier élément de la liste des numéros
      maxSum = oneNumber;
      bestMaxSum = oneNumber;
      maxSumNumbers.push(oneNumber);
      bestMaxSumNumbers.push(oneNumber);
    } else {
      let currentSum = maxSum + oneNumber;
      if (currentSum > oneNumber) {
        // Cette condition est généralement vrai SAUF si on a pris un grand nombre négatif au tour d'avant (i-1).
        maxSum = currentSum;
        maxSumNumbers.push(oneNumber);
      } else {
        // Ce bloc d'instructions sera lu apres avoir accepté un grand nombre négatif au tour d'avant et permmettra
        // de supprimer le cycle d'avant et commencer une nouvelle série de numéro
        maxSum = oneNumber;
        maxSumNumbers = [];
        maxSumNumbers.push(oneNumber);
      }
      if (bestMaxSum < maxSum) {
        // Ce bloc d'instructions n'est lu que quand nous avons une nouvelle série de numéro plus intéressante que la précédente
        bestMaxSum = maxSum;
        bestMaxSumNumbers = [];
        for (let i = 0; i < maxSumNumbers.length; i++) {
          bestMaxSumNumbers.push(maxSumNumbers[i]);
        }
      }
    }
  }
  return { bestMaxSum, bestMaxSumNumbers };
};

const readFile = (path) => {
  const fs = require("fs");

  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // Vérification que l'entrée n'est pas un fichier txt vide
    if (data.trim() === "") {
      console.log("Aucune liste de données n'a été trouvée");
    } else {
      const listOfNumbers = formatInput(data);
      const { bestMaxSum, bestMaxSumNumbers } = getMaxSubArray(listOfNumbers);
      console.log("total: " + bestMaxSum + " # subarray: " + bestMaxSumNumbers.join(" "));
      fs.writeFile("./output.txt", "total: " + bestMaxSum + " # subarray: " + bestMaxSumNumbers.join(" "), (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
};

const main = () => {
  readFile("./text.txt");
};

main();
