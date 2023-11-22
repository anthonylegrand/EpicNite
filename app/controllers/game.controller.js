const { Player } = mongoose.models;

module.exports.sendData = async (req, res) => {
  try {
    const { pseudo, epicID, GameData } = req.body;

    let player = await Player.findOne({ epicID });

    player = player
      ? updatePlayer(player, GameData)
      : createPlayer(epicID, pseudo, GameData);

    res.status(200).json(player);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

async function updatePlayer(player, GameData) {
  console.log("---", GameData);
  player.gamesHistory.push(GameData);

  const existingGameData = player.gamesData.find(
    (data) => data.GameType === GameData.GameType
  );

  if (existingGameData)
    existingGameData.data = addJsonData(existingGameData.data, GameData.data);
  else
    player.gamesData.push({
      GameType: GameData.GameType,
      data: GameData.data,
    });

  await player.save();
  return player;
}

async function createPlayer(epicID, pseudo, GameData) {
  console.log("--->", GameData);
  const newPlayer = new Player({
    epicID,
    pseudo,
    gamesHistory: [GameData],
    gamesData: [
      {
        GameType: GameData.GameType,
        data: GameData.data,
      },
    ],
  });

  // Sauvegardez le nouveau joueur
  await newPlayer.save();

  return newPlayer;
}

function addJsonData(json1, json2) {
  // Créez une copie profonde de l'objet JSON1 pour éviter de le modifier directement
  const result = JSON.parse(JSON.stringify(json1));

  // Parcourez toutes les clés de l'objet JSON2
  Object.keys(json2).forEach((key) => {
    // Si la clé existe déjà dans l'objet résultant et que les valeurs sont des nombres, ajoutez-les
    if (
      result.hasOwnProperty(key) &&
      typeof result[key] === "number" &&
      typeof json2[key] === "number"
    ) {
      result[key] += json2[key];
    } else {
      // Sinon, ajoutez simplement la clé et la valeur de l'objet JSON2 à l'objet résultant
      result[key] = json2[key];
    }
  });

  return result;
}
