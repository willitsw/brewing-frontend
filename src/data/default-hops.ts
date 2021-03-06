interface DefaultHops {
  name: string;
  alpha: number;
}

const defaultHops: DefaultHops[] = [
  { name: "Ahtanum", alpha: 6 },
  { name: "Amarillo", alpha: 9.5 },
  { name: "Apollo", alpha: 19.5 },
  { name: "Aquila", alpha: 6.7 },
  { name: "Australian Ella", alpha: 15 },
  { name: "Australian Galaxy", alpha: 13.5 },
  { name: "Australian Helga", alpha: 6 },
  { name: "Australian Pride Of Ringwood", alpha: 9.5 },
  { name: "Australian Summer", alpha: 6 },
  { name: "Australian Super Pride", alpha: 14 },
  { name: "Australian Sylva", alpha: 6 },
  { name: "Australian Topaz", alpha: 15 },
  { name: "Australian Vic Secret", alpha: 15.5 },
  { name: "Belma", alpha: 12.1 },
  { name: "Bitter Gold", alpha: 17 },
  { name: "Bravo", alpha: 15.5 },
  { name: "Brewer's Gold", alpha: 9 },
  { name: "Bullion", alpha: 9 },
  { name: "Calypso", alpha: 11 },
  { name: "Cascade", alpha: 6 },
  { name: "Cashmere", alpha: 8.5 },
  { name: "Centennial", alpha: 10.5 },
  { name: "Chelan", alpha: 13.3 },
  { name: "Chinook", alpha: 13 },
  { name: "Citra", alpha: 12 },
  { name: "Cluster", alpha: 7 },
  { name: "Columbia", alpha: 9 },
  { name: "Columbus", alpha: 15 },
  { name: "Comet", alpha: 10 },
  { name: "Crystal", alpha: 4.5 },
  { name: "Czech Premiant", alpha: 9 },
  { name: "Czech Saaz", alpha: 3.5 },
  { name: "Czech Sladek", alpha: 7 },
  { name: "El Dorado", alpha: 15 },
  { name: "Equinox", alpha: 15 },
  { name: "Eroica", alpha: 11 },
  { name: "Falconer’s Flight", alpha: 11 },
  { name: "French Aramis", alpha: 8 },
  { name: "French Strisselpalt", alpha: 2 },
  { name: "French Triskel", alpha: 2.5 },
  { name: "Fuggle", alpha: 4.7 },
  { name: "Galena", alpha: 13 },
  { name: "German Brewer's Gold", alpha: 7 },
  { name: "German Emerald", alpha: 5 },
  { name: "German Hallertau Blanc", alpha: 10.5 },
  { name: "German Hallertau Mittelfrüh", alpha: 4.3 },
  { name: "German Hallertauer Gold", alpha: 6.2 },
  { name: "German Herkules", alpha: 14.5 },
  { name: "German Hersbruker", alpha: 3.5 },
  { name: "German Hull Melon", alpha: 7.2 },
  { name: "German Magnum", alpha: 13.5 },
  { name: "German Mandarina Bavaria", alpha: 8.5 },
  { name: "German Merkur", alpha: 13.5 },
  { name: "German Northern Brewer", alpha: 8.5 },
  { name: "German Opal", alpha: 6.5 },
  { name: "German Perle", alpha: 8 },
  { name: "German Polaris", alpha: 20.5 },
  { name: "German Saphir", alpha: 3.2 },
  { name: "German Spalt Select", alpha: 5 },
  { name: "German Spalt", alpha: 4 },
  { name: "German Taurus", alpha: 14.5 },
  { name: "German Tettnanger", alpha: 4.5 },
  { name: "German Tradition", alpha: 6 },
  { name: "Glacier", alpha: 5.5 },
  { name: "Golding", alpha: 5 },
  { name: "Hallertauer", alpha: 4.5 },
  { name: "Horizon", alpha: 12 },
  { name: "Liberty", alpha: 4 },
  { name: "Magnum", alpha: 12 },
  { name: "Millennium", alpha: 15.5 },
  { name: "Mosaic", alpha: 12.5 },
  { name: "Mt. Hood", alpha: 6 },
  { name: "Mt. Rainier", alpha: 6.5 },
  { name: "New Zealand Cascade", alpha: 7 },
  { name: "New Zealand Dr. Rudi", alpha: 11 },
  { name: "New Zealand Green Bullet", alpha: 12.5 },
  { name: "New Zealand Kohatu", alpha: 3 },
  { name: "New Zealand Motueka", alpha: 7.5 },
  { name: "New Zealand Nelson Sauvin", alpha: 12.5 },
  { name: "New Zealand Pacific Gem", alpha: 14.2 },
  { name: "New Zealand Pacific Jade", alpha: 13 },
  { name: "New Zealand Pacifica", alpha: 5.5 },
  { name: "New Zealand Rakau", alpha: 10.5 },
  { name: "New Zealand Riwaka", alpha: 5.5 },
  { name: "New Zealand Southern Cross", alpha: 12.5 },
  { name: "New Zealand Sticklebract", alpha: 13.6 },
  { name: "New Zealand Super Alpha", alpha: 11 },
  { name: "New Zealand Wai-iti", alpha: 3.4 },
  { name: "New Zealand Waimea", alpha: 17.5 },
  { name: "New Zealand Wakatu", alpha: 7.5 },
  { name: "New Zealand Hallertau", alpha: 7.5 },
  { name: "Newport", alpha: 15 },
  { name: "Northern Brewer", alpha: 9 },
  { name: "Nugget", alpha: 13.3 },
  { name: "Olympic", alpha: 12 },
  { name: "Palisade", alpha: 7.5 },
  { name: "Perle", alpha: 8.2 },
  { name: "Polish Lublin", alpha: 3.8 },
  { name: "Saaz", alpha: 3.8 },
  { name: "Santiam", alpha: 6 },
  { name: "Satus", alpha: 13.2 },
  { name: "Simcoe", alpha: 13 },
  { name: "Sorachi Ace", alpha: 13 },
  { name: "Sterling", alpha: 7.5 },
  { name: "Styrian Aurora", alpha: 8.2 },
  { name: "Styrian Bobek", alpha: 5.2 },
  { name: "Styrian Celeia", alpha: 4.5 },
  { name: "Styrian Golding", alpha: 5.3 },
  { name: "Styrian Savinjski Golding", alpha: 4.2 },
  { name: "Summit", alpha: 17.5 },
  { name: "Sun", alpha: 14 },
  { name: "Tahoma", alpha: 7.7 },
  { name: "Tettnanger", alpha: 4.5 },
  { name: "Tomahawk", alpha: 16 },
  { name: "UK Admiral", alpha: 14.5 },
  { name: "UK Boadicea", alpha: 8.5 },
  { name: "UK Bramling Cross", alpha: 7 },
  { name: "UK Bullion", alpha: 7.8 },
  { name: "UK Challenger", alpha: 8 },
  { name: "UK East Kent Golding", alpha: 5 },
  { name: "UK First Gold", alpha: 7.8 },
  { name: "UK Fuggle", alpha: 4.5 },
  { name: "UK Northdown", alpha: 8.5 },
  { name: "UK Phoenix", alpha: 10 },
  { name: "UK Pilgrim", alpha: 11 },
  { name: "UK Pioneer", alpha: 9.2 },
  { name: "UK Progress", alpha: 6.7 },
  { name: "UK Sovereign", alpha: 5.5 },
  { name: "UK Target", alpha: 11 },
  { name: "UK WGV", alpha: 6.2 },
  { name: "Ultra", alpha: 2.8 },
  { name: "Vanguard", alpha: 5.5 },
  { name: "Warrior", alpha: 16 },
  { name: "Willamette", alpha: 5 },
  { name: "Yakima Cluster", alpha: 7.2 },
  { name: "Zeus", alpha: 15 },
  { name: "Spalt Select", alpha: 4 },
  { name: "German Hallertauer Tradition", alpha: 4.2 },
  { name: "UK Herald", alpha: 12 },
  { name: "Northwest Golding", alpha: 4.5 },
  { name: "UK Kent Golding", alpha: 4.7 },
  { name: "Argentina Cascade", alpha: 4 },
  { name: "Polish Marynka", alpha: 10.5 },
  { name: "German Smaragd", alpha: 5 },
];

export default defaultHops;
