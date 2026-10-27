(() => {
  const mapElement = document.getElementById("isan-map");

  // ป้องกันสคริปต์ทำงานหากไม่มี Section แผนที่
  if (!mapElement || typeof L === "undefined") return;

  // พิกัดบางจุด เช่น ร้านอาหาร โรงแรม และแหล่งเกลือ
  // เป็นตำแหน่งประมาณ ต้องแก้เป็นพิกัดจริงก่อนใช้งานนำทาง
  const locations = [
    // DAY 1 — นครราชสีมา
    {
      day: 1,
      time: "06:00",
      name: "มหาวิทยาลัยศิลปากร วังท่าพระ",
      type: "start",
      lat: 13.7516,
      lng: 100.4914,
      description: "จุดเริ่มต้นการเดินทางจากกรุงเทพฯ",
    },
    {
      day: 1,
      time: "11:00",
      name: "วัดพระนอนธรรมจักรเสมาราม",
      type: "attraction",
      lat: 15.002,
      lng: 102.168,
      description: "โบราณสถานสำคัญในเมืองเสมา อำเภอสูงเนิน",
    },
    {
      day: 1,
      time: "12:00",
      name: "จุดรับประทานอาหารกลางวัน",
      type: "meal",
      lat: 14.98,
      lng: 102.1,
      description: "ตำแหน่งตัวอย่าง — เปลี่ยนเป็นร้านอาหารจริง",
    },
    {
      day: 1,
      time: "14:00",
      name: "พิพิธภัณฑ์ไม้กลายเป็นหิน โคราชจีโอพาร์ค",
      type: "attraction",
      lat: 14.962,
      lng: 102.175,
      description: "พิพิธภัณฑ์ไม้กลายเป็นหิน จังหวัดนครราชสีมา",
    },
    {
      day: 1,
      time: "15:30",
      name: "ชุมชนเครื่องปั้นดินเผาด่านเกวียน",
      type: "attraction",
      lat: 14.806,
      lng: 102.205,
      description: "แหล่งเครื่องปั้นดินเผาที่มีชื่อเสียงของโคราช",
    },
    {
      day: 1,
      time: "15:30",
      name: "แหล่งผลิตเกลือบ้านพันดุง",
      type: "alternative",
      lat: 15.12,
      lng: 102.12,
      description: "ตัวเลือกแทนด่านเกวียน — ต้องยืนยันพิกัด",
    },
    {
      day: 1,
      time: "17:00",
      name: "อนุสาวรีย์ท้าวสุรนารี",
      type: "attraction",
      lat: 14.975,
      lng: 102.097,
      description: "แลนด์มาร์กสำคัญใจกลางเมืองโคราช",
    },
    {
      day: 1,
      time: "19:00",
      name: "โรงแรมที่พัก — คืนที่ 1",
      type: "hotel",
      lat: 14.98,
      lng: 102.1,
      description: "ตำแหน่งตัวอย่าง — เปลี่ยนเป็นโรงแรมจริง",
    },

    // DAY 2 — บุรีรัมย์
    {
      day: 2,
      time: "08:00",
      name: "ออกเดินทางสู่จังหวัดบุรีรัมย์",
      type: "transit",
      lat: 14.98,
      lng: 102.1,
      description: "จุดเริ่มเดินทางจากโรงแรม",
    },
    {
      day: 2,
      time: "10:00",
      name: "อุทยานประวัติศาสตร์พนมรุ้ง",
      type: "attraction",
      lat: 14.5325,
      lng: 102.9417,
      description: "ปราสาทขอมโบราณบนภูเขาไฟที่ดับสนิท",
    },
    {
      day: 2,
      time: "12:00",
      name: "จุดรับประทานอาหารกลางวัน — บุรีรัมย์",
      type: "meal",
      lat: 14.53,
      lng: 102.94,
      description: "ตำแหน่งตัวอย่าง — เปลี่ยนเป็นร้านอาหารจริง",
    },
    {
      day: 2,
      time: "13:30",
      name: "ปราสาทเมืองต่ำ",
      type: "attraction",
      lat: 14.4936,
      lng: 102.9825,
      description: "ศาสนสถานขอมโบราณใกล้ปราสาทพนมรุ้ง",
    },
    {
      day: 2,
      time: "13:30",
      name: "บารายเมืองต่ำ",
      type: "attraction",
      lat: 14.491,
      lng: 102.98,
      description: "แหล่งน้ำโบราณของชุมชนเมืองต่ำ",
    },
    {
      day: 2,
      time: "13:30",
      name: "กุฏิฤาษี บ้านโคกเมือง",
      type: "attraction",
      lat: 14.48,
      lng: 102.99,
      description: "จุดตัวอย่าง — ยืนยันพิกัดกับผู้ประสานงานพื้นที่",
    },
    {
      day: 2,
      time: "16:00",
      name: "ออกเดินทางสู่เมืองพิมาย",
      type: "transit",
      lat: 14.4936,
      lng: 102.9825,
      description: "เดินทางกลับจังหวัดนครราชสีมา",
    },
    {
      day: 2,
      time: "19:00",
      name: "โรงแรมที่พัก — คืนที่ 2",
      type: "hotel",
      lat: 15.22,
      lng: 102.49,
      description: "ตำแหน่งตัวอย่าง — เปลี่ยนเป็นโรงแรมจริง",
    },

    // DAY 3 — พิมายและเดินทางกลับกรุงเทพฯ
    {
      day: 3,
      time: "08:00",
      name: "ออกเดินทางจากโรงแรม",
      type: "transit",
      lat: 15.22,
      lng: 102.49,
      description: "เดินทางไปปราสาทพิมาย",
    },
    {
      day: 3,
      time: "09:00",
      name: "อุทยานประวัติศาสตร์พิมาย",
      type: "attraction",
      lat: 15.2231,
      lng: 102.4947,
      description: "โบราณสถานขอมสำคัญของจังหวัดนครราชสีมา",
    },
    {
      day: 3,
      time: "12:00",
      name: "จุดรับประทานอาหารกลางวัน — พิมาย",
      type: "meal",
      lat: 15.22,
      lng: 102.49,
      description: "ตำแหน่งตัวอย่าง — เปลี่ยนเป็นร้านอาหารจริง",
    },
    {
      day: 3,
      time: "14:30",
      name: "ภาพเขียนสีเขาจันทร์งาม",
      type: "attraction",
      lat: 14.86,
      lng: 101.88,
      description: "แหล่งภาพเขียนสีโบราณในพื้นที่สีคิ้ว — ตรวจพิกัดอีกครั้ง",
    },
    {
      day: 3,
      time: "16:00",
      name: "ออกเดินทางกลับกรุงเทพฯ",
      type: "transit",
      lat: 14.86,
      lng: 101.88,
      description: "เดินทางกลับมหาวิทยาลัยศิลปากร วังท่าพระ",
    },
    {
      day: 3,
      time: "19:00",
      name: "มหาวิทยาลัยศิลปากร วังท่าพระ",
      type: "finish",
      lat: 13.7516,
      lng: 100.4914,
      description: "จุดสิ้นสุดการเดินทาง",
    },

    // โรงพยาบาล — ใช้เป็นจุดอ้างอิงฉุกเฉิน
    {
      day: "hospital",
      time: "ฉุกเฉิน",
      name: "โรงพยาบาลมหาราชนครราชสีมา",
      type: "hospital",
      lat: 14.99,
      lng: 102.1,
      description:
        "โรงพยาบาลหลักในจังหวัดนครราชสีมา — ตรวจสอบพิกัดและเส้นทางก่อนใช้งาน",
    },
    {
      day: "hospital",
      time: "ฉุกเฉิน",
      name: "โรงพยาบาลบุรีรัมย์",
      type: "hospital",
      lat: 14.995,
      lng: 103.103,
      description: "โรงพยาบาลในจังหวัดบุรีรัมย์ — ตรวจสอบพิกัดก่อนใช้งาน",
    },
    {
      day: "hospital",
      time: "ฉุกเฉิน",
      name: "โรงพยาบาลพิมาย",
      type: "hospital",
      lat: 15.22,
      lng: 102.5,
      description: "โรงพยาบาลในอำเภอพิมาย — ตรวจสอบพิกัดก่อนใช้งาน",
    },
  ];

  const styles = {
    start: { color: "#16a34a", icon: "S", label: "จุดเริ่มต้น" },
    finish: { color: "#dc2626", icon: "F", label: "จุดสิ้นสุด" },
    attraction: {
      color: "#3478db",
      icon: "•",
      label: "สถานที่ท่องเที่ยว",
    },
    alternative: {
      color: "#9333ea",
      icon: "↔",
      label: "สถานที่ทางเลือก",
    },
    meal: { color: "#d97706", icon: "฿", label: "อาหาร" },
    hotel: { color: "#0891b2", icon: "H", label: "ที่พัก" },
    transit: { color: "#64748b", icon: "→", label: "จุดเดินทาง" },
    hospital: { color: "#e11d48", icon: "+", label: "โรงพยาบาล" },
  };

  const map = L.map("isan-map", {
    scrollWheelZoom: false,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const markers = [];
  const markerByLocation = new Map();
  const listElement = document.getElementById("isan-map-locations");
  const titleElement = document.getElementById("isan-map-list-title");
  const countElement = document.getElementById("isan-map-list-count");
  const dayButtons = document.querySelectorAll(".isan-day-btn");

  let selectedDay = "all";
  let selectedLocation = null;

  function escapeHTML(value) {
    return String(value ?? "").replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  }

  function googleMapsUrl(location) {
    return (
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(`${location.lat},${location.lng}`)
    );
  }

  function createMarker(location, index) {
    const style = styles[location.type] || styles.attraction;

    const icon = L.divIcon({
      className: "",
      html: `<div class="isan-pin" style="background:${style.color}">
        <span>${style.icon === "•" ? index + 1 : style.icon}</span>
      </div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 32],
      popupAnchor: [0, -30],
    });

    const marker = L.marker([location.lat, location.lng], { icon }).bindPopup(`
        <div class="isan-map-popup">
          <strong>${escapeHTML(location.time)} · ${escapeHTML(location.name)}</strong>
          <p>${escapeHTML(location.description)}</p>
          <a href="${googleMapsUrl(location)}"
             target="_blank" rel="noopener noreferrer">
            เปิดใน Google Maps ↗
          </a>
        </div>
      `);

    marker.on("click", () => {
      selectedLocation = location;
      renderList();
    });

    marker.addTo(map);
    markers.push({ location, marker });
    markerByLocation.set(location, marker);
  }

  locations.forEach(createMarker);

  function isVisible(location) {
    if (selectedDay === "all") return true;
    if (selectedDay === "hospital") return location.type === "hospital";
    return String(location.day) === selectedDay;
  }

  function focusLocation(location) {
    const marker = markerByLocation.get(location);
    if (!marker) return;

    map.flyTo([location.lat, location.lng], 13, { duration: 0.7 });
    marker.openPopup();
    selectedLocation = location;
    renderList();
  }

  function renderList() {
    const visibleLocations = locations.filter(isVisible);

    titleElement.textContent =
      selectedDay === "all"
        ? "สถานที่ทั้งหมด"
        : selectedDay === "hospital"
          ? "โรงพยาบาล"
          : `สถานที่ DAY ${selectedDay}`;

    countElement.textContent = `${visibleLocations.length} จุด`;

    listElement.innerHTML = visibleLocations
      .map((location) => {
        const style = styles[location.type] || styles.attraction;
        const isSelected = selectedLocation === location;

        return `
        <button type="button"
          class="isan-map-location ${isSelected ? "selected" : ""}"
          data-location-index="${locations.indexOf(location)}">
          <span class="isan-map-location-marker"
            style="background:${style.color}">${style.icon}</span>
          <span class="isan-map-location-content">
            <span class="isan-map-location-top">
              <span class="isan-map-location-time">${escapeHTML(location.time)}</span>
              <span class="isan-map-location-type">${style.label}</span>
            </span>
            <span class="isan-map-location-name">${escapeHTML(location.name)}</span>
            <span class="isan-map-location-desc">${escapeHTML(location.description)}</span>
            <span class="isan-map-location-link">ดูบนแผนที่ ↗</span>
          </span>
        </button>
      `;
      })
      .join("");

    listElement.querySelectorAll("[data-location-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const location = locations[Number(button.dataset.locationIndex)];
        focusLocation(location);
      });
    });
  }

  function applyFilter(day) {
    selectedDay = day;
    selectedLocation = null;

    dayButtons.forEach((button) => {
      const active = button.dataset.day === day;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    markers.forEach(({ location, marker }) => {
      if (isVisible(location)) {
        if (!map.hasLayer(marker)) marker.addTo(map);
      } else {
        if (map.hasLayer(marker)) map.removeLayer(marker);
      }
    });

    renderList();

    const visible = markers.filter(({ location }) => isVisible(location));

    if (visible.length) {
      const bounds = L.latLngBounds(
        visible.map(({ location }) => [location.lat, location.lng]),
      );
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 12 });
    }
  }

  dayButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.day));
  });

  document.getElementById("isan-map-reset").addEventListener("click", () => {
    applyFilter("all");
  });

  // เริ่มต้นด้วยภาพรวมทุกวัน
  applyFilter("all");

  // Leaflet ต้องคำนวณขนาดใหม่เมื่อ Section ถูกแสดง
  setTimeout(() => map.invalidateSize(), 250);

  // เผื่อเว็บมีปุ่มเปลี่ยนธีม ให้แผนที่ปรับขนาดหลังเปลี่ยนธีม
  const section = document.getElementById("isan-map-section");
  if (section) {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(section);
  }
})();
