# PuccioQuiz System - Setup Guide

## Overview
Un sistema completo di quiz interattivo con ruota della fortuna, progettato per raccogliere dati conformi al GDPR con limitazioni di accesso per email e IP.

### Flusso Utente
1. **Index1.html** - Quiz: Utente compila il form con email e risposte
2. **Index2.html** - Perdita: Se sbaglia, vede gli errori
3. **Index3.html** - Ruota: Se passa il quiz, gira la ruota e vince premi

---

## Setup Instructions

### 1. Creare il Google Sheet

1. Apri [Google Sheets](https://sheets.google.com)
2. Crea un nuovo foglio nominato **PuccioQuiz**
3. Il script creerà automaticamente le colonne necessarie

**Colonne che verranno create:**
- Timestamp
- Email
- IP
- Quiz_Score
- Quiz_Answers (JSON)
- Quiz_Q10_Answers (JSON)
- GDPR_Accepted
- Quiz_Date
- Quiz_Status (Passed/Failed)
- Wheel_Accessed
- Wheel_Date
- Prize
- Token
- User_Agent

### 2. Configurare Google Apps Script

1. **Apri l'Editor Scripts** del tuo Google Sheet (Estensioni → Apps Script)

2. **Elimina il codice di default** e copia il contenuto di `backend.gs`

3. **Salva il progetto** con nome "PuccioQuiz Backend"

4. **Distribuisci come Web App:**
   - Clicca "Deploy" → "New deployment"
   - Tipo: "Web app"
   - Execute as: [Il tuo account]
   - Who has access: "Anyone"
   - Clicca "Deploy"

5. **Copia l'URL di deployment** (simile a: `https://script.google.com/macros/d/{SCRIPT_ID}/usercss=...`)

### 3. Configurare i file HTML

1. **Aggiorna `config.js`:**
   ```javascript
   const BACKEND_URL = 'https://script.google.com/macros/d/{SCRIPT_ID}/usercss=AKfycby...';
   ```
   Sostituisci con l'URL del tuo deployment di Apps Script

2. **Copia i file nella tua repository:**
   - `Index1.html` (Quiz)
   - `Index2.html` (Risultato negativo)
   - `Index3.html` (Ruota della fortuna)
   - `config.js` (Configurazione)
   - `backend.gs` (Apps Script)

### 4. Hosting

Ospita i file su:
- GitHub Pages
- Vercel
- Netlify
- Qualsiasi hosting web statico

---

## Funzionalità Principali

### ✅ Quiz (Index1.html)
- 9 domande obbligatorie (se risposte errate → Index2)
- 1 domanda opzionale per divertimento
- Checkbox GDPR obbligatorio
- Validazione email integrata
- Raccolta IP automatica
- Solo 1 tentativo per email
- Redirect automatico al risultato dopo 3-4 secondi

### ❌ Pagina di Perdita (Index2.html)
- Mostra le domande sbagliate
- Confronta risposte dell'utente con quelle corrette
- Invite all'apertura del locale
- Pulsanti di condivisione e revisione

### 🎡 Ruota della Fortuna (Index3.html)
- Verifica eligibilità (solo per chi ha passato il quiz)
- Limitazione per email (1 ruota per email)
- Limitazione per IP (1 ruota per dispositivo)
- Genera token di riscatto casuale
- Registra il premio vinto
- Animazione fluida con suoni

### 🔐 GDPR & Privacy
- Checkbox di consenso esplicito obbligatorio
- Link a Informativa sulla Privacy
- Conservazione dati conforme GDPR
- Traccia IP e User Agent
- Data di partecipazione registrata

---

## Limitazioni di Accesso

### Quiz (Email)
```
- 1 quiz per email
- Controllo all'invio del form
- Se già presente → messaggio di errore
```

### Ruota (Email + IP)
```
- 1 ruota per email
- 1 ruota per IP
- Controllo prima di entrare in Index3
- Se violato → messaggio di restrizione
```

---

## Dati Salvati nel Google Sheet

Ogni riga contiene:

```
A | Timestamp         | 2026-05-09T14:30:00Z
B | Email             | user@example.com
C | IP                | 192.168.1.1
D | Quiz_Score        | 9
E | Quiz_Answers      | [{"q":1,"answer":"puccia","correct":"puccia"...}]
F | Quiz_Q10_Answers  | ["laboratorio_segreto"]
G | GDPR_Accepted     | Yes
H | Quiz_Date         | 2026-05-09T14:30:00Z
I | Quiz_Status       | Passed
J | Wheel_Accessed    | Yes
K | Wheel_Date        | 2026-05-09T14:35:00Z
L | Prize             | Maglietta
M | Token             | A3K8L5
N | User_Agent        | Mozilla/5.0...
```

---

## Troubleshooting

### "Errore di connessione al backend"
- Verifica che l'URL di deployment sia corretto in `config.js`
- Assicurati che la Web App sia deployata come "Anyone"
- Controlla la console browser (F12) per dettagli dell'errore

### "Hai già partecipato a questo quiz"
- Significa che l'email è già nel database
- È il comportamento corretto (1 quiz per email)
- Per testare, usa email diverse

### "La ruota è già stata utilizzata"
- Limitazione funzionante correttamente
- Svuota cache o usa una email/IP diversa
- Per reset completo, modifica il Google Sheet manualmente

### Quiz non si salva
- Controlla che il Google Sheet sia accessibile
- Verifica l'URL di deployment nel codice
- Guarda i log di Apps Script per errori

---

## Personalizzazione

### Modificare il numero di domande
1. Modifica `Index1.html` (aggiungi/rimuovi `<div class="question">`)
2. Aggiorna l'oggetto `correct` nel JavaScript
3. Aggiorna la validazione (ciclo 1-9 → numero desiderato)

### Modificare i premi della ruota
1. Modifica l'array `slicesConfig` in `Index3.html`
2. Aggiorna i colori e i nomi dei premi

### Cambiare i colori
1. Modifica le variabili CSS `:root` in ogni file HTML
2. Personalizza gradient, accent colors, etc.

---

## Conformità GDPR

✅ **Implementato:**
- Consenso esplicito richiesto
- Informativa sulla Privacy linkata
- Traccia completa di data/ora
- Conservazione dati limitata
- Possibilità di esportazione dal Google Sheet
- IP registrato per analytics

📋 **Da Implementare (facoltativo):**
- Pagina di Privacy Policy completa
- Diritto di cancellazione dati
- Email di conferma ricevimento consenso
- Scadenza automatica dati (es. 1 anno)

---

## Support & Debug

### Enable Debug Mode
Aggiungi questo nella console browser:
```javascript
window.DEBUG = true;
```

### View Database
1. Apri il tuo Google Sheet
2. Vedi tutte le righe salvate
3. Esporta come CSV per analisi

### Reset Database
1. Apri il Google Sheet
2. Seleziona tutte le righe dati
3. Elimina (mantieni solo headers)

---

## File Structure

```
quiz-system/
├── Index1.html          # Quiz
├── Index2.html          # Risultato negativo
├── Index3.html          # Ruota della fortuna
├── config.js            # Configurazione
├── backend.gs           # Google Apps Script
└── README.md            # Questo file
```

---

## Contatti & Support

Per domande o problemi, apri un issue nel repository o contatta l'amministratore.

**Versione:** 1.0  
**Ultimo aggiornamento:** 2026-05-09  
**Compatibilità:** Chrome, Firefox, Safari, Edge (ultimi 2 anni)

---

*Developed with ❤️ for Pucciotto Grand Opening*
