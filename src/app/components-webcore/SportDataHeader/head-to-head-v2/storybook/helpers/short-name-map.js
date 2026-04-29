const shortNamesMap = team => {
  const map = {
    Arsenal: 'Arsenal',
    'Aston Villa': 'Aston Villa',
    'AFC Bournemouth': 'Bournemouth',
    Brentford: 'Brentford',
    'Brighton and Hove Albion': 'Brighton',
    Chelsea: 'Chelsea',
    'Crystal Palace': 'Crystal Palace',
    Everton: 'Everton',
    Fulham: 'Fulham',
    'Leeds United': 'Leeds',
    'Leicester City': 'Leicester',
    Liverpool: 'Liverpool',
    'Manchester City': 'Man City',
    'Manchester United': 'Man Utd',
    'Newcastle United': 'Newcastle',
    'Nottingham Forest': 'Nottm Forest',
    Southampton: 'Southampton',
    'Tottenham Hotspur': 'Tottenham',
    'West Ham United': 'West Ham',
    'Wolverhampton Wanderers': 'Wolves',
    'Unknown FC': 'Unknown',
    TBC: 'TBC',
  };
  return map[team] || map;
};

export { shortNamesMap };
