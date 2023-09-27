const hasUniqueCharacters = require('./pruebaLogica.js');

describe('hasUniqueCharacters', () => {
  it('debería devolver true para una cadena con caracteres únicos', () => {
    expect(hasUniqueCharacters('String')).toBe(true);
  });

  it('debería devolver false para una cadena con caracteres duplicados', () => {
    expect(hasUniqueCharacters('Some String')).toBe(false);
  });

  it('debería devolver false para una cadena vacía', () => {
    expect(hasUniqueCharacters('')).toBe(false);
  });

  it('debería devolver true para una cadena con caracteres especiales', () => {
    expect(hasUniqueCharacters('@#$%^&')).toBe(true);
  });

  it('debería devolver false para una cadena con caracteres especiales duplicados', () => {
    expect(hasUniqueCharacters('!Hello, World!')).toBe(false);
  });
});
