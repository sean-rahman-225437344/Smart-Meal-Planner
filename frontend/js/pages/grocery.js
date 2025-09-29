import { getLatestGrocery, saveWeeklyGrocery } from "../api/mealplan.api.js";

async function loadGrocery() {
  const rangeEl = document.getElementById("range");
  const body = document.getElementById("groceryBody");
  body.innerHTML = "";
  rangeEl.textContent = "Loading...";

  try {
    await saveWeeklyGrocery();
    const snap = await getLatestGrocery(); 
    renderTable(snap, rangeEl, body);
  } catch (err) {
    const msg = err?.response?.data?.message || "";
    if (err?.response?.status === 404) {
      rangeEl.textContent = "No saved grocery list found.";
      body.innerHTML = `
        <tr>
          <td colspan="4" class="p-4">
            No grocery snapshot exists yet.
            <button id="createGroceryBtn"
              class="ml-2 bg-primary text-white font-bold py-1 px-3 rounded hover:bg-primary/90">
              Reload
            </button>
          </td>
        </tr>
      `;
      document.getElementById("createGroceryBtn").addEventListener("click", async () => {
        try {
          await saveWeeklyGrocery();         
          const snap = await getLatestGrocery();
          renderTable(snap, rangeEl, body);
        } catch (e) {
          alert(e?.response?.data?.message || "Failed to create grocery list");
        }
      });
    } else {
      rangeEl.textContent = "Failed to load grocery list.";
      body.innerHTML = `<tr><td colspan="4" class="p-4 text-red-600">${msg || "Error"}</td></tr>`;
    }
  }
}

function renderTable(snap, rangeEl, body) {
  const start = snap.weekStart ? new Date(snap.weekStart).toLocaleDateString() : "—";
  const end = snap.weekEnd ? new Date(snap.weekEnd).toLocaleDateString() : "—";
  rangeEl.textContent = `Week: ${start} — ${end}`;

  if (!snap.items?.length) {
    body.innerHTML = `<tr><td colspan="4" class="p-4">No items found.</td></tr>`;
    return;
  }

  body.innerHTML = snap.items.map(it => `
    <tr>
      <td class="p-3">${it.name}</td>
      <td class="p-3">${it.unit || "-"}</td>
      <td class="p-3">${Number(it.quantity ?? 0)}</td>
      <td class="p-3">${(it.recipes || []).join(", ")}</td>
    </tr>
  `).join("");
}

loadGrocery();