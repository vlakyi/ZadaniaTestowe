// ZADANIE 1

// Utwórz klasę StringBuilder(baseString) i dodaj do niej następujące funkcje:

// Wartość domyślna dla parametru baseSgtring to pusty wiersz.
// Egzemplarz będzie miał właściwość value, w którą wpisuje się wartość parametru baseString.
// Metoda append(str) - dostaje parametr str (wiersza) i dodaje ją na koniec właściwości value.
// Metoda prepend(str) - dostaje parametr str (wiersza) i dodaje ją na początek właściwości value.
// Metoda pad(str) - dostaje parametr str (wiersza) i dodaje ją na początek i na koniec właściwości value.

// Ten kod powinien być wykonany bezbłędnie.

// const builder = new StringBuilder('.');

// builder
//   .append('^')
//   .prepend('^')
//   .pad('=');

// console.log(builder); // '=^.^='

class StringBuilder {
  constructor(baseString = '') {
    this.value = baseString;
  }

  append(str) {
    this.value = this.value.concat(str);
    return this;
  }

  prepend(str) {
    this.value = str.concat(this.value);
    return this;
  }

  pad(str) {
    this.append(str);
    this.prepend(str);
    return this; // Żeby na końcu się wyświetlała wartość value jak w zadaniu musimy w tym miejscu zwrócić
    // this.value, ponieważ nie ma mażliwości na sprawdzenie tego, która funkcja jest ostatnia w łańcuchu.
  }
}

const builder = new StringBuilder('.');
builder.append('^').prepend('^').pad('=');

console.log(builder);
