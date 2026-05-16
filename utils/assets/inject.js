window.addEventListener("DOMContentLoaded", () => {
            const panel = document.createElement("div");

                            panel.id = "proxy-editor";

                            panel.style.cssText = `
                                    position:fixed;
                                            top:10px;
                                                    right:10px;
                                                            width:400px;
                                                                    height:500px;
                                                                            background:#111;
                                                                                    color:#fff;
                                                                                            z-index:999999999;
                                                                                                    border:1px solid #555;
                                                                                                            display:flex;
                                                                                                                    flex-direction:column;
                                                                                                                            font-family:monospace;
                                                                                                                                `;

                            panel.innerHTML = `
                                    <div style="padding:8px;background:#222;">HTML Editor</div>
                                            <textarea id="proxy-html"
                                                    style="
                                                            flex:1;
                                                                    background:#000;
                                                                            color:#0f0;
                                                                                    width:100%;
                                                                                            resize:none;
                                                                                                    border:none;
                                                                                                            padding:10px;
                                                                                                                    "></textarea>
                                                                                                                    
                                                                                                                            <button id="proxy-apply">Apply</button>
                                                                                                                                `;

                            document.body.appendChild(panel);

                            let selected = null;

                            document.addEventListener("click", e => {
                                            if (e.target.closest("#proxy-editor")) return;

                                                              e.preventDefault();
                                            e.stopPropagation();

                                                              selected = e.target;

                                                              selected.style.outline = "2px solid red";

                                                              document.getElementById("proxy-html").value =
                                                                                  selected.outerHTML;
                            }, true);

                            document.getElementById("proxy-apply").onclick = () => {
                                            if (!selected) return;

                                            const div = document.createElement("div");
                                            div.innerHTML =
                                                                document.getElementById("proxy-html").value;

                                            const newEl = div.firstElementChild;

                                            if (newEl) {
                                                                selected.replaceWith(newEl);
                                                                selected = newEl;
                                            }
                            };
});
