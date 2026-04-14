// Fifa Club World Cup
import AlAhly from '@bbc/web-assets/static/sport/football/al-ahly.svg';
import AlAin from '@bbc/web-assets/static/sport/football/al-ain.webp'; // No SVG available
import AlHilal from '@bbc/web-assets/static/sport/football/al-hilal.svg';
import AucklandCity from '@bbc/web-assets/static/sport/football/auckland-city.webp'; // No SVG available
import BocaJuniors from '@bbc/web-assets/static/sport/football/boca-juniors.svg';
import Botafogo from '@bbc/web-assets/static/sport/football/botafogo.svg';
import EsTunis from '@bbc/web-assets/static/sport/football/es-tunis.webp'; // No SVG available
import Flamengo from '@bbc/web-assets/static/sport/football/flamengo.svg';
import Fluminense from '@bbc/web-assets/static/sport/football/fluminense.svg';
import MamelodiSundowns from '@bbc/web-assets/static/sport/football/mamelodi-sundowns.svg';
import Monterrey from '@bbc/web-assets/static/sport/football/monterrey.svg';
import Pachuca from '@bbc/web-assets/static/sport/football/pachuca.svg';
import Palmeiras from '@bbc/web-assets/static/sport/football/palmeiras.svg';
import RiverPlate from '@bbc/web-assets/static/sport/football/river-plate.svg';
import UlsanHd from '@bbc/web-assets/static/sport/football/ulsan-hd.svg';
import UrawaReds from '@bbc/web-assets/static/sport/football/urawa-red-diamonds.svg';
import WydadCasablanca from '@bbc/web-assets/static/sport/football/wydad-casablanca.svg';

// Major League Soccer
import AtlantaUnited from '@bbc/web-assets/static/sport/football/atlanta-united.svg';
import Austin from '@bbc/web-assets/static/sport/football/austin.svg';
import Charlotte from '@bbc/web-assets/static/sport/football/charlotte.svg';
import ChicagoFire from '@bbc/web-assets/static/sport/football/chicago-fire.svg';
import Cincinnati from '@bbc/web-assets/static/sport/football/fc-cincinnati.svg';
import ColoradoRapids from '@bbc/web-assets/static/sport/football/colorado-rapids.svg';
import ColumbusCrew from '@bbc/web-assets/static/sport/football/columbus-crew.svg';
import Dallas from '@bbc/web-assets/static/sport/football/fc-dallas.svg';
import DcUnited from '@bbc/web-assets/static/sport/football/dc-united.svg';
import HoustonDynamo from '@bbc/web-assets/static/sport/football/houston-dynamo.svg';
import InterMiami from '@bbc/web-assets/static/sport/football/inter-miami.svg';
import LaGalaxy from '@bbc/web-assets/static/sport/football/la-galaxy.svg';
import LosAngeles from '@bbc/web-assets/static/sport/football/los-angeles.svg';
import MinnesotaUnited from '@bbc/web-assets/static/sport/football/minnesota-united.svg';
import Montreal from '@bbc/web-assets/static/sport/football/cf-montreal.svg';
import NashvilleSc from '@bbc/web-assets/static/sport/football/nashville-sc.svg';
import NewEnglandRevolution from '@bbc/web-assets/static/sport/football/new-england-revolution.svg';
import NewYorkCity from '@bbc/web-assets/static/sport/football/new-york-city.svg';
import NewYorkRedBulls from '@bbc/web-assets/static/sport/football/new-york-red-bulls.svg';
import OrlandoCity from '@bbc/web-assets/static/sport/football/orlando-city.svg';
import PhiladelphiaUnion from '@bbc/web-assets/static/sport/football/philadelphia-union.svg';
import PortlandTimbers from '@bbc/web-assets/static/sport/football/portland-timbers.svg';
import RealSaltLake from '@bbc/web-assets/static/sport/football/real-salt-lake.svg';
import SanDiego from '@bbc/web-assets/static/sport/football/san-diego-fc.svg';
import SanJoseEarthquakes from '@bbc/web-assets/static/sport/football/san-jose-earthquakes.svg';
import SeattleSounders from '@bbc/web-assets/static/sport/football/seattle-sounders.svg';
import SportingKansasCity from '@bbc/web-assets/static/sport/football/sporting-kansas-city.svg';
import StLouisCity from '@bbc/web-assets/static/sport/football/st-louis-city.svg';
import Toronto from '@bbc/web-assets/static/sport/football/toronto-fc.svg';
import VancouverWhitecaps from '@bbc/web-assets/static/sport/football/vancouver-whitecaps.svg';

const map = {
  // Fifa Club World Cup
  'urn:bbc:sportsdata:football:team:al-ahly': AlAhly,
  'urn:bbc:sportsdata:football:team:al-ain': AlAin,
  'urn:bbc:sportsdata:football:team:al-hilal': AlHilal,
  'urn:bbc:sportsdata:football:team:auckland-city': AucklandCity,
  'urn:bbc:sportsdata:football:team:boca-juniors': BocaJuniors,
  'urn:bbc:sportsdata:football:team:botafogo': Botafogo,
  'urn:bbc:sportsdata:football:team:es-tunis': EsTunis,
  'urn:bbc:sportsdata:football:team:flamengo': Flamengo,
  'urn:bbc:sportsdata:football:team:fluminense': Fluminense,
  'urn:bbc:sportsdata:football:team:mamelodi-sundowns': MamelodiSundowns,
  'urn:bbc:sportsdata:football:team:monterrey': Monterrey,
  'urn:bbc:sportsdata:football:team:pachuca': Pachuca,
  'urn:bbc:sportsdata:football:team:palmeiras': Palmeiras,
  'urn:bbc:sportsdata:football:team:river-plate': RiverPlate,
  'urn:bbc:sportsdata:football:team:ulsan-hd': UlsanHd,
  'urn:bbc:sportsdata:football:team:urawa-red-diamonds': UrawaReds,
  'urn:bbc:sportsdata:football:team:wydad-casablanca': WydadCasablanca,

  // Major League Soccer
  'urn:bbc:sportsdata:football:team:atlanta-united': AtlantaUnited,
  'urn:bbc:sportsdata:football:team:austin': Austin,
  'urn:bbc:sportsdata:football:team:charlotte': Charlotte,
  'urn:bbc:sportsdata:football:team:chicago-fire': ChicagoFire,
  'urn:bbc:sportsdata:football:team:fc-cincinnati': Cincinnati,
  'urn:bbc:sportsdata:football:team:colorado-rapids': ColoradoRapids,
  'urn:bbc:sportsdata:football:team:columbus-crew': ColumbusCrew,
  'urn:bbc:sportsdata:football:team:fc-dallas': Dallas,
  'urn:bbc:sportsdata:football:team:dc-united': DcUnited,
  'urn:bbc:sportsdata:football:team:houston-dynamo': HoustonDynamo,
  'urn:bbc:sportsdata:football:team:inter-miami': InterMiami,
  'urn:bbc:sportsdata:football:team:la-galaxy': LaGalaxy,
  'urn:bbc:sportsdata:football:team:los-angeles': LosAngeles,
  'urn:bbc:sportsdata:football:team:minnesota-united': MinnesotaUnited,
  'urn:bbc:sportsdata:football:team:cf-montreal': Montreal,
  'urn:bbc:sportsdata:football:team:nashville-sc': NashvilleSc,
  'urn:bbc:sportsdata:football:team:new-england-revolution': NewEnglandRevolution,
  'urn:bbc:sportsdata:football:team:new-york-city': NewYorkCity,
  'urn:bbc:sportsdata:football:team:new-york-red-bulls': NewYorkRedBulls,
  'urn:bbc:sportsdata:football:team:orlando-city': OrlandoCity,
  'urn:bbc:sportsdata:football:team:philadelphia-union': PhiladelphiaUnion,
  'urn:bbc:sportsdata:football:team:portland-timbers': PortlandTimbers,
  'urn:bbc:sportsdata:football:team:real-salt-lake': RealSaltLake,
  'urn:bbc:sportsdata:football:team:san-diego-fc': SanDiego,
  'urn:bbc:sportsdata:football:team:san-jose-earthquakes': SanJoseEarthquakes,
  'urn:bbc:sportsdata:football:team:seattle-sounders': SeattleSounders,
  'urn:bbc:sportsdata:football:team:sporting-kansas-city': SportingKansasCity,
  'urn:bbc:sportsdata:football:team:st-louis-city': StLouisCity,
  'urn:bbc:sportsdata:football:team:toronto-fc': Toronto,
  'urn:bbc:sportsdata:football:team:vancouver-whitecaps': VancouverWhitecaps
};

export default map;
