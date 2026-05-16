(() => {
        const STYLE = `
                #proxy-editor {
                            position: fixed;
                                        top: 10px;
                                                    right: 10px;
                                                                width: 420px;
                                                                            height: 500px;
                                                                                        background: #111;
                                                                                                    color: #fff;
                                                                                                                z-index: 2147483647;
                                                                                                                            font-family: monospace;
                                                                                                                                        border: 1px solid #555;
                                                                                                                                                    display: flex;
                                                                                                                                                                flex-direction: column;
                                                                                                                                                                            resize: both;
                                                                                                                                                                                        overflow: hidden;
                                                                                                                                                                                                }
                                                                                                                                                                                                
                                                                                                                                                                                                        #proxy-editor-header {
                                                                                                                                                                                                                    background: #222;
                                                                                                                                                                                                                                padding: 8px;
                                                                                                                                                                                                                                            cursor: move;
                                                                                                                                                                                                                                                        user-select: none;
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                        #proxy-editor textarea {
                                                                                                                                                                                                                                                                                    flex: 1;
                                                                                                                                                                                                                                                                                                width: 100%;
                                                                                                                                                                                                                                                                                                            background: #000;
                                                                                                                                                                                                                                                                                                                        color: #0f0;
                                                                                                                                                                                                                                                                                                                                    border: none;
                                                                                                                                                                                                                                                                                                                                                resize: none;
                                                                                                                                                                                                                                                                                                                                                            padding: 10px;
                                                                                                                                                                                                                                                                                                                                                                        outline: none;
                                                                                                                                                                                                                                                                                                                                                                                    font-size: 12px;
                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                    #proxy-editor-controls {
                                                                                                                                                                                                                                                                                                                                                                                                                display: flex;
                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                #proxy-editor button {
                                                                                                                                                                                                                                                                                                                                                                                                                                            flex: 1;
                                                                                                                                                                                                                                                                                                                                                                                                                                                        background: #333;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    color: white;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                border: none;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            padding: 8px;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        cursor: pointer;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        #proxy-editor button:hover {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    background: #555;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    .proxy-highlight {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                outline: 2px solid red !important;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            cursor: pointer !important;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        `;

     const style = document.createElement("style");
        style.textContent = STYLE;
        document.head.appendChild(style);

     let selected = null;
        let hover = null;

     const panel = document.createElement("div");
        panel.id = "proxy-editor";

     panel.innerHTML = `
             <div id="proxy-editor-header">HTML Inspector</div>
                     <textarea id="proxy-html"></textarea>
                             <div id="proxy-editor-controls">
                                         <button id="proxy-apply">Apply</button>
                                                     <button id="proxy-copy">Copy</button>
                                                                 <button id="proxy-close">Hide</button>
                                                                         </div>
                                                                             `;

     document.body.appendChild(panel);

     const textarea = document.getElementById("proxy-html");

     function removeHighlight() {
                 if (hover) hover.classList.remove("proxy-highlight");
                 hover = null;
     }

     function inspect(target) {
                 if (!target || target.closest("#proxy-editor")) return;
                 selected = target;
                 textarea.value = selected.outerHTML;
     }

     document.addEventListener("mouseover", e => {
                 if (e.target.closest("#proxy-editor")) return;

                                       removeHighlight();
                 hover = e.target;
                 hover.classList.add("proxy-highlight");
     }, true);

     document.addEventListener("mouseout", removeHighlight, true);

     document.addEventListener("click", e => {
                 if (e.target.closest("#proxy-editor")) return;

                                       e.preventDefault();
                 e.stopPropagation();

                                       inspect(e.target);
     }, true);

     document.getElementById("proxy-apply").onclick = () => {
                 if (!selected) return;

                 try {
                                 const wrapper = document.createElement("div");
                                 wrapper.innerHTML = textarea.value.trim();

                     const newNode = wrapper.firstElementChild;

                     if (newNode) {
                                         selected.replaceWith(newNode);
                                         selected = newNode;
                     }
                 } catch (err) {
                                 console.error(err);
                 }
     };

     document.getElementById("proxy-copy").onclick = async () => {
                 try {
                                 await navigator.clipboard.writeText(textarea.value);
                 } catch {}
     };

     document.getElementById("proxy-close").onclick = () => {
                 panel.style.display =
                                 panel.style.display === "none" ? "flex" : "none";
     };

     // drag
     (() => {
                 const header = document.getElementById("proxy-editor-header");

              let dragging = false;
                 let offsetX = 0;
                 let offsetY = 0;

              header.onmousedown = e => {
                              dragging = true;
                              offsetX = e.clientX - panel.offsetLeft;
                              offsetY = e.clientY - panel.offsetTop;
              };

              document.onmouseup = () => dragging = false;

              document.onmousemove = e => {
                              if (!dragging) return;

                              panel.style.left = `${e.clientX - offsetX}px`;
                              panel.style.top = `${e.clientY - offsetY}px`;
                              panel.style.right = "auto";
              };
     })();

     // hotkeys
     document.addEventListener("keydown", e => {
                 if (e.key === "Escape") {
                                 panel.style.display =
                                                     panel.style.display === "none" ? "flex" : "none";
                 }

                                       if (e.key === "ArrowUp" && selected?.parentElement) {
                                                       inspect(selected.parentElement);
                                       }
     });
})();
