// 1.- Implementa una función que determine si una cadena de texto dada esta formada por caracteres
// únicos, considera mayúsculas, minúsculas y caracteres especiales

function hasUniqueCharacters(inputString) {

  if(inputString.length == 0) return false

    const uniqueChars = new Set();
    
    const characters = Array.from(inputString);
  
    for (const char of characters) {
      if (uniqueChars.has(char)) {
        return false;
      }
      uniqueChars.add(char);
    }
    return true;
  }
  
  module.exports = hasUniqueCharacters;