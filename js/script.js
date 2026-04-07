// Global variables
let spaceData = [];
const spaceFacts = [
  "The Sun accounts for 99.86% of the mass in the solar system.",
  "One day on Venus is longer than one year on Venus.",
  "Jupiter has at least 79 moons.",
  "A year on Mercury is just 88 days long.",
  "Saturn's rings are made mostly of ice and rock.",
  "The Milky Way galaxy contains between 100-400 billion stars.",
  "Neutron stars can spin at a rate of 600 rotations per second.",
  "Black holes can bend light due to their strong gravity.",
  "The universe is approximately 13.8 billion years old.",
  "Light from the Sun takes about 8 minutes to reach Earth."
];

// DOM elements
const factBox = document.querySelector('.header__fact-box');
const factTextEl = document.querySelector('.header__fact-text');
const factStatusEl = document.querySelector('.header__fact-status');
const factProgressEl = document.querySelector('.header__fact-progress');
const dateInput = document.getElementById('dateInput');
const fetchBtn = document.getElementById('fetchBtn');
const loading = document.getElementById('loading');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal__content');
const closeModalBtn = document.getElementById('closeModal');
const modalMediaContainer = document.getElementById('modalMediaContainer');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  loadFact();

  // Set date input min and max
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = '1995-06-16';
  dateInput.max = today;
  dateInput.value = today;

  // Event listeners
  fetchBtn.addEventListener('click', handleFetch);
  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', closeModal);
  modalContent.addEventListener('click', (e) => e.stopPropagation());
});

// Helper function to get start date (8 days before end date)
function getStartDate(endDate) {
  const end = new Date(endDate);
  const start = new Date(end.getTime() - 8 * 24 * 60 * 60 * 1000);
  return start.toISOString().split('T')[0];
}

async function loadFact() {
  factTextEl.textContent = 'Loading a fresh space fact...';
  factStatusEl.style.display = 'none';
  factProgressEl.classList.add('header__fact-progress--active');

  try {
    // Try fetching from a random facts API
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    if (response.ok) {
      const factData = await response.json();
      factTextEl.textContent = factData.text || getFallbackFact();
    } else {
      factTextEl.textContent = getFallbackFact();
    }
  } catch (error) {
    console.error('Fact API failed:', error);
    factTextEl.textContent = getFallbackFact();
  } finally {
    factProgressEl.classList.remove('header__fact-progress--active');
  }
}

function getFallbackFact() {
  return spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
}

// Fetch space data
async function fetchSpaceData(startDate, endDate) {
  const apiKey = 'zB6OsdfQyEcw2ZW9c2J011TQ4ZRXZ216uMRNXvc3';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  factStatusEl.textContent = 'Please wait while the gallery loads...';
  factProgressEl.classList.add('header__fact-progress--active');

  try {
    const response = await fetch(url);
    const data = await response.json();
    spaceData = data;
    renderGallery(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    factStatusEl.textContent = 'Unable to load gallery. Try again later.';
    alert('Failed to fetch space data. Please try again.');
  } finally {
    factProgressEl.classList.remove('header__fact-progress--active');
    if (!factStatusEl.textContent.includes('Unable')) {
      factStatusEl.textContent = '';
    }
  }
}

function getMediaMarkup(item, className = 'card__image') {
  const isMp4 = item.url?.toLowerCase().endsWith('.mp4');
  if (item.media_type === 'video' && isMp4) {
    return `
      <video class="${className}" controls muted playsinline preload="metadata">
        <source src="${item.url}" type="video/mp4">
        Your browser does not support this video.
      </video>
    `;
  }

  if (item.media_type === 'video') {
    return `<iframe class="${className}" src="${item.url}" frameborder="0" allowfullscreen></iframe>`;
  }

  return `<img class="${className}" src="${item.url}" alt="${item.title}">`;
}

// Render gallery
function renderGallery(data) {
  gallery.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__media">
        ${getMediaMarkup(item)}
      </div>
      <div class="card__info">
        <h3 class="card__title">${item.title}</h3>
        <p class="card__date">${item.date}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(item));
    gallery.appendChild(card);
  });
}

// Open modal
function openModal(item) {
  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalExplanation.textContent = item.explanation;
  modalMediaContainer.innerHTML = getMediaMarkup(item, 'modal__media');
  modal.classList.add('modal--open');
}

// Close modal
function closeModal() {
  modal.classList.remove('modal--open');
  modalMediaContainer.innerHTML = '';
}

// Handle fetch button click
function handleFetch() {
  const selectedDate = dateInput.value;
  if (!selectedDate) {
    alert('Please select a date.');
    return;
  }
  loadFact();
  const startDate = getStartDate(selectedDate);
  fetchSpaceData(startDate, selectedDate);
}