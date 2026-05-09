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