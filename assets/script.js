document.addEventListener("DOMContentLoaded", () => {
    // ===== Year in footer (all pages) =====
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  
    // ===== Exact rate calculator for Services page =====
    const estimateForm = document.getElementById("estimate-form");
  
    if (estimateForm) {
      // Hours tiers correspond to the rows in your table
      const HOUR_TIERS = [1, 2, 3, 4, 6, 24];
      const TIER_LABELS = [
        "1 hour",
        "up to 2 hours",
        "up to 3 hours",
        "up to 4 hours",
        "5–6 hours",
        "All-day (9am–closing)"
      ];
  
      // Prices taken from the green in-store board
      const PRICE_TABLE = {
        kid:      [ 8.95, 11.95, 14.95, 17.95, 20.95, 29.95],
        single:   [10.95, 16.95, 22.95, 26.95, 32.95, 43.95],
        tandem:   [19.95, 29.95, 34.95, 38.95, 45.95, 54.95],
        ebike:    [21.95, 39.95, 54.95, 64.95, 79.95, 89.95],
        road:     [19.99, 29.99, 39.99, 49.99, 59.99, 69.99],
        escooter: [22.95, 39.95, 54.99, 64.99, 74.99, 79.99]
      };
  
      function getRate(typeKey, hours) {
        // Find which tier the requested hours fall into
        let index = HOUR_TIERS.length - 1; // default to all-day
        for (let i = 0; i < HOUR_TIERS.length; i++) {
          if (hours <= HOUR_TIERS[i]) {
            index = i;
            break;
          }
        }
        return { 
          price: PRICE_TABLE[typeKey][index],
          tierLabel: TIER_LABELS[index]
        };
      }
  
      estimateForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const typeSelect = document.getElementById("estimate-type");
        const hoursInput = document.getElementById("estimate-hours");
        const resultPara = document.getElementById("estimate-result");
  
        const typeKey = typeSelect.value;
        const hours = Number(hoursInput.value);
  
        if (!PRICE_TABLE[typeKey]) {
          resultPara.textContent = "Please choose a rental type.";
          resultPara.style.color = "#b91c1c";
          return;
        }
        if (!hours || hours <= 0) {
          resultPara.textContent = "Please enter a valid number of hours (at least 1).";
          resultPara.style.color = "#b91c1c";
          return;
        }
  
        const { price, tierLabel } = getRate(typeKey, hours);
        const typeName = typeSelect.options[typeSelect.selectedIndex].text;
  
        resultPara.textContent =
          `Estimated rate for ${typeName} for ${hours} hour(s): ` +
          `$${price.toFixed(2)} (uses ${tierLabel} rate).`;
        resultPara.style.color = "#15803d";
      });
    }
  });

function submitForm(e) {
    e.preventDefault();
    document.getElementById('contact-form').innerHTML = '<p>Thank you!</p>';
}
  