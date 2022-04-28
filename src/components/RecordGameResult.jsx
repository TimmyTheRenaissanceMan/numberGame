export default function RecordGameResult(won, line) {
  //Find or create game record
  const results = localStorage.numberGame
    ? JSON.parse(localStorage.numberGame)
    : [];
  // Update game record
  results.push({ won: won, line: line });
  // Save game record
  localStorage.setItem("numberGame", JSON.stringify(results));
}
