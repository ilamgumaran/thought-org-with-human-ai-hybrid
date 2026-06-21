// PERCEPTUAL renderer — the organic-facing projection of a field. Stance is not
// labelled; it is FELT. Sure things are solid, unsure things are hazy and
// translucent, what matters glows, tone is temperature. An organic mind reads
// the field the way it reads a face or a room: pre-attentively, all at once.

const H = (c) => "#" + c;

// point on node rect boundary in the direction of (tx,ty)
function edgePoint(n, tx, ty) {
  const dx = tx - n.cx, dy = ty - n.cy;
  if (dx === 0 && dy === 0) return { x: n.cx, y: n.cy };
  const sx = (n.w / 2) / Math.abs(dx || 1e-6);
  const sy = (n.h / 2) / Math.abs(dy || 1e-6);
  const s = Math.min(sx, sy);
  return { x: n.cx + dx * s, y: n.cy + dy * s };
}

function arrowHead(at, fromx, fromy, color) {
  const dx = at.x - fromx, dy = at.y - fromy, len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len, px = -uy, py = ux;
  const b = { x: at.x - ux * 10, y: at.y - uy * 10 };
  return `<polygon points="${at.x.toFixed(1)},${at.y.toFixed(1)} ${(b.x + px * 5).toFixed(1)},${(b.y + py * 5).toFixed(1)} ${(b.x - px * 5).toFixed(1)},${(b.y - py * 5).toFixed(1)}" fill="${H(color)}"/>`;
}

export function renderPerceptual(field) {
  const { canvas, meta } = field;
  const defs = [`<filter id="haze" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7.5"/></filter>`];
  const body = [];

  // header
  if (meta.title) {
    body.push(`<text x="${canvas.width / 2}" y="${field.canvas.padding + 16}" text-anchor="middle" font-size="13" letter-spacing="3" font-weight="700" fill="#8a90a0">KOINE · A FIELD</text>`);
    body.push(`<text x="${canvas.width / 2}" y="${field.canvas.padding + 50}" text-anchor="middle" font-size="27" font-weight="700" fill="#1d2533">${meta.title}</text>`);
    if (meta.subtitle) body.push(`<text x="${canvas.width / 2}" y="${field.canvas.padding + 74}" text-anchor="middle" font-size="14" fill="#6b7484">${meta.subtitle}</text>`);
  }

  // edges (under nodes)
  for (const e of field.edges) {
    const p1 = edgePoint(e.a, e.b.cx, e.b.cy);
    const p2 = edgePoint(e.b, e.a.cx, e.a.cy);
    const dash = e.rel.dash ? ` stroke-dasharray="${e.rel.dash.join(" ")}"` : "";
    const op = (0.35 + 0.55 * e.confidence).toFixed(2);
    body.push(`<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${H(e.rel.stroke)}" stroke-width="${e.rel.tremor ? 2.4 : 2}" stroke-opacity="${op}" stroke-linecap="round"${dash}/>`);
    if (e.rel.arrow) body.push(arrowHead(p2, p1.x, p1.y, e.rel.stroke));
  }

  // nodes
  field.nodes.forEach((n, i) => {
    const gid = `glow${i}`;
    defs.push(`<filter id="${gid}" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="0" stdDeviation="${n.pres.glowRadius}" flood-color="${H(n.color.stroke)}" flood-opacity="${n.pres.glowOpacity}"/></filter>`);
    const rx = 16;
    // uncertainty haze: a blurred grey ghost behind the unsure
    if (n.solid.hazy) {
      body.push(`<rect x="${n.x - 6}" y="${n.y - 6}" width="${n.w + 12}" height="${n.h + 12}" rx="${rx + 4}" fill="#9aa1ad" opacity="${(0.55 * n.solid.hazeAmount).toFixed(2)}" filter="url(#haze)"/>`);
    }
    const dash = n.solid.dashed ? ` stroke-dasharray="6 5"` : "";
    body.push(`<g opacity="${n.pres.recede}">`);
    body.push(`  <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="${rx}" fill="${H(n.color.fill)}" fill-opacity="${n.solid.fillOpacity}" stroke="${H(n.color.stroke)}" stroke-width="2" stroke-opacity="${n.solid.strokeOpacity}"${dash} filter="url(#${gid})"/>`);
    // maker's mark (provenance)
    body.push(`  <circle cx="${n.x + 14}" cy="${n.y + 14}" r="4" fill="${H(n.mark.mark)}"/>`);
    // label (crisp even when the node is unsure — you can read the doubt and the words)
    const weight = n.pres.bold ? "700" : "500";
    body.push(`  ${wrapText(n)}`.replace("WEIGHT", weight));
    body.push(`</g>`);
  });

  // legend
  body.push(legend(field.canvas));

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}" font-family="DejaVu Sans">`,
    `<defs>${defs.join("")}</defs>`,
    `<rect width="${canvas.width}" height="${canvas.height}" fill="#ffffff"/>`,
    body.join("\n  "),
    `</svg>`,
  ].join("\n") + "\n";
}

// simple word-wrap to ~ node width
function wrapText(n) {
  const charW = 8.2, maxChars = Math.floor((n.w - 28) / charW);
  const words = n.label.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars && line) { lines.push(line); line = w; }
    else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  const lh = 18, startY = n.cy - ((lines.length - 1) * lh) / 2 + 5;
  return lines.map((l, k) =>
    `<text x="${n.cx}" y="${(startY + k * lh).toFixed(1)}" text-anchor="middle" font-size="14.5" font-weight="WEIGHT" fill="${H(n.color.text)}">${escapeXml(l)}</text>`
  ).join("\n  ");
}

const escapeXml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function legend(canvas) {
  const y = canvas.height - 60, x = 40;
  const items = [
    ["solid = sure", "#2a3038", false, 1],
    ["hazy = unsure", "#9aa1ad", true, 0.5],
    ["glow = matters", "#3a6ea5", false, 1],
    ["teal = calm", "#27946a", false, 1],
    ["red = tension", "#cf5a4a", false, 1],
  ];
  let cx = x + 120;
  const chips = items.map(([t, c, dashed, op]) => {
    const s = `<g><rect x="${cx}" y="${y - 14}" width="22" height="22" rx="6" fill="${c}" fill-opacity="${op}" stroke="${c}" stroke-opacity="0.7"${dashed ? ' stroke-dasharray="4 3"' : ""}/><text x="${cx + 30}" y="${y + 2}" font-size="12.5" fill="#5b6472">${t}</text></g>`;
    cx += 150;
    return s;
  }).join("");
  return `<line x1="${x}" y1="${y - 34}" x2="${canvas.width - 40}" y2="${y - 34}" stroke="#e4e8ee"/>` +
    `<text x="${x}" y="${y + 2}" font-size="12.5" letter-spacing="1" font-weight="700" fill="#8a90a0">HOW TO READ</text>` + chips;
}
