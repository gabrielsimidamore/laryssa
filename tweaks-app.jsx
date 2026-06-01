// tweaks-app.jsx — drives the live variations for the Laryssa landing page.
// Applies tweak values to document attributes the CSS already keys off:
//   data-hero (editorial|immersive|atelier) on .hero
//   data-palette (vinho|nude|noir) on <html>
//   data-anim (on|off) on <html>

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "editorial",
  "palette": "vinho",
  "animations": true
}/*EDITMODE-END*/;

function LaryssaTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const hero = document.querySelector(".hero");
    if (hero) hero.setAttribute("data-hero", t.heroLayout);
  }, [t.heroLayout]);

  React.useEffect(() => {
    const root = document.documentElement;
    if (t.palette === "vinho") root.removeAttribute("data-palette");
    else root.setAttribute("data-palette", t.palette);
  }, [t.palette]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-anim", t.animations ? "on" : "off");
  }, [t.animations]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Capa (hero)" />
      <TweakRadio
        label="Layout"
        value={t.heroLayout}
        options={["editorial", "immersive", "atelier"]}
        onChange={(v) => setTweak("heroLayout", v)}
      />
      <TweakSection label="Detalhes de luxo" />
      <TweakRadio
        label="Paleta"
        value={t.palette}
        options={["vinho", "nude", "noir"]}
        onChange={(v) => setTweak("palette", v)}
      />
      <TweakSection label="Movimento" />
      <TweakToggle
        label="Animações"
        value={t.animations}
        onChange={(v) => setTweak("animations", v)}
      />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  const el = document.getElementById("tweaks-root");
  if (!el) return;
  ReactDOM.createRoot(el).render(<LaryssaTweaks />);
})();
