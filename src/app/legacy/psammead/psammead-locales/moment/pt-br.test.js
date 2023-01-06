import moment from 'moment';
import './pt-br';

moment.locale('pt-br');

// This asset overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js
const assert = { equal: (val1, val2) => expect(val1).toEqual(val2) };

const tests =
  'Janeiro Jan_Fevereiro Fev_Março Mar_Abril Abr_Maio Mai_Junho Jun_Julho Jul_Agosto Ago_Setembro Set_Outubro Out_Novembro Nov_Dezembro Dez'.split(
    '_'
  );

function equalTest(input, mmm, i) {
  assert.equal(
    moment(input, mmm).month(),
    i,
    `${input} should be month ${i + 1}`
  );
}

for (let i = 0; i < 12; i += 1) {
  tests[i] = [...tests[i].split(' '), i];
}
test.each(tests)('parse %s %s', (longMonth, shortMonth, i) => {
  equalTest(longMonth, 'MMM', i);
  equalTest(shortMonth, 'MMM', i);
  equalTest(longMonth, 'MMMM', i);
  equalTest(shortMonth, 'MMMM', i);
  equalTest(longMonth.toLocaleLowerCase(), 'MMMM', i);
  equalTest(shortMonth.toLocaleLowerCase(), 'MMMM', i);
  equalTest(longMonth.toLocaleUpperCase(), 'MMMM', i);
  equalTest(shortMonth.toLocaleUpperCase(), 'MMMM', i);
});

const a = [
  ['dddd, MMMM Do YYYY, h:mm:ss a', 'domingo, fevereiro 14º 2010, 3:25:50 pm'],
  ['ddd, hA', 'dom, 3PM'],
  ['M Mo MM MMMM MMM', '2 2º 02 fevereiro fev'],
  ['YYYY YY', '2010 10'],
  ['D Do DD', '14 14º 14'],
  ['d do dddd ddd', '0 0º domingo dom'],
  ['DDD DDDo DDDD', '45 45º 045'],
  ['w wo ww', '8 8º 08'],
  ['h hh', '3 03'],
  ['H HH', '15 15'],
  ['m mm', '25 25'],
  ['s ss', '50 50'],
  ['a A', 'pm PM'],
  ['[the] DDDo [day of the year]', 'the 45º day of the year'],
  ['LTS', '15:25:50'],
  ['L', '14/02/2010'],
  ['LL', '14 fevereiro 2010'],
  ['LLL', '14 fevereiro 2010 às 15:25'],
  ['LLLL', 'domingo, 14 fevereiro 2010 às 15:25'],
  ['l', '14/2/2010'],
  ['ll', '14 fev 2010'],
  ['lll', '14 fev 2010 às 15:25'],
  ['llll', 'dom, 14 fev 2010 às 15:25'],
];

test.each(a)('format %s', (formatString, expectedDate) => {
  const b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
  assert.equal(
    b.format(formatString),
    expectedDate,
    `${formatString} ---> ${expectedDate}`
  );
});

test('format ordinal', () => {
  assert.equal(moment([2011, 0, 1]).format('DDDo'), '1º', '1º');
  assert.equal(moment([2011, 0, 2]).format('DDDo'), '2º', '2º');
  assert.equal(moment([2011, 0, 3]).format('DDDo'), '3º', '3º');
  assert.equal(moment([2011, 0, 4]).format('DDDo'), '4º', '4º');
  assert.equal(moment([2011, 0, 5]).format('DDDo'), '5º', '5º');
  assert.equal(moment([2011, 0, 6]).format('DDDo'), '6º', '6º');
  assert.equal(moment([2011, 0, 7]).format('DDDo'), '7º', '7º');
  assert.equal(moment([2011, 0, 8]).format('DDDo'), '8º', '8º');
  assert.equal(moment([2011, 0, 9]).format('DDDo'), '9º', '9º');
  assert.equal(moment([2011, 0, 10]).format('DDDo'), '10º', '10º');

  assert.equal(moment([2011, 0, 11]).format('DDDo'), '11º', '11º');
  assert.equal(moment([2011, 0, 12]).format('DDDo'), '12º', '12º');
  assert.equal(moment([2011, 0, 13]).format('DDDo'), '13º', '13º');
  assert.equal(moment([2011, 0, 14]).format('DDDo'), '14º', '14º');
  assert.equal(moment([2011, 0, 15]).format('DDDo'), '15º', '15º');
  assert.equal(moment([2011, 0, 16]).format('DDDo'), '16º', '16º');
  assert.equal(moment([2011, 0, 17]).format('DDDo'), '17º', '17º');
  assert.equal(moment([2011, 0, 18]).format('DDDo'), '18º', '18º');
  assert.equal(moment([2011, 0, 19]).format('DDDo'), '19º', '19º');
  assert.equal(moment([2011, 0, 20]).format('DDDo'), '20º', '20º');

  assert.equal(moment([2011, 0, 21]).format('DDDo'), '21º', '21º');
  assert.equal(moment([2011, 0, 22]).format('DDDo'), '22º', '22º');
  assert.equal(moment([2011, 0, 23]).format('DDDo'), '23º', '23º');
  assert.equal(moment([2011, 0, 24]).format('DDDo'), '24º', '24º');
  assert.equal(moment([2011, 0, 25]).format('DDDo'), '25º', '25º');
  assert.equal(moment([2011, 0, 26]).format('DDDo'), '26º', '26º');
  assert.equal(moment([2011, 0, 27]).format('DDDo'), '27º', '27º');
  assert.equal(moment([2011, 0, 28]).format('DDDo'), '28º', '28º');
  assert.equal(moment([2011, 0, 29]).format('DDDo'), '29º', '29º');
  assert.equal(moment([2011, 0, 30]).format('DDDo'), '30º', '30º');

  assert.equal(moment([2011, 0, 31]).format('DDDo'), '31º', '31º');
});

test('format month', () => {
  const expected =
    'janeiro jan_fevereiro fev_março mar_abril abr_maio mai_junho jun_julho jul_agosto ago_setembro set_outubro out_novembro nov_dezembro dez'.split(
      '_'
    );
  let i;
  for (i = 0; i < expected.length; i += 1) {
    assert.equal(
      moment([2011, i, 1]).format('MMMM MMM'),
      expected[i],
      expected[i]
    );
  }
});

test('format week', () => {
  const expected =
    'domingo dom do_segunda-feira seg 2ª_terça-feira ter 3ª_quarta-feira qua 4ª_quinta-feira qui 5ª_sexta-feira sex 6ª_sábado sáb sá'.split(
      '_'
    );
  let i;
  for (i = 0; i < expected.length; i += 1) {
    assert.equal(
      moment([2011, 0, 2 + i]).format('dddd ddd dd'),
      expected[i],
      expected[i]
    );
  }
});

test('from', () => {
  const start = moment([2007, 1, 28]);
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
    'poucos segundos',
    '44 seconds = seconds'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    '1 minuto',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
    '1 minuto',
    '89 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
    '2 minutos',
    '90 seconds = 2 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
    '44 minutos',
    '44 minutes = 44 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
    '1 hora',
    '45 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
    '1 hora',
    '89 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
    '2 horas',
    '90 minutes = 2 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
    '5 horas',
    '5 hours = 5 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
    '21 horas',
    '21 hours = 21 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
    'um dia',
    '22 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
    'um dia',
    '35 hours = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
    '2 dias',
    '36 hours = 2 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
    'um dia',
    '1 day = a day'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
    '5 dias',
    '5 days = 5 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
    '25 dias',
    '25 days = 25 days'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
    'um mês',
    '26 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
    'um mês',
    '30 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
    'um mês',
    '43 days = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
    '2 meses',
    '46 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
    '2 meses',
    '75 days = 2 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
    '3 meses',
    '76 days = 3 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
    'um mês',
    '1 month = a month'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
    '5 meses',
    '5 months = 5 months'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
    'um ano',
    '345 days = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
    '2 anos',
    '548 days = 2 years'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
    'um ano',
    '1 year = a year'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
    '5 anos',
    '5 years = 5 years'
  );
});

test('suffix', () => {
  assert.equal(moment(30000).from(0), 'em poucos segundos', 'prefix');
  assert.equal(moment(0).from(30000), 'Há poucos segundos', 'prefix');
});

test('fromNow', () => {
  assert.equal(
    moment().add({ s: 30 }).fromNow(),
    'em poucos segundos',
    'in seconds'
  );
  assert.equal(moment().add({ d: 5 }).fromNow(), 'em 5 dias', 'in 5 days');
});

test('calendar day', () => {
  const calendarTime = moment().hours(12).minutes(0).seconds(0);

  assert.equal(
    moment(calendarTime).calendar(),
    'Hoje às 12:00',
    'today at the same time'
  );
  assert.equal(
    moment(calendarTime).add({ m: 25 }).calendar(),
    'Hoje às 12:25',
    'Now plus 25 min'
  );
  assert.equal(
    moment(calendarTime).add({ h: 1 }).calendar(),
    'Hoje às 13:00',
    'Now plus 1 hour'
  );
  assert.equal(
    moment(calendarTime).add({ d: 1 }).calendar(),
    'Amanhã às 12:00',
    'tomorrow at the same time'
  );
  assert.equal(
    moment(calendarTime).subtract({ h: 1 }).calendar(),
    'Hoje às 11:00',
    'Now minus 1 hour'
  );
  assert.equal(
    moment(calendarTime).subtract({ d: 1 }).calendar(),
    'Ontem às 12:00',
    'yesterday at the same time'
  );
});

test('calendar next week', () => {
  let i;
  let m;
  for (i = 2; i < 7; i += 1) {
    m = moment().add({ d: i });
    assert.equal(
      m.calendar(),
      m.format('dddd [às] LT'),
      `Today + ${i} days current time`
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format('dddd [às] LT'),
      `Today + ${i} days beginning of day`
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format('dddd [às] LT'),
      `Today + ${i} days end of day`
    );
  }
});

test('calendar last week', () => {
  let i;
  let m;
  for (i = 2; i < 7; i += 1) {
    m = moment().subtract({ d: i });
    assert.equal(
      m.calendar(),
      m.format(
        m.day() === 0 || m.day() === 6
          ? '[Último] dddd [às] LT'
          : '[Última] dddd [às] LT'
      ),
      `Today - ${i} days current time`
    );
    m.hours(0).minutes(0).seconds(0).milliseconds(0);
    assert.equal(
      m.calendar(),
      m.format(
        m.day() === 0 || m.day() === 6
          ? '[Último] dddd [às] LT'
          : '[Última] dddd [às] LT'
      ),
      `Today - ${i} days beginning of day`
    );
    m.hours(23).minutes(59).seconds(59).milliseconds(999);
    assert.equal(
      m.calendar(),
      m.format(
        m.day() === 0 || m.day() === 6
          ? '[Último] dddd [às] LT'
          : '[Última] dddd [às] LT'
      ),
      `Today - ${i} days end of day`
    );
  }
});

test('calendar all else', () => {
  let weeksAgo = moment().subtract({ w: 1 });
  let weeksFromNow = moment().add({ w: 1 });

  assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
  assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

  weeksAgo = moment().subtract({ w: 2 });
  weeksFromNow = moment().add({ w: 2 });

  assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
  assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
});

test('weeks year starting sunday format', () => {
  assert.equal(
    moment([2012, 0, 1]).format('w ww wo'),
    '1 01 1º',
    'Jan  1 2012 should be week 1'
  );
  assert.equal(
    moment([2012, 0, 7]).format('w ww wo'),
    '1 01 1º',
    'Jan  7 2012 should be week 1'
  );
  assert.equal(
    moment([2012, 0, 8]).format('w ww wo'),
    '2 02 2º',
    'Jan  8 2012 should be week 2'
  );
  assert.equal(
    moment([2012, 0, 14]).format('w ww wo'),
    '2 02 2º',
    'Jan 14 2012 should be week 2'
  );
  assert.equal(
    moment([2012, 0, 15]).format('w ww wo'),
    '3 03 3º',
    'Jan 15 2012 should be week 3'
  );
});

test('relative time threshold', () => {
  const rts = moment();
  const rtsDefault = moment.relativeTimeThreshold('ss');

  moment.relativeTimeThreshold('ss', 3);

  rts.subtract(3, 'seconds');
  assert.equal(
    rts.fromNow(),
    'Há poucos segundos',
    'Below custom a few seconds to seconds threshold'
  );
  rts.subtract(1, 'seconds');
  assert.equal(
    rts.fromNow(),
    'Há 4 segundos',
    'Above custom a few seconds to seconds threshold'
  );

  moment.relativeTimeThreshold('ss', rtsDefault);
});
