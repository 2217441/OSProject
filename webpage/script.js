let zIndex = 1;

function createWindow(app) {
  const windowEl = document.createElement('div');
  windowEl.className = 'window';
  windowEl.style.zIndex = zIndex++;
  
  const windowContent = {
    notepad: `<div class="title-bar">
                <span>Notepad</span>
                <div class="window-controls">
                  <button class="minimize"></button>
                  <button class="maximize"></button>
                  <button class="close" onclick="this.closest('.window').remove()"></button>
                </div>
              </div>
              <textarea class="editor"></textarea>`,
    calculator: `<div class="title-bar">
                   <span>Calculator</span>
                   <div class="window-controls">
                     <button class="minimize"></button>
                     <button class="maximize"></button>
                     <button class="close" onclick="this.closest('.window').remove()"></button>
                   </div>
                 </div>
                 <div class="calculator">
                   <div class="display">0</div>
                   <div class="buttons">
                     <button onclick="handleCalc(this)">7</button>
                     <button onclick="handleCalc(this)">8</button>
                     <button onclick="handleCalc(this)">9</button>
                     <button onclick="handleCalc(this)">+</button>
                     <button onclick="handleCalc(this)">4</button>
                     <button onclick="handleCalc(this)">5</button>
                     <button onclick="handleCalc(this)">6</button>
                     <button onclick="handleCalc(this)">-</button>
                     <button onclick="handleCalc(this)">1</button>
                     <button onclick="handleCalc(this)">2</button>
                     <button onclick="handleCalc(this)">3</button>
                     <button onclick="handleCalc(this)">*</button>
                     <button onclick="handleCalc(this)">0</button>
                     <button onclick="handleCalc(this)">.</button>
                     <button onclick="handleCalc(this)">=</button>
                     <button onclick="handleCalc(this)">/</button>
                   </div>
                 </div>`
  }[app];

  windowEl.innerHTML = windowContent;
  document.body.querySelector('.desktop').appendChild(windowEl);

  // Make window appear on top when clicked
  windowEl.addEventListener('mousedown', () => {
    windowEl.style.zIndex = zIndex++;
  });

  // Drag functionality
  let isDragging = false;
  let startX, startY, initialX, initialY;
  
  const titleBar = windowEl.querySelector('.title-bar');
  titleBar.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);

  function startDrag(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = windowEl.offsetLeft;
    initialY = windowEl.offsetTop;
    windowEl.style.cursor = 'grabbing';
  }

  function drag(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    windowEl.style.left = `${initialX + dx}px`;
    windowEl.style.top = `${initialY + dy}px`;
  }

  function stopDrag() {
    isDragging = false;
    windowEl.style.cursor = 'default';
  }

  return windowEl;
}

let currentCalc = '';

function handleCalc(button) {
  const display = button.closest('.calculator').querySelector('.display');
  const value = button.textContent;
  
  if (value === '=') {
    try {
      currentCalc = eval(currentCalc).toString();
    } catch (e) {
      currentCalc = 'Error';
    }
  } else {
    currentCalc += value;
  }
  
  display.textContent = currentCalc || '0';
}

// Prevent accidental text selection while dragging
document.addEventListener('selectstart', (e) => {
  if (e.target.closest('.title-bar')) {
    e.preventDefault();
  }
});