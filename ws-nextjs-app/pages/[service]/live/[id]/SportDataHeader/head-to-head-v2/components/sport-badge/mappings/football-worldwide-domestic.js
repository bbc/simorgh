// Fifa Club World Cup
import AlAhly from '../../../assets/football/al-ahly.svg';
import AlAin from '../../../assets/football/al-ain.webp'; // No SVG available
import AlHilal from '../../../assets/football/al-hilal.svg';
import AucklandCity from '../../../assets/football/auckland-city.webp'; // No SVG available
import BocaJuniors from '../../../assets/football/boca-juniors.svg';
import Botafogo from '../../../assets/football/botafogo.svg';
import EsTunis from '../../../assets/football/es-tunis.webp'; // No SVG available
import Flamengo from '../../../assets/football/flamengo.svg';
import Fluminense from '../../../assets/football/fluminense.svg';
import MamelodiSundowns from '../../../assets/football/mamelodi-sundowns.svg';
import Monterrey from '../../../assets/football/monterrey.svg';
import Pachuca from '../../../assets/football/pachuca.svg';
import Palmeiras from '../../../assets/football/palmeiras.svg';
import RiverPlate from '../../../assets/football/river-plate.svg';
import UlsanHd from '../../../assets/football/ulsan-hd.svg';
import UrawaReds from '../../../assets/football/urawa-red-diamonds.svg';
import WydadCasablanca from '../../../assets/football/wydad-casablanca.svg';

// Major League Soccer
import AtlantaUnited from '../../../assets/football/atlanta-united.svg';
import Austin from '../../../assets/football/austin.svg';
import Charlotte from '../../../assets/football/charlotte.svg';
import ChicagoFire from '../../../assets/football/chicago-fire.svg';
import Cincinnati from '../../../assets/football/fc-cincinnati.svg';
import ColoradoRapids from '../../../assets/football/colorado-rapids.svg';
import ColumbusCrew from '../../../assets/football/columbus-crew.svg';
import Dallas from '../../../assets/football/fc-dallas.svg';
import DcUnited from '../../../assets/football/dc-united.svg';
import HoustonDynamo from '../../../assets/football/houston-dynamo.svg';
import InterMiami from '../../../assets/football/inter-miami.svg';
import LaGalaxy from '../../../assets/football/la-galaxy.svg';
import LosAngeles from '../../../assets/football/los-angeles.svg';
import MinnesotaUnited from '../../../assets/football/minnesota-united.svg';
import Montreal from '../../../assets/football/cf-montreal.svg';
import NashvilleSc from '../../../assets/football/nashville-sc.svg';
import NewEnglandRevolution from '../../../assets/football/new-england-revolution.svg';
import NewYorkCity from '../../../assets/football/new-york-city.svg';
import NewYorkRedBulls from '../../../assets/football/new-york-red-bulls.svg';
import OrlandoCity from '../../../assets/football/orlando-city.svg';
import PhiladelphiaUnion from '../../../assets/football/philadelphia-union.svg';
import PortlandTimbers from '../../../assets/football/portland-timbers.svg';
import RealSaltLake from '../../../assets/football/real-salt-lake.svg';
import SanDiego from '../../../assets/football/san-diego-fc.svg';
import SanJoseEarthquakes from '../../../assets/football/san-jose-earthquakes.svg';
import SeattleSounders from '../../../assets/football/seattle-sounders.svg';
import SportingKansasCity from '../../../assets/football/sporting-kansas-city.svg';
import StLouisCity from '../../../assets/football/st-louis-city.svg';
import Toronto from '../../../assets/football/toronto-fc.svg';
import VancouverWhitecaps from '../../../assets/football/vancouver-whitecaps.svg';

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
