const toppings = document.querySelectorAll(".topping");
const parfaitArea = document.getElementById("parfait-area");
const resetBtn = document.getElementById("resetBtn");
const undoBtn = document.getElementById("undoBtn");
const rotateBtn = document.getElementById("rotateBtn");
const rotateSlider = document.getElementById("rotateSlider");
const sizeSlider = document.getElementById("sizeSlider");
let selectedTopping = null;

// Click topping to add a clone
toppings.forEach(topping => {
  topping.addEventListener("click", () => {
    const clone = topping.cloneNode(true);
    clone.classList.add("draggable");

    clone.style.left = "120px";
    clone.style.top = "10px";
    clone.style.zIndex = Date.now();

    clone.dataset.rotation = "0";
    clone.dataset.scale = "1";

    makeDraggable(clone);

    clone.addEventListener("mousedown", () => {
      document
        .querySelectorAll(".selected")
        .forEach(el => el.classList.remove("selected"));

      clone.classList.add("selected");
      selectedTopping = clone;

      // 🔄 Sync slider to this topping
      rotateSlider.value = clone.dataset.rotation;
      sizeSlider.value = clone.dataset.scale;
    });

    parfaitArea.appendChild(clone);
  });
});

// Undo last topping
undoBtn.addEventListener("click", () => {
  const layers = parfaitArea.querySelectorAll(".draggable");
  if (layers.length > 0) {
    layers[layers.length - 1].remove();
  }
});

// Reset parfait
resetBtn.addEventListener("click", () => {
  const draggedToppings = parfaitArea.querySelectorAll(".draggable");
  draggedToppings.forEach(topping => topping.remove());
});

// Drag behavior + bring to front
function makeDraggable(element) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    // 🔄 Bring to front when clicked
    element.style.zIndex = Date.now();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const rect = parfaitArea.getBoundingClientRect();
    element.style.left = e.clientX - rect.left - offsetX + "px";
    element.style.top = e.clientY - rect.top - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}
function applyTransform(element) {
  const rotation = element.dataset.rotation || 0;
  const scale = element.dataset.scale || 1;

  element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
}
//rotate button
/*rotateBtn.addEventListener("click", () => {
  if (!selectedTopping) return;

  let currentRotation = parseInt(selectedTopping.dataset.rotation);
  currentRotation += 15;

  selectedTopping.dataset.rotation = currentRotation;
  selectedTopping.style.transform = `rotate(${currentRotation}deg)`;
});*/
//rotate slicder
rotateSlider.addEventListener("input", () => {
  if (!selectedTopping) return;

  selectedTopping.dataset.rotation = rotateSlider.value;
  applyTransform(selectedTopping);
});
sizeSlider.addEventListener("input", () => {
  if (!selectedTopping) return;

  const scale = sizeSlider.value;
  selectedTopping.dataset.scale = scale;

  applyTransform(selectedTopping);
});