/*
	___  ___  _  _____ ___  ___  ___ ___ ___    ___ ___ 
	| _ \/ _ \| |/ / __|   \| _ \/ _ \_ _|   \  | _ \ __|
	|  _/ (_) | ' <| _|| |) |   / (_) | || |) | |  _/ _| 
	|_|  \___/|_|\_\___|___/|_|_\\___/___|___/  |_| |___|
														
	� SparkDevs - All Rights Reserved.
	
	POKEDROID PE 0.1 BETA
	
	
	You may not use/modify/share any code here without permission.
*/

/*
 *
 * MOD CONSTANTS
 *
 */
 
 const VERSION = 0.1;
 const BUILD = "DEV";

/*
 *
 * JAVA CLASS LOADING
 *
 */
 
 var Context = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
 var metrics = new android.util.DisplayMetrics();
 Context.getWindowManager().getDefaultDisplay().getMetrics(metrics);
 
 var File = java.io.File;
 
 
 var Display = function(){
	Display.HEIGHT = metrics.heightPixels;
	Display.WIDTH = metrics.widthPixels;
 };
 
 
 
 
 
/*
 *
 * POKEMON CLASSES
 *
 */
 
 var PokemonDatabase = null;
 
 var spawnedPokemon = [];
 
 var SpawnedPokemon = function(){
	
	this.nId = 1;
	this.maxHP = 100;
	this.hp = this.maxHP;
	
	this.attachToEntity = function (ent){
		this.entity = ent;
		this.sync();
	}
	this.sync = function(){
		
		if(this.nametag!=null){
			Entity.setNameTag(this.entity,"[Wild] "+this.nametag);
		}else{
			Entity.setNameTag(this.entity,"[Wild] "+DatabaseManager.getDataByID(this.nId).name);
		}
		Entity.setHealth(this.entity,999999);
		Entity.setRenderType(this.entity,this.getRenderer());
		Entity.setMobSkin(this.entity,this.getTexture());
		Entity.setExtraData(this.entity,"sparkdevs.pokedroid.pokemonId",this.nId);
	}
	
	this.getRenderer = function(){
		return DatabaseManager.getRendererForID(this.nId);
	}
	
	this.getTexture = function(){
		return DatabaseManager.getTextureForID(this.nId);
	}
	
	this.setNameTag = function(tag){
		this.nametag = tag;
		this.sync();
	}
	
	this.setHP = function(hp){
		this.hp = hp;
		this.sync();
	}
	
	this.setMaxHP = function(maxHP){
		this.maxHP = maxHP;
		this.sync();
	}
	
	this.setNameTag = function(tag){
		this.nametag = tag;
		this.sync();
	}
	
	this.setID = function(id){
		this.nId = id;
		this.sync();
	}
	
 }
 
 
 var PartyPokemon = function(id){
	this.nId = id;
	this.isOutside = false;
	this.hp = 100;
	this.maxHP = 100;
	this.nick = null;
	this.entity = null;
	
	this.sync = function(){
		
		if(this.nick!=null){
			Entity.setNameTag(this.entity,"["+Player.getName(getPlayerEnt())+"]"+this.nick);
		}else{
			Entity.setNameTag(this.entity,"["+Player.getName(getPlayerEnt())+"] "+DatabaseManager.getDataByID(this.nId).name);
		}
		Entity.setHealth(this.entity,999999);
		Entity.setRenderType(this.entity,this.getRenderer());
		Entity.setMobSkin(this.entity,this.getTexture());
		
		Entity.setExtraData(this.entity,"sparkdevs.pokedroid.pokemonId",this.nId);
		Entity.setExtraData(this.entity,"sparkdevs.pokedroid.isTamed",true);
	}
	
	this.spawn = function(x,y,z){
		this.entity = Level.spawnMob(x,y,z,10);
		this.sync();
		return this.entity;
		
	}
	this.getRenderer = function(){
		return DatabaseManager.getRendererForID(this.nId);
	}
	this.getTexture = function(){
		return DatabaseManager.getTextureForID(this.nId);
	}
 }
 
 
/*
 *
 * DatabaseManager
 *
 */

 var DatabaseManager = function(){}
 
 DatabaseManager.getDataByID = function(id){
	for(var i=0;i<PokemonDatabase.pokemon.length;i++){
		if(PokemonDatabase.pokemon[i].national_id==id){
			return PokemonDatabase.pokemon[i];
		}
	}
 }
 
 DatabaseManager.getRendererForID = function(id){
	/*var model = eval(DatabaseManager.getDataByID(id).model);
	var renderer = null;
	if(model==null) renderer = PikachuRenderer.renderType;
	else renderer = model.renderType;*/
	return PikachuRenderer.renderType;
 }
 DatabaseManager.getTextureForID = function(id){
	var tex = DatabaseManager.getDataByID(id).texture;
	return "pokemon/Pikachu.png";
 }
 
 DatabaseManager.getLoadedIDs = function(){
	var lids = [];
	for(var i=0;i<PokemonDatabase.pokemon.length;i++){
		lids.push(PokemonDatabase.pokemon[i].national_id);
	}
	return lids;
 }
 
 DatabaseManager.init = function(){
	var dataStr = IOUtils.readFile(new File(android.os.Environment.getExternalStorageDirectory(),"PokeDroidPE/data.json"));
	PokemonDatabase = JSON.parse(dataStr);
		
 }
 
 var IOUtils = function(){}
 
 IOUtils.readFile = function(p){
	var filelo = p;
	var txt = new java.lang.StringBuilder();
	try {
		var br = new java.io.BufferedReader(new java.io.FileReader(p));
		var line;
		while ((line = br.readLine()) != null) {
			txt.append(line);
			txt.append('\n');
		}
		br.close();
	}catch(err){
		return null;
	}
	return txt;
 }
 
 
 
 /*
 *
 * POKEMON UTIL FUNCTIONS
 *
 */
 
 Entity.isPokemon = function(ent){
	var data = Entity.getExtraData(ent,"sparkdevs.pokedroid.pokemonId");
	if(data==null || data==""){
		return false;
	}
	return true;
 }
 
 SpawnedPokemon.getByEntity = function(ent){
	for(var i=0;i<spawnedPokemon.length;i++){
		if(spawnedPokemon[i].entity==ent){
			return spawnedPokemon[i];
		}
	}
 }
 
 
 
 /*
 *
 * ITEM MANAGERS
 *
 */
 
 
 Item.isPokeball = function(id){
	if(id>=700 && id<=703) return true;
	return false;
 }
 
 Item.isPotion = function(id){
	if(id>=710 && id<=715) return true;
	return false;
 }
 
 
 var PokeBallItem = function(id,multiplier){
	this.id = id;
	this.multiplier = multiplier;
	this.register = function(texture,name){
		ModPE.setItem(id, texture, 0, name);
		this.texture = texture;
		this.name = name;
		Player.addItemCreativeInv(id,1,0);
		return this;
	}
 }
 
 

 var PotionItem = function(id,points){
	this.id = id;
	this.points = points;
	this.register = function(texture,name){
		ModPE.setItem(id, texture, 0, name);
		this.texture = texture;
		this.name = name;
		Player.addItemCreativeInv(id,1,0);
		return this;
	}
 }
 
 var PokeBallType = {
	POKE_BALL: 700,
	GREAT_BALL: 701,
	UTRA_BALL: 702,
	MASTER_BALL: 703
 }
 
 var PotionType = {
	POTION: 710
 }
 
 
 
 
/*
 *
 * ITEM AND BLOCK DEFINITION
 *
 */
 
 

 var ItemPokeball = new PokeBallItem(PokeBallType.POKE_BALL,1).register("pokeball","Poke Ball");
 var ItemGreatball = new PokeBallItem(PokeBallType.GREAT_BALL,1.5).register("greatball","Great Ball");
 var ItemUltraball = new PokeBallItem(PokeBallType.ULTRA_BALL,2).register("ultraball","Ultra Ball");
 
 var ItemPotion = new PotionItem(710,20).register("potion","Potion");
 
 
 
 
/*
 *
 * UTILITY FUNCTIONS
 *
 */
 
 
 function playSound(mName){
	var file = new java.io.File(path+"res/sounds/"+mName);
	MediaPlayer.reset();
	if(file.exists()){
		MediaPlayer.setDataSource(path+"res/sounds/"+mName);
		MediaPlayer.prepare();
		MediaPlayer.start();
	}
}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
 
 
/*
 *
 * HOOKS
 *
 */
 
 
 function getRandom(min,max){
	max=max-min + 1;
	var toReturn = Math.floor((Math.random()*max)+min);
	return toReturn;
 }
 
 
 function modTick(){
	var ent = Player.getPointedEntity();
	if(Entity.isPokemon(ent)){
		var sp = SpawnedPokemon.getByEntity(ent);
		ModPE.showTipMessage(sp.hp+"/"+sp.maxHP);
	}
 }
 
 function useItem(x, y, z, itemId, blockId, side, itemDamage, blockDamage) {
	if(itemId==280){
		var p = Level.spawnMob(x,y+2,z,11);
		var s = new SpawnedPokemon();
		s.nId = getRandom(0,DatabaseManager.getLoadedIDs()[DatabaseManager.getLoadedIDs().length-1]);
		s.attachToEntity(p);
		spawnedPokemon.push(s);
	}
    
 }
 
 function attackHook(a,v){
	
	if(Entity.isPokemon(v)){
		preventDefault();
		var sp = SpawnedPokemon.getByEntity(v);
		if(Item.isPotion(getCarriedItem())){
			if(getCarriedItem()==PotionType.POTION){
				sp.hp+=ItemPotion.points;
				if(sp.hp>sp.maxHP) sp.hp = sp.maxHP;
			}
		}
		if(sp.hp>=2) sp.hp-=2;
	}
 }
 
 function newLevel(){
	
	DatabaseManager.init();
	clientMessage(ChatColor.RED+"Poke"+ChatColor.WHITE+"DroidPE "+ChatColor.GRAY+" by "+ChatColor.BLUE+"SparkDevs\n"+ChatColor.GRAY+"Do not copy/distribute without permission.");
 }
 
 function leaveGame(){
	
	
	var es = Entity.getAll();
	for(var i=0;i<=es.length;i++){
		var d = Entity.getExtraData(es[i],"sparkdevs.pokedroid.pokemonId");
		if(d!=null && d!="") Entity.remove(es[i]);
	}
	spawnedPokemon = [];
 }
 
 function selectLevelHook(){
	ModPE.langEdit("progressScreen.generating","PokeDroid PE: Loading Pokemon");
 }
 
 
 /*
 *
 * MODELS
 *
 */
 
function addPikachuRenderer(renderer){

var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var leftArm = model.getPart("leftArm");
var rightArm = model.getPart("rightArm");
var leftLeg = model.getPart("leftLeg");
var rightLeg = model.getPart("rightLeg");


head.clear();
body.clear();
leftArm.clear();
rightArm.clear();
leftLeg.clear();
rightLeg.clear();

//head
body.setTextureOffset(0,0);
body.addBox(-5,11,-4,6,5,5);

//body
body.setTextureOffset(23,0);
body.addBox(-5,16,-3,6,7,4);

//arms
body.setTextureOffset(44,0);
body.addBox(-5,17,-4,1,2,1);
body.addBox(0,17,-4,1,2,1);

//ears
//left ear
body.setTextureOffset(49,0);
body.addBox(0,10,-2,1,1,1);
body.setTextureOffset(54,0);
body.addBox(1,9.7,-2,2,1,1);

//right ear
body.setTextureOffset(49,0);
body.addBox(-5,10,-2,1,1,1);
body.setTextureOffset(44,4);
body.addBox(-5.6,8.3,-2,1,2,1);

//tail
body.setTextureOffset(49,4);
body.addBox(-2.5,20,1,1,2,1);

body.setTextureOffset(54,4);
body.addBox(-2.5,19,2,1,2,1);

body.setTextureOffset(44,8);
body.addBox(-2.5,17,3,1,4,1);

body.setTextureOffset(49,8);
body.addBox(-2.5,13,4,1,7,1);

body.setTextureOffset(54,8);
body.addBox(-2.5,13,5,1,6,1);

body.setTextureOffset(60,8);
body.addBox(-2.5,13,6,1,5,1);

//right leg
rightLeg.setTextureOffset(0,11);
rightLeg.addBox(-3,11,-4,2,1,3);

//left leg
leftLeg.setTextureOffset(0,11);
leftLeg.addBox(-3,11,-4,2,1,3);
}
var PikachuRenderer = Renderer.createHumanoidRenderer();
addPikachuRenderer(PikachuRenderer);
 