export const title = 'Escríbenos';

export const description = `<p><strong>En BBC Mundo nos importa tu punto de vista.</strong></p>
      <p>Tus opiniones, comentarios y sugerencias son bienvenidos.</p>
      <p>A partir de ellos, podremos ofrecerte un mejor servicio.</p>
      <p>Por favor, utiliza el formulario para enviarnos un mensaje. Procuraremos responder a la mayor brevedad.</p>
      <p>Para enviar una queja,&nbsp;<a href="https://www.bbc.com/mundo/send/u50853472" target="_blank">haz clic aqu&iacute;</a>.</p>`;

export const sectionTitle = 'Envíanos tus comentarios';

export const privacyNotice = `Si bien leemos lo mensajes que recibimos, no podemos garantizar que responderemos a todos.</p>
      <p>Los datos personales que proporcione ser&aacute;n procesados por la BBC y cualquier proveedor de servicios relevante del que dependamos para respaldar nuestros sistemas de quejas y de participaci&oacute;n de la audiencia con el fin manejar sus comentarios. La BBC y nuestros proveedores de servicios retendr&aacute;n sus datos de acuerdo con nuestra pol&iacute;tica de retenci&oacute;n y el Reglamento General de Protecci&oacute;n de Datos.</p>
      <p>La BBC procesa sus datos sobre la base de sus intereses leg&iacute;timos como organizaci&oacute;n de medios para responder a los comentarios y preocupaciones de la audiencia. Visite la <a href="https://www.bbc.com/mundo/institucional-36400009">Cl&aacute;usula de privacidad</a> y <a href="http://www.bbc.co.uk/usingthebbc/cookies/">Cookies</a> de la BBC para obtener m&aacute;s informaci&oacute;n sobre c&oacute;mo la BBC maneja sus datos. Si presenta una queja ante la BBC sobre c&oacute;mo manejamos sus datos personales y usted no est&aacute; satisfecho con nuestra respuesta, puede presentar una queja ante la Oficina del Comisionado de Informaci&oacute;n de Reino Unido.</p>`;

export const fields = [
  {
    id: 'txt49018765',
    type: 'text',
    validation: { mandatory: true },
    htmlType: 'text',
    label: 'Nombre',
    description: '',
    textArea: false,
  },
  {
    id: 'txt49018835',
    type: 'text',
    validation: { mandatory: true },
    htmlType: 'email',
    label: 'Dirección de email',
    description: '',
    textArea: false,
  },
  {
    id: 'txt49018894',
    type: 'text',
    validation: { mandatory: false },
    htmlType: 'text',
    label: 'Ciudad y país',
    description: '',
    textArea: false,
  },
  {
    id: 'txt49018963',
    type: 'text',
    validation: { mandatory: false },
    htmlType: 'phone',
    label: 'Número de teléfono',
    description: '',
    textArea: false,
  },
  {
    id: 'txt49019016',
    type: 'text',
    validation: { mandatory: true },
    htmlType: 'textarea',
    label: 'Comentario',
    description: '',
    textArea: true,
  },
  {
    id: 'chk49021805',
    type: 'checkbox',
    validation: { mandatory: false },
    htmlType: 'checkbox',
    description: '',
    label:
      'Estoy dispuesto/a a que la BBC me contacte en referencia a este comentario.',
  },
];
