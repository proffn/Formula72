import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../lib/navigation.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const exports = {};
vm.runInNewContext(compiled, { exports, URL });
const { mapNavigationItems, normalizeNavigationLabel, normalizeNavigationHref } = exports;
const plain = (value) => JSON.parse(JSON.stringify(value));

const items = [{ label: "Отзывы", href: "#coverage-map" }, { label: "О нас", href: "/about" }];
assert.deepEqual(plain(mapNavigationItems({ navigationItems: items })), [
  { label: "Отзывы", href: "/#coverage-map" }, { label: "О нас", href: "/about" },
]);
assert.deepEqual(plain(mapNavigationItems({ navigationItems: [], navAboutLabel: "Legacy" })), []);
assert.deepEqual(plain(mapNavigationItems({ navigationItems: [{ label: "\u2800", href: "/about" }] })), []);
assert.deepEqual(plain(mapNavigationItems({ navigationItems: [{ label: "О нас", href: "\u2800" }] })), []);
assert.equal(normalizeNavigationLabel("\u2800\u200b\u00a0"), null);
assert.equal(normalizeNavigationLabel("  Français 日本語 О нас  "), "Français 日本語 О нас");
assert.equal(normalizeNavigationLabel("👩‍💻"), "👩‍💻");
for (const href of ["javascript:alert(1)", "data:text/html,test", "//evil.example", "/\\evil.example", "/\u200babout", "https://user:password@example.com"]) {
  assert.equal(normalizeNavigationHref(href), null, href);
}
for (const href of ["/about?source=menu", "/about#details", "https://example.com/?source=menu"]) {
  assert.equal(normalizeNavigationHref(href), href);
}
assert.equal(mapNavigationItems({ navAboutHref: "#hero" })[0].href, "/about");
assert.equal(mapNavigationItems({ navWholesaleLabel: "\u2800", navWholesaleHref: "\u2800" })[2].label, "Опт");
assert.equal(mapNavigationItems({ navigationItems: Array.from({ length: 11 }, () => items[1]) }).length, 11);
console.log("PASS: CMS order, intentional empty menu, Unicode blanks/text, safe links, legacy compatibility, unbounded item count");
