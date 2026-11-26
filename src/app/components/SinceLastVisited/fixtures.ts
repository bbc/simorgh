import { Summary } from '#app/models/types/curationData';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const TITLES = [
  'Qué se sabe del acuerdo comercial que cambia el mapa económico de la región',
  'Por qué el precio del café se ha disparado en el último año',
  'La misión espacial que busca el origen de los océanos en la Luna',
  'Cómo una pequeña isla se convirtió en líder mundial de energía solar',
  'Las claves de las elecciones que definirán el rumbo del país',
  'El hallazgo arqueológico que reescribe la historia de los primeros pobladores',
  'Qué hacer cuando tu hijo no quiere ir a la escuela',
  'La ciudad que prohibió los coches en su centro y lo que pasó después',
  'Cinco señales de que tu cuerpo necesita descansar más',
  'El ingeniero que construyó un puente con materiales reciclados',
  'Por qué cada vez más jóvenes eligen oficios en lugar de la universidad',
  'La batalla legal por los derechos de una antigua selva amazónica',
  'Cómo los satélites ayudan a predecir las sequías con meses de antelación',
  'La cocinera que recuperó recetas olvidadas de su abuela',
  'Qué significa la nueva ley de datos personales para tu vida diaria',
  'El deporte que crece en silencio en las zonas rurales',
  'Por qué los glaciares andinos se derriten más rápido de lo previsto',
  'La nueva generación de músicos que mezcla folclor y electrónica',
  'Cómo es vivir en el pueblo más alto del continente',
  'El experimento que busca frenar el envejecimiento celular',
];

// Hours before "now" each story was first published, spanning just over 2 weeks
const HOURS_AGO = [
  1, 3, 6, 9, 20, 27, 33, 50, 55, 76, 99, 123, 150, 172, 198, 225, 250, 281,
  310, 330,
];

/**
 * Builds 20 summaries spread across ~14 days, newest first, relative to `now`
 * so the timeline always looks current. More data than the BFF returns today.
 */
export const buildTwoWeekSummaries = (now = Date.now()): Summary[] =>
  TITLES.map((title, index) => {
    const published = new Date(now - HOURS_AGO[index] * HOUR_MS).toISOString();
    const id = `fixture-story-${index + 1}`;

    return {
      id,
      title,
      link: `https://www.bbc.com/mundo/articles/${id}`,
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/c215/live/fb047830-8110-11f1-926f-c90d1bcfbc84.png.webp',
      imageAlt: title,
      type: 'article',
      firstPublished: published,
      lastPublished: published,
    } as Summary;
  });

// Just inside the 14 day lookback so every fixture story counts as new
export const PREVIOUS_VISIT_AGE_MS = 14 * DAY_MS - HOUR_MS;
