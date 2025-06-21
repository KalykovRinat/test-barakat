const reviewForm = document.querySelector('.review-form');
const reviewsContainer = document.getElementById('reviews-container');
const averageRatingEl = document.getElementById('average-rating-value');

const successAlert = document.createElement('div');
const errorAlert = document.createElement('div');

successAlert.textContent = 'Спасибо за отзыв!';
errorAlert.textContent = 'Ошибка при отправке отзыва. Попробуйте позже.';
successAlert.style.color = 'green';
errorAlert.style.color = 'red';
successAlert.style.marginTop = '10px';
errorAlert.style.marginTop = '10px';

reviewForm.after(successAlert, errorAlert);
successAlert.style.display = 'none';
errorAlert.style.display = 'none';

window.addEventListener('DOMContentLoaded', () => {
  renderReviews();
  updateAverageRating();
});

reviewForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = reviewForm.name.value.trim();
  const rating = parseInt(reviewForm.rating.value);
  const messageText = reviewForm.message.value.trim();

  if (!name || !rating || !messageText) {
    showReviewMessage(false);
    return;
  }

  const review = {
    name,
    rating,
    message: messageText,
    date: new Date().toLocaleString()
  };

  saveReviewLocally(review);
  renderReviews();
  updateAverageRating();
  showReviewMessage(true);
  reviewForm.reset();

  try {
    const TOKEN = '7497600082:AAGOmVf0X2omtOEsbeqaa5-cEHSpE75lZpc';
    const CHAT_ID = '-1002657322598';
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const tgMessage = `
<b>Новый отзыв:</b>
👤 Имя: ${name}
⭐ Оценка: ${rating}
💬 Отзыв: ${messageText}
  `;

    await fetch(URI_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: tgMessage,
        parse_mode: 'html'
      }),
    });
  } catch (error) {
    console.error('Ошибка Telegram:', error);
  }
});

function showReviewMessage(success) {
  successAlert.style.display = success ? 'block' : 'none';
  errorAlert.style.display = success ? 'none' : 'block';
}

function saveReviewLocally(review) {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

function renderReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviewsContainer.innerHTML = '';

  reviews.reverse().forEach(({ name, rating, message, date }) => {
    const li = document.createElement('li');
    li.style.marginBottom = '15px';
    li.innerHTML = `
      <strong>${name}</strong> <span style="color: #ffa500;">${'⭐'.repeat(rating)}</span><br>
      <em>${date}</em><br>
      ${message}
    `;
    reviewsContainer.appendChild(li);
  });
}

function updateAverageRating() {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  if (reviews.length === 0) {
    averageRatingEl.textContent = '–';
    return;
  }

  const avg = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);
  averageRatingEl.textContent = `${avg} из 5`;
}

function renderReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviewsContainer.innerHTML = '';
  
    reviews.reverse().forEach(({ name, rating, message, date }, index) => {
      const li = document.createElement('li');
      li.style.marginBottom = '15px';
      li.innerHTML = `
        <strong>${name}</strong> <span style="color: #ffa500;">${'⭐'.repeat(rating)}</span><br>
        <em>${date}</em><br>
        ${message}<br>
        <button class="delete-review" data-index="${reviews.length - 1 - index}" style="margin-top: 5px;">Удалить</button>
      `;
      reviewsContainer.appendChild(li);
    });
  
    document.querySelectorAll('.delete-review').forEach((button) => {
      button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        deleteReview(index);
      });
    });
  }
  function deleteReview(index) {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.splice(index, 1);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    renderReviews();
    updateAverageRating();
  }
  