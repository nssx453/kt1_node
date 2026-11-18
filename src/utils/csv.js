function parseLine(line) {
  return line.split(',').map((v) => v.trim());
}

module.exports = { parseLine };