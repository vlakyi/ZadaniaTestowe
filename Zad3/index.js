// Potrzebne, dla parcela
import 'regenerator-runtime/runtime';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// DOM elementy
const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

// referencje żeby zrobić cleanup observera
let lastObserver;
let target;

// configuracja pixabay
let keyWord = '';
let pageID = 1;

// opcje observera
const options = {
  threshold: 1
};

// Github Pages nie wspiera environmental variables :(
const API_KEY = '22179498-1d5aa5cb96baf3342e8fd7cca';

const getTarget = () => {
  return ul.children[ul.childElementCount - 4];
}

// Dodaje tablicę zdjęc, które dostajemy z API do ul
const addImagesToList = (images) => {
  images.forEach(({ largeImageURL, webformatURL, tags }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = largeImageURL;

    // Tworzenie obrazu
    const img = document.createElement('img');
    img.src = webformatURL;
    img.alt = tags;
    img.setAttribute('data-source', largeImageURL);

    // dodanie elementów do ul
    a.appendChild(img);
    li.appendChild(a);
    ul.appendChild(li);

    // Otwieranie lightBox'a na click
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const instance = basicLightbox.create(`
      <div class="modal">
          <img src=${largeImageURL}/>
      </div>
  `);
      instance.show();
    });

  });
};

// Pobiera zdjęcia, dodaje do ul i ustawia paginację na nastepną stronę
const fetchImagesAndAddToList = async () => {
  try {
    // Paginacja jest automatycznie ustawiona na 20 zdjęć na 1 zapytanie
    const keyWordQuery = keyWord ? `&q=${keyWord.split(' ').join('+')}` : '';
    const res = await fetch(`https://pixabay.com/api/?key=${API_KEY}&page=${pageID}${keyWordQuery}`);
    const { hits } = await res.json();
    
    addImagesToList(hits);
    pageID++;
  } catch (err) {
    console.error(err.message);
  }
};

// tworzenie obserwera dla Infinite scrolla + czyszczenie starego obserwera
const createObserver = (target) => {
  return new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRect.width > 0) {
        // Uproszczona składnia promisów ES6. Pobieramy i dodajemy zdjęcia do ul i ustawiamy observer do 3go elementu od tyłu (bardziej wygodne scrollowanie)
        fetchImagesAndAddToList().then(() => {
          observer.unobserve(target);
          target = getTarget();
          observer.observe(target);
          lastObserver = observer;
        });
      }
    });
  }, options);
};

// robienie zapytania po wciśnięciu Enter (input znajduje się wewnątrz form, zatem automatycznie wykonuje się submit)
form.onsubmit = (e) => {
  e.preventDefault();
  const inputValue = input.value;
  if (keyWord !== inputValue) {
    keyWord = inputValue;
    if (lastObserver) {
      lastObserver.unobserve(target);
    }
    ul.innerHTML = '';
    initInfiniteScroll();
  }
};

// inicjalizacja infinite scroll
const initInfiniteScroll = async () => {
  try {
    await fetchImagesAndAddToList();
    target = getTarget();
  
    const observer = createObserver(target);
    observer.observe(target);
  } catch(err) {
    console.error(err.message);
  }
};
