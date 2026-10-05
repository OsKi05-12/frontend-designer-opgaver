# Refleksion – Figma til kode

**Gruppemedlemmer:** Simon og Oskar

## Intro

Vi kendte ikke Astro i starten og måtte se undervisningsvideoer og søge på Google. Vi blev især forvirrede over, hvordan sider, layouts og komponenter hang sammen.

Koden blev flere gange uoverskuelig, og vi måtte begynde delvist forfra. Vi forsøgte selv at løse problemerne og fik hjælp fra klassekammerater, Google og AI. Nogle opgaver tog længere tid end forventet, så vi måtte vælge enklere løsninger.

## Eksempel 1: Skriv navnet på et valgt benspænd

**Valgt benspænd: FAQ og progressive enhancement.**

### Hvor og hvorfor?

I `FAQ.astro` bruger vi `details` og `summary`. De gør det muligt at åbne og lukke et svar uden JavaScript.

### Relevant kode

```html
<details>
  <summary>Et spørgsmål</summary>
  <p>Et svar</p>
</details>
```

Brugeren trykker på spørgsmålet for at se svaret. I projektet kommer spørgsmål og svar fra API'et.

### Afprøvning og ændringer

- **Vi testede med AI-hjælp:** Codex brugte Enter til at åbne og lukke et spørgsmål.
- **Vi observerede:** Svaret kunne åbnes og lukkes.
- **Vi ændrede eller mangler:** Vi skal selv kontrollere animationen og teste i flere browsere.

CSS-animationen er en ekstra forbedring. Den bruges kun, når browseren understøtter funktionerne i vores `@supports`-regel. Ellers åbner svaret uden animation.

## Eksempel 2: Skriv navnet på et valgt benspænd

**Valgt benspænd: Container queries.**

### Hvor og hvorfor?

I `FinancialProjections.astro` ændrer kortene bredde efter den plads, deres beholder har. Det hjælper kortene med at passe på små skærme.

### Relevant kode

Uddrag fra komponenten:

```css
.financial-content {
  container-type: inline-size;
}

@container (max-width: 450px) {
  .financial-cards {
    grid-auto-columns: 88%;
  }
}
```

Når beholderen er højst 450 px bred, fylder hvert kort 88 % af kortområdet.

### Afprøvning og ændringer

- **Vi testede med AI-hjælp:** Codex kontrollerede siden på smalle og brede skærme.
- **Vi observerede:** Hele siden blev ikke bredere end skærmen. Kortområdet kan scrolles vandret.
- **Vi ændrede eller mangler:** Vi deaktiverede pilene. Vi mangler at teste manuel scrolling med touch og tastatur.

## Eksempel 3: Skriv navnet på et valgt benspænd

**Valgt benspænd: Subgrid.**

### Hvor og hvorfor?

På case-siden bruger vi subgrid. Det gør, at artiklen følger sidens kolonner, så indholdet står på de samme linjer.

### Relevant kode

```css
@supports (grid-template-columns: subgrid) {
  .case-article {
    grid-template-columns: subgrid;
  }
}
```

Reglen bruges kun, hvis browseren understøtter subgrid. Ellers bruger artiklen sit eget almindelige grid.

### Afprøvning og ændringer

- **Vi testede med AI-hjælp:** Codex åbnede case siden på smalle og brede skærme.
- **Vi observerede:** Siden og billederne blev indlæst uden vandret overflow på hele siden.
- **Vi ændrede eller mangler:** Vi skal sammenligne med Figma og teste layoutet uden subgrid.

## Fallback og robusthed

**Fallback/progressive enhancement:** FAQ virker uden animation. Case-siden bruger almindeligt grid uden subgrid. Uden container queries bruges kortenes grundbredde på højst 280 px.

**Defensive CSS:** I finansværktøjernes kort bruger vi:

```css
.financial-card {
  min-width: 0;
  overflow-wrap: anywhere;
}
```

Det tillader kortet at blive smallere og lange ord at blive brudt, så teksten bliver inden for kortet.

**Global CSS og komponent-CSS:** `tokens.css` samler farver og afstande. `global.css` har fælles regler for hele siden. Komponenternes egne styles ligger i deres Astro-filer. `main.css` samler CSS-filerne og bestemmer rækkefølgen af lagene. `reset.css` nulstiller browserens standarder, og `overrides.css` tilpasser scrolling ved reduceret bevægelse.

**Det, vi ikke nåede:**

Vi syntes, login var svært og nåede ikke at færdiggøre det, vi havde store problemmer med det og nåede desværre ikke at få lavet den odentligt, og valgte derfor at prioritere andre ting.

Subscribe og andre handlingsknapper er også uden funktion. Navigationen mellem siderne virker stadig.

Vi kunne derfor med fordel, hvis vi skulle arbejde videre med det gøre siden mere responsiv, men det nåede i denne omgang.

## Brug af AI

Vi brugte ai som et hjælpe middel især til at spotte fejl, og sparring. vi brugte det især når vi mistede overblikket og havde især brug for den i starten da vi ikke havde kenskab til atro og lavede mange fejl hvor vi måtte starte forfra.
