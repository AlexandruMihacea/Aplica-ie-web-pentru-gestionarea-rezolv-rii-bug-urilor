# **Aplicație web pentru gestionarea rezolvării bug-urilor**<br/><br/>

## Descrierea proiectului<br/>

Aplicație web care permite raportarea, comunicarea și tracking-ul bug-urilor pentru un proiect*.

<br/>

## Funcționalități propuse

  -	Autentificarea/ login-ul în aplicație;
  
  -	Înregistrarea unui proiect pentru utilizatorii care se conectează folosind o adresă de email validă;
  
  -	Adăugarea de participanți la un proiect; 
  
  -	Acordare de permisiune de alocare/soluționare bug;
  
  -	Identificarea unui bug pe baza raportului și desemnarea membrului care se va ocupa de soluționarea acestuia;
  
  -	Actualizarea stadiului în care se află proiectul prin editarea statusului bug-ului existent în baza de date;
  
  -	Vizualizarea bug-urilor raportate la nivel de proiect (soluționate sau nu) și a tuturor bug-urilor pentru toate proiectele unui utilizator conectat;
  
  -	Vizualizarea listei de proiecte asociate aplicației;
  
  -	Înregistrarea unui nou bug pentru o aplicație din baza de date folosind metodele de clasificare oferite de aplicație (nivel de severitate, prioritate, descriere și commit link)
<br/>

## Instrucţiuni de rulare

După instalarea/ actualizarea pachetelor de dependințe,

``` 
npm i
```

serverul poate fi pornit prin comanda:

``` 
npm run backend
```

Au fost proiectate diferite endpoints care să corespundă cerințelor aplicației în dezvoltare, specificate în secțiunea de funcționalități propuse.
De asemenea, proiectul include și fișierul BugApp.json, care poate fi folosit pentru testare, prin importare în Postman.
<br/>
## Status proiect
  
Etapa 2/3: Serviciu RESTful funcțional în repository
🐢
