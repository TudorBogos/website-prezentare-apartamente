// -------------------------------------
// script.js (client)
// -------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
  });
  
  async function loadReviews() {
    try {
      // Dacă serverul Node rulează pe alt host/port, modifică URL-ul
      const response = await fetch('http://localhost:4000/api/reviews');
      if (!response.ok) {
        throw new Error('Eroare la încărcarea review-urilor');
      }
  
      const reviews = await response.json();
      console.log('Reviews primite:', reviews);
      renderReviews(reviews);
    } catch (error) {
      console.error(error);
    }
  }
  
  function renderReviews(reviews) {
    const container = document.getElementById('reviews-container');
    container.innerHTML = ''; // curățăm orice conținut anterior
  
    // Parcurgem array-ul de review-uri
    reviews.forEach((review) => {
      // Cream un col de tip Bootstrap
      const col = document.createElement('div');
      col.classList.add('col-md-4', 'd-flex');
  
      // Creăm card-ul
      const card = document.createElement('div');
      card.classList.add('card', 'w-100');
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'p-3');
  
      // Header-ul cu imagine și nume
      const headerDiv = document.createElement('div');
      headerDiv.classList.add('d-flex', 'align-items-center', 'mb-2');
  
      const img = document.createElement('img');
      img.src = review.image || 'img/default-user.jpg';
      img.alt = review.name || 'Guest';
      img.classList.add('rounded-circle', 'me-2');
  
      const titleDiv = document.createElement('div');
  
      const h6 = document.createElement('h6');
      h6.classList.add('card-title', 'mb-0');
      h6.textContent = review.name || 'N/A';
  
      const smallApartment = document.createElement('small');
      smallApartment.classList.add('text-muted');
      smallApartment.style.fontSize = '0.8rem';
      smallApartment.textContent = review.apartment || '';
  
      titleDiv.appendChild(h6);
      titleDiv.appendChild(smallApartment);
  
      headerDiv.appendChild(img);
      headerDiv.appendChild(titleDiv);
  
      // Rândul cu stele (rating)
      const ratingDiv = document.createElement('div');
      ratingDiv.classList.add('mb-2');
      // Creează stele corespunzătoare rating-ului
      // Poți face ceva simplu: rotunjim rating-ul și punem x stele pline
      const starCount = Math.floor(review.rating || 0); // rotunjire în jos
      const halfStar = (review.rating % 1 !== 0); // dacă e 4.5 punem o stea "half"
      for (let i = 0; i < starCount; i++) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('bi', 'bi-star-fill', 'text-warning');
        ratingDiv.appendChild(starIcon);
      }
      if (halfStar) {
        const halfIcon = document.createElement('i');
        halfIcon.classList.add('bi', 'bi-star-half', 'text-warning');
        ratingDiv.appendChild(halfIcon);
      }
      // Dacă vrei să pui 5 stele "goale" până la capăt, le poți adăuga în plus
      // (în funcție de design).
  
      // Paragraful cu comentariu
      const commentP = document.createElement('p');
      commentP.classList.add('card-text', 'small', 'mb-1');
      commentP.textContent = review.comment || '';
  
      // Data
      const dateSmall = document.createElement('small');
      dateSmall.classList.add('text-muted');
      dateSmall.style.fontSize = '0.75rem';
      dateSmall.textContent = review.date || '';
  
      // Asamblăm toate elementele
      cardBody.appendChild(headerDiv);
      cardBody.appendChild(ratingDiv);
      cardBody.appendChild(commentP);
      cardBody.appendChild(dateSmall);
  
      card.appendChild(cardBody);
      col.appendChild(card);
  
      container.appendChild(col);
    });
  }
  