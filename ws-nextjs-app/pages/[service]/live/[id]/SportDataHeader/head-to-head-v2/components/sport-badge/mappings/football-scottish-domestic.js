import Aberdeen from '../../../assets/football/aberdeen.svg';
import AirdrieonansFc from '../../../assets/football/airdrieonians-fc.svg';
import AlbionRovers from '../../../assets/football/albion-rovers.svg';
import Alloa from '../../../assets/football/alloa.svg';
import AnnanAthletic from '../../../assets/football/annan-athletic.svg';
import Arbroath from '../../../assets/football/arbroath.svg';
import AyrUnited from '../../../assets/football/ayr-united.svg';
import BerwickRangers from '../../../assets/football/berwick-rangers.svg';
import BonnyriggRose from '../../../assets/football/bonnyrigg-rose.svg';
import BrechinCity from '../../../assets/football/brechin-city.svg';
import Celtic from '../../../assets/football/celtic.svg';
import Clyde from '../../../assets/football/clyde.svg';
import CoveRangers from '../../../assets/football/cove-rangers.svg';
import Cowdenbeath from '../../../assets/football/cowdenbeath.svg';
import Dumbarton from '../../../assets/football/dumbarton.svg';
import Dundee from '../../../assets/football/dundee.svg';
import DundeeUnited from '../../../assets/football/dundee-united.svg';
import DunfermlineAthletic from '../../../assets/football/dunfermline-athletic.svg';
import EastFife from '../../../assets/football/east-fife.svg';
import EastKilbride from '../../../assets/football/east-kilbride.webp'; // No SVG available
import EdinburghCity from '../../../assets/football/edinburgh-city.svg';
import ElginCity from '../../../assets/football/elgin-city.svg';
import Falkirk from '../../../assets/football/falkirk.svg';
import ForfarAthletic from '../../../assets/football/forfar-athletic.svg';
import GlasgowCity from '../../../assets/football/glasgow-city.svg';
import GreenockMorton from '../../../assets/football/greenock-morton.svg';
import HamiltonAcademical from '../../../assets/football/hamilton-academical.svg';
import HeartOfMidlothian from '../../../assets/football/heart-of-midlothian.svg';
import Hibernian from '../../../assets/football/hibernian.svg';
import InvernessCaledonianThistle from '../../../assets/football/inverness-caledonian-thistle.svg';
import KeltyHearts from '../../../assets/football/kelty-hearts.webp'; // No SVG available
import Kilmarnock from '../../../assets/football/kilmarnock.svg';
import Livingston from '../../../assets/football/livingston.svg';
import Montrose from '../../../assets/football/montrose.svg';
import Motherwell from '../../../assets/football/motherwell.svg';
import PartickThistle from '../../../assets/football/partick-thistle.svg';
import Peterhead from '../../../assets/football/peterhead.svg';
import QueenOfTheSouth from '../../../assets/football/queen-of-the-south.svg';
import QueensPark from '../../../assets/football/queens-park.svg';
import RaithRovers from '../../../assets/football/raith-rovers.svg';
import Rangers from '../../../assets/football/rangers.svg';
import RossCounty from '../../../assets/football/ross-county.svg';
import Stenhousemuir from '../../../assets/football/stenhousemuir.svg';
import StirlingAlbion from '../../../assets/football/stirling-albion.svg';
import StJohnstone from '../../../assets/football/st-johnstone.svg';
import StMirren from '../../../assets/football/st-mirren.svg';
import Stranraer from '../../../assets/football/stranraer.svg';
import TheSpartans from '../../../assets/football/the-spartans.webp'; // No SVG available

const map = {
  'urn:bbc:sportsdata:football:team:aberdeen': Aberdeen,
  'urn:bbc:sportsdata:football:team:aberdeen-women': Aberdeen,
  '841zp0njrq63yv4fvw6lgf60q': Aberdeen,

  'urn:bbc:sportsdata:football:team:airdrieonians': AirdrieonansFc,

  'urn:bbc:sportsdata:football:team:albion-rovers': AlbionRovers,

  'urn:bbc:sportsdata:football:team:alloa-athletic': Alloa,

  'urn:bbc:sportsdata:football:team:annan-athletic': AnnanAthletic,

  'urn:bbc:sportsdata:football:team:arbroath': Arbroath,

  'urn:bbc:sportsdata:football:team:ayr-united': AyrUnited,

  'urn:bbc:sportsdata:football:team:berwick-rangers': BerwickRangers,

  'urn:bbc:sportsdata:football:team:bonnyrigg-rose': BonnyriggRose,

  'urn:bbc:sportsdata:football:team:brechin-city': BrechinCity,

  'urn:bbc:sportsdata:football:team:celtic': Celtic,
  'urn:bbc:sportsdata:football:team:celtic-women': Celtic,
  dvnjvad3p09dugr79gktlrtll: Celtic,

  'urn:bbc:sportsdata:football:team:clyde': Clyde,

  'urn:bbc:sportsdata:football:team:cove-rangers': CoveRangers,

  'urn:bbc:sportsdata:football:team:cowdenbeath': Cowdenbeath,

  'urn:bbc:sportsdata:football:team:dumbarton': Dumbarton,

  'urn:bbc:sportsdata:football:team:dundee': Dundee,
  g7em7tpuicehjy3wmsbimsee: Dundee,

  'urn:bbc:sportsdata:football:team:dundee-united': DundeeUnited,
  'urn:bbc:sportsdata:football:team:dundee-united-women': DundeeUnited,
  '4qdzzur2cuuridyb0jso8mksi': DundeeUnited,

  'urn:bbc:sportsdata:football:team:dunfermline-athletic': DunfermlineAthletic,

  'urn:bbc:sportsdata:football:team:east-fife': EastFife,

  'urn:bbc:sportsdata:football:team:east-kilbride': EastKilbride,

  'urn:bbc:sportsdata:football:team:edinburgh-city': EdinburghCity,

  'urn:bbc:sportsdata:football:team:elgin-city': ElginCity,

  'urn:bbc:sportsdata:football:team:falkirk': Falkirk,

  'urn:bbc:sportsdata:football:team:forfar-athletic': ForfarAthletic,

  'urn:bbc:sportsdata:football:team:glasgow-city-women': GlasgowCity,

  'urn:bbc:sportsdata:football:team:greenock-morton': GreenockMorton,

  'urn:bbc:sportsdata:football:team:hamilton-academical': HamiltonAcademical,
  'urn:bbc:sportsdata:football:team:hamilton-academical-women': HamiltonAcademical,

  'urn:bbc:sportsdata:football:team:heart-of-midlothian': HeartOfMidlothian,
  '1hcbcuu846pa3iw6qskiws1cu': HeartOfMidlothian,
  'urn:bbc:sportsdata:football:team:heart-of-midlothian-women': HeartOfMidlothian,

  'urn:bbc:sportsdata:football:team:hibernian': Hibernian,
  'urn:bbc:sportsdata:football:team:hibernian-women': Hibernian,
  c9ky1957qli8v2lylfga7io8b: Hibernian,

  'urn:bbc:sportsdata:football:team:inverness-caledonian-thistle': InvernessCaledonianThistle,

  'urn:bbc:sportsdata:football:team:kelty-hearts': KeltyHearts,

  'urn:bbc:sportsdata:football:team:kilmarnock': Kilmarnock,
  enzoyc121va61wtmjf4cm7p3d: Kilmarnock,

  'urn:bbc:sportsdata:football:team:livingston': Livingston,
  besu5lkqmra07drq1czpr0tk4: Livingston,

  'urn:bbc:sportsdata:football:team:montrose': Montrose,
  'urn:bbc:sportsdata:football:team:montrose-women': Montrose,

  'urn:bbc:sportsdata:football:team:motherwell': Motherwell,
  'urn:bbc:sportsdata:football:team:motherwell-women': Motherwell,
  '759fhii7hsnldanli06j5jmf6': Motherwell,

  'urn:bbc:sportsdata:football:team:partick-thistle': PartickThistle,
  'urn:bbc:sportsdata:football:team:partick-thistle-women': PartickThistle,

  'urn:bbc:sportsdata:football:team:peterhead': Peterhead,

  'urn:bbc:sportsdata:football:team:queen-of-the-south': QueenOfTheSouth,

  'urn:bbc:sportsdata:football:team:queens-park': QueensPark,
  'urn:bbc:sportsdata:football:team:queens-park-women': QueensPark,

  'urn:bbc:sportsdata:football:team:raith-rovers': RaithRovers,

  'urn:bbc:sportsdata:football:team:rangers': Rangers,
  'urn:bbc:sportsdata:football:team:rangers-women': Rangers,
  cnnku8uihko7u4th0fms4pvg6: Rangers,

  'urn:bbc:sportsdata:football:team:ross-county': RossCounty,
  '87coxipr6ls77tnlba3eselx0': RossCounty,

  'urn:bbc:sportsdata:football:team:st-johnstone': StJohnstone,
  ez46dadmx0virt38cgeq2n6pf: StJohnstone,

  'urn:bbc:sportsdata:football:team:st-mirren': StMirren,
  muo4d1nfi1vgyvz5n07tjmoo: StMirren,

  'urn:bbc:sportsdata:football:team:stenhousemuir': Stenhousemuir,

  'urn:bbc:sportsdata:football:team:stirling-albion': StirlingAlbion,

  'urn:bbc:sportsdata:football:team:stranraer': Stranraer,

  'urn:bbc:sportsdata:football:team:the-spartans': TheSpartans,
  'urn:bbc:sportsdata:football:team:the-spartans-women': TheSpartans
};

export default map;
