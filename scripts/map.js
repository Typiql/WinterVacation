export function initializeMap(data) {
  const selectedSpots = [];
  const map = L.map('map').setView([39.8283, -98.5795], 5);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  data.forEach((resort) => {
    const lat = (resort.latitude);
    const lon = (resort.longitude);

    const marker = L.marker([lat, lon]).addTo(map);

    const clickMeIcon = L.divIcon({
      className: 'click-me-icon',
      html: '<div class="click-me-text">Click me!</div>',
      iconSize: [100, 30],
      iconAnchor: [50, 15],
      popupAnchor: [0, -30]
    });

    L.marker([lat, lon], { icon: clickMeIcon }).addTo(map);

    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
      <b>${resort.resort}</b><br>${resort.city}, ${resort.state}<br>
      <div class="popup-button-container">
        <button class="select-button" style="background-color: #ddd; color: #000; border: none; padding: 5px; cursor: pointer;">
          Select
        </button>
      </div>
    `;

    const style = document.createElement('style');
    style.innerHTML = `
      .popup-button-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
      }
      .select-button {
        display: inline-block;
        padding: 8px 16px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
      }

      .click-me-text {
        font-size: 12px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 3px 6px;
        border-radius: 5px;
        text-align: center;
        opacity: 0.5;
      }

      .click-me-icon {
        position: absolute;
        top: -50px;
        left: -50%;
        transform: translateX(-50%);
      }
    `;
    document.head.appendChild(style);

    const button = popupContent.querySelector('.select-button');
    button.addEventListener('click', () => {
      const isSelected = selectedSpots.some(spot => spot.resort === resort.resort);

      if (isSelected) {
        const index = selectedSpots.findIndex(spot => spot.resort === resort.resort);
        selectedSpots.splice(index, 1);

        button.textContent = 'Select';
        button.style.backgroundColor = '#ddd';
        button.style.color = '#000';
      } else {
        selectedSpots.push(resort);

        button.textContent = 'Selected';
        button.style.backgroundColor = '#28a745';
        button.style.color = '#fff';
      }

      console.log('Selected Spots:', selectedSpots);

      if (selectedSpots.length > 1) {
        const waypoints = selectedSpots.map(spot => L.latLng(spot.latitude, spot.longitude));

        if (window.currentRoute) {
          window.currentRoute.setWaypoints(waypoints);
        } else {
          window.currentRoute = L.Routing.control({
            waypoints: waypoints,
            createMarker: () => null,
            routeWhileDragging: true,
          }).addTo(map);
        }
      }
    });

    marker.bindPopup(popupContent);
  });

  return map;
}
