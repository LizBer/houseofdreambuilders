// Labels the engine writes itself (buttons, hints, messages). Pick with site.lang;
// anything can be overridden per site in content.json under site.labels.
export const LOCALES = {
  nl: {
    skip: 'Ga naar de inhoud', menu: 'Menu', close: 'Sluiten', scroll: 'Lees verder',
    blank: 'volgt', slot: 'Hier komt:', price: 'Prijs', duration: 'Duur',
    goodFor: 'Waar het goed voor is', stars: '{n} van 5 sterren', send: 'Versturen',
    pointsLabel: 'Kies een punt', pointsHint: 'Raak een cijfer aan',
    notConnected: 'Er is niets verstuurd: dit formulier is nog niet aangesloten.',
    needName: 'Vul je naam in.', needEmail: 'Dat e-mailadres lijkt nog niet compleet.',
    thanks: 'Dank je. Ik mail je terug.', failed: 'Dat ging niet door. Probeer het later nog eens.',
    thanksTitle: 'Bedankt', thanksText: 'Je bericht is verstuurd.',
    notFoundTitle: 'Pagina niet gevonden', notFoundText: 'Deze pagina bestaat niet.', home: 'Naar de homepage',
    pause: 'Pauzeer', play: 'Laat lopen', chooserTitle: 'Kies een versie', chooserText: 'Dezelfde inhoud, verschillende looks.'
  },
  en: {
    skip: 'Skip to content', menu: 'Menu', close: 'Close', scroll: 'Keep reading',
    blank: 'to follow', slot: 'Photo goes here:', price: 'Price', duration: 'Duration',
    goodFor: 'Good for', stars: '{n} out of 5 stars', send: 'Send',
    pointsLabel: 'Choose a point', pointsHint: 'Tap a number',
    notConnected: 'Nothing was sent: this form is not connected yet.',
    needName: 'Please add your name.', needEmail: 'That email address looks incomplete.',
    thanks: 'Thank you. I will write back.', failed: 'That did not go through. Please try again later.',
    thanksTitle: 'Thank you', thanksText: 'Your message was sent.',
    notFoundTitle: 'Page not found', notFoundText: 'This page does not exist.', home: 'Back to the homepage',
    pause: 'Pause', play: 'Resume', chooserTitle: 'Pick a version', chooserText: 'Same content, different looks.'
  }
};
