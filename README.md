# Casa Verde Lanzarote – statische Website

Eine vollständig statische, responsive Website ohne WordPress oder serverseitige Abhängigkeiten.

## Direkt veröffentlichen

Den gesamten Inhalt dieses Ordners auf den Webserver kopieren. Einstiegspunkt ist `index.html`. Die Seite funktioniert ohne Build-Schritt auf jedem normalen Webspace.

## Struktur

- `index.html` – vollständige Website
- `datenschutz.html` – rechtlicher Platzhalter, vor Veröffentlichung prüfen
- `assets/css/styles.css` – produktionsfertiges CSS
- `scss/styles.scss` – SCSS-kompatible Designquelle
- `assets/js/main.js` – Navigation, Animationen, Appartement-Galerien und Anfrageformular
- `assets/images/originals/` – 74 extrahierte Originalbilder der bisherigen Website
- `assets/images/logo-casa-verde-*.svg` – modernisierte helle und dunkle Vektorversion des ursprünglichen Logos
- `IMAGE-SOURCES.md` – Herkunft und Hinweise zu den Bildern

## Buchungsanfrage

Die Website ist rein statisch. Das Formular öffnet das lokale E-Mail-Programm mit einer bereits ausgefüllten Nachricht an `casaverde.lanzarote@gmail.com`. Für serverseitigen Formularversand kann später ein Formdienst oder eigenes Backend angeschlossen werden.

## SCSS kompilieren

```sh
sass scss/styles.scss assets/css/styles.css --style=compressed
```

## Vor Veröffentlichung prüfen

- Preise und Verfügbarkeit bestätigen
- Impressum bzw. Betreiberangaben ergänzen
- Datenschutzerklärung juristisch prüfen
- E-Mail-Adresse und Telefonnummer bestätigen
- Bildrechte und Aktualität der Fotos bestätigen
