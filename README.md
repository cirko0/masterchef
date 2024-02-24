# MasterChef + AI

_Veb aplikacija koja koristi veštačku inteligenciju kako bi pojednostavila deljenje recepata na mreži._

## Isprobajte

🌐 Pogledajte **demo** [ovde](https://masterchef-ai.netlify.app/).

<img src="https://i.imgur.com/np62iDE.png" alt="screenshot of masterchef homepage" height="375">

## Uvod

Deljenje recepata na mreži je zamorno, često zahteva mnogo više od samog pisanja recepta - poput pripreme detaljne liste sastojaka, pisanja uvoda, fotografisanja primamljive slike i još mnogo toga.

MasterChef + AI želi da eliminiše ovu 'prepreku' pri deljenju recepata na mreži i učini je pristupačnom pomažući korisniku da se fokusira samo na recept.

Bez obzira da li ste iskusni kuvar ili početnik, MasterChef + AI vam pruža prostor za izražavanje vaše kreativnosti i inspiraciju za nove kulinarske avanture.

## Tehnologije

- React (kao frontend framework)
- Tailwind (za stilizovanje frontend-a)
- Node.js sa Express-om (za izgradnju backend API-ja)
- MongoDB (kao skladiste podataka)
- Uploadcare (kao CDN za serviranje slika)
- Clerk (za autentifikaciju)
- OpenAI Platform SDK (za izgradnju AI funkcija)

## Kompatibilnost

Veb aplikacija je kompatibilna sa najnovijim verzijama:

- Desktop/Mobilnih pretraživača baziranih na Chromium-u (verzija 114+) (Testirano na Microsoft Edge-u i Google Chrome-u)
- Desktop/Mobilnih pretraživača Mozilla Firefox (verzija 115+)

## Funkcije

### Pronalaženje recepata

- Javno pregledavanje deljenih recepata.
- Pretraživanje recepata po nazivu, autoru ili vrsti ishrane.
- Paginacija gde god je prikazana lista/grid recepata.

### Deljenje recepata

- Dodajte recepte uz pomoć AI
  - AI će uraditi sledeće:
    - Napisati uvod i opis recepta (GPT 3.5)
    - Identifikovati i sortirati korišćene sastojke u receptu kako bi izgradili kategorizovanu listu sastojaka i povezali sastojke sa koracima u kojima se koriste (GPT 3.5)
    - Identifikovati da li je recept ne vegetarijanski, vegetarijanski ili veganski.
    - Vizualizovati i generisati sliku za recept ako nije postavljena (GPT 3.5 & DALL-E 2)
- Asinhrona obrada podnetih recepata, uz stalna ažuriranja statusa (polling-based)

### Uredjivanje recepata

- Autentifikujte se sa OAuth provajderima.
- Pregledajte recepte koje ste podelili.
- Obrišite svoje recepte.
- Ručno uredite svoje recepte da biste ispravili štamparske greške ili greške u elementima koje je generisao AI.

### Bezbednost

- Spam filteri koji koriste AI tehnologiju.
- Detaljne informacije o uobičajenim alergenima u hrani, koje su analizirane uz pomoć AI tehnologije.
- Procena zdravstvenih implikacija recepata uz pomoć AI tehnologije.
