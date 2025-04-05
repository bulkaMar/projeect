/* global google */


function initMap() {
  const kiev = { lat: 50.4501, lng: 30.5234 };

  if (typeof google !== 'undefined' && google.maps) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: kiev,
    });

    const marker = new google.maps.Marker({
      position: kiev,
      map: map,
      title: "Center Kyiv",
    });

    marker.addListener('click', function () {
      alert('The marker is pressed!');
    });
  }
}

initMap();