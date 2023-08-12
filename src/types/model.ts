export type Page = "Search" | "Add" | "Update"
export type Suite = 'Junior' | 'Deluxe' | 'Executive' | 'Terrace' | 'Residential'
export type Extras = 'ExtraBreakfast' | 'ExtraTV' | 'ExtraWiFi' | 'ExtraParking' | 'ExtraBalcony'
export type Payment = 'Credit Card' | 'PayPal' | 'Cash' | 'Bitcoin'
export type State =
  | 'Alberta'
  | 'BritishColumbia'
  | 'Manitoba'
  | 'NewBrunswick'
  | 'NewfoundlandandLabrador'
  | 'NorthwestTerritories'
  | 'NovaScotia'
  | 'Nunavut'
  | 'Ontario'
  | 'PrinceEdwardIsland'
  | 'Quebec'
  | 'Saskatchewan'
  | 'Yukon'

export type City =
  | 'Barrie'
  | 'Belleville'
  | 'Brampton'
  | 'Brantford'
  | 'Brockville'
  | 'Burlington'
  | 'Cambridge'
  | 'Chatham'
  | 'Chatham-Kent'
  | 'Cornwall'
  | 'Elliot Lake'
  | 'Etobicoke'
  | 'Fort Erie'
  | 'Fort Frances'
  | 'Gananoque'
  | 'Guelph'
  | 'Hamilton'
  | 'Iroquois Falls'
  | 'Kapuskasing'
  | 'Kawartha Lakes'
  | 'Kenora'
  | 'Kingston'
  | 'Kirkland Lake'
  | 'Kitchener'
  | 'Laurentian Hills'
  | 'London'
  | 'Midland'
  | 'Mississauga'
  | 'Moose Factory'
  | 'Moosonee'
  | 'Niagara Falls'
  | 'Niagara-on-the-Lake'
  | 'North Bay'
  | 'North York'
  | 'Oakville'
  | 'Orillia'
  | 'Oshawa'
  | 'Ottawa'
  | 'Parry Sound'
  | 'Perth'
  | 'Peterborough'
  | 'Picton'
  | 'Port Colborne'
  | 'Saint Catharines'
  | 'Saint Thomas'
  | 'Sarnia-Clearwater'
  | 'Sault Sainte Marie'
  | 'Scarborough'
  | 'Simcoe'
  | 'Stratford'
  | 'Sudbury'
  | 'Temiskaming Shores'
  | 'Thorold'
  | 'Thunder Bay'
  | 'Timmins'
  | 'Toronto'
  | 'Trenton'
  | 'Waterloo'
  | 'Welland'
  | 'West Nipissing'
  | 'Windsor'
  | 'Woodstock'
  | 'York'
  | 'Borden'
  | 'Cavendish'
  | 'Charlottetown'
  | 'Souris'
  | 'Summerside'
  | 'Asbestos'
  | 'Baie-Comeau'
  | 'Beloeil'
  | 'Cap-de-la-Madeleine'
  | 'Chambly'
  | 'Charlesbourg'
  | 'Châteauguay'
  | 'Chibougamau'
  | 'Côte-Saint-Luc'
  | 'Dorval'
  | 'Gaspé'
  | 'Gatineau'
  | 'Granby'
  | 'Havre-Saint-Pierre'
  | 'Hull'
  | 'Jonquière'
  | 'Kuujjuaq'
  | 'La Salle'
  | 'La Tuque'
  | 'Lachine'
  | 'Laval'
  | 'Lévis'
  | 'Longueuil'
  | 'Magog'
  | 'Matane'
  | 'Montreal'
  | 'Montréal-Nord'
  | 'Percé'
  | 'Port-Cartier'
  | 'Quebec'
  | 'Rimouski'
  | 'Rouyn-Noranda'
  | 'Saguenay'
  | 'Saint-Eustache'
  | 'Saint-Hubert'
  | 'Sainte-Anne-de-Beaupré'
  | 'Sainte-Foy'
  | 'Sainte-Thérèse'
  | 'Sept-Îles'
  | 'Sherbrooke'
  | 'Sorel-Tracy'
  | 'Trois-Rivières'
  | 'Val-d’Or'
  | 'Waskaganish'
  | 'Batoche'
  | 'Cumberland House'
  | 'Estevan'
  | 'Flin Flon'
  | 'Moose Jaw'
  | 'Prince Albert'
  | 'Regina'
  | 'Saskatoon'
  | 'Uranium City'
  | 'Dawson'
  | 'Watson Lake'
  | 'Whitehorse'
  | 'Brandon'
  | 'Churchill'
  | 'Dauphin'
  | 'Flin Flon'
  | 'Kildonan'
  | 'Saint Boniface'
  | 'Swan River'
  | 'Thompson'
  | 'Winnipeg'
  | 'York Factory'
  | 'Barkerville'
  | 'Burnaby'
  | 'Campbell River'
  | 'Chilliwack'
  | 'Courtenay'
  | 'Cranbrook'
  | 'Dawson Creek'
  | 'Delta'
  | 'Esquimalt'
  | 'Fort Saint James'
  | 'Fort Saint John'
  | 'Hope'
  | 'Kamloops'
  | 'Kelowna'
  | 'Kimberley'
  | 'Kitimat'
  | 'Langley'
  | 'Nanaimo'
  | 'Nelson'
  | 'New Westminster'
  | 'North Vancouver'
  | 'Oak Bay'
  | 'Penticton'
  | 'Powell River'
  | 'Prince George'
  | 'Prince Rupert'
  | 'Quesnel'
  | 'Revelstoke'
  | 'Rossland'
  | 'Trail'
  | 'Vancouver'
  | 'Vernon'
  | 'Victoria'
  | 'West Vancouver'
  | 'White Rock'
  | 'Banff'
  | 'Brooks'
  | 'Calgary'
  | 'Edmonton'
  | 'Fort McMurray'
  | 'Grande Prairie'
  | 'Jasper'
  | 'Lake Louise'
  | 'Lethbridge'
  | 'Medicine Hat'
  | 'Red Deer'
  | 'Saint Albert'
  | 'Bathurst'
  | 'Caraquet'
  | 'Dalhousie'
  | 'Fredericton'
  | 'Miramichi'
  | 'Moncton'
  | 'Saint John'
  | 'Argentia'
  | 'Bonavista'
  | 'Channel-Port aux Basques'
  | 'Corner Brook'
  | 'Ferryland'
  | 'Gander'
  | 'Grand Falls–Windsor'
  | 'Happy Valley–Goose Bay'
  | 'Harbour Grace'
  | 'Labrador City'
  | 'Placentia'
  | 'Saint Anthony'
  | 'St. John’s'
  | 'Wabana'
  | 'Fort Smith'
  | 'Hay River'
  | 'Inuvik'
  | 'Tuktoyaktuk'
  | 'Yellowknife'
  | 'Baddeck'
  | 'Digby'
  | 'Glace Bay'
  | 'Halifax'
  | 'Liverpool'
  | 'Louisbourg'
  | 'Lunenburg'
  | 'Pictou'
  | 'Port Hawkesbury'
  | 'Springhill'
  | 'Sydney'
  | 'Yarmouth'
  | 'Iqaluit'
  | 'Bancroft'

export type Cities = { [key in State]: City[] }

export type Stay = {
  arrivalDate?: string
  departureDate?: string
}

export type Room = {
  roomSize?: Suite
  roomQuantity?: number
}

export type AddressStreet = {
  streetName?: string
  streetNumber?: string
}

export type AddressLocation = {
  zipCode?: string
  state?: string
  city?: City
}

export type Address = {
  addressStreet?: AddressStreet
  addressLocation?: AddressLocation
}

export type HotelReservation = {
  id: number
  stay: Stay
  room: Room
  firstName: string
  lastName: string
  email: string
  phone: string
  address: Address
  extras?: Extras[]
  payment?: Payment
  note?: string
  tags?: string[]
  reminder?: boolean
  newsletter?: boolean
  confirm: boolean
}

export type HotelReservationWithoutId = Omit<HotelReservation, "id">;

export type PickByValue<Type, Values> = {
  [Key in keyof Type as Type[Key] extends undefined
    ? never
    : Type[Key] extends Values | undefined
    ? Key
    : never]: Type[Key]
}
