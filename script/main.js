/*
	___  ___  _  _____ ___  ___  ___ ___ ___    ___ ___ 
	| _ \/ _ \| |/ / __|   \| _ \/ _ \_ _|   \  | _ \ __|
	|  _/ (_) | ' <| _|| |) |   / (_) | || |) | |  _/ _| 
	|_|  \___/|_|\_\___|___/|_|_\\___/___|___/  |_| |___|
														
	© SparkDevs - All Rights Reserved.
	
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
 
 var Android = function(){}
 
 var Import = function(pkg,name){
	eval("Android."+name+" = "+pkg+";");
 }
 


 
 
 
/*
 *
 * POKEMON CLASSES
 *
 */
 
 var PokemonDatabase = null;
 
 var PokemonRenderers = {};
 
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
	for(var i=0;i<PokemonDatabase.pokemon.length-1;i++){
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
	return PokemonRenderers["Pikachu"];
 }
 DatabaseManager.getTextureForID = function(id){
	var tex = DatabaseManager.getDataByID(id).texture;
	return "pokemon/Pikachu.png";
 }
 
 DatabaseManager.getLoadedIDs = function(){
	var lids = [];
	for(var i=0;i<PokemonDatabase.pokemon.length-1;i++){
		lids.push(PokemonDatabase.pokemon[i].national_id);
	}
	return lids;
 }
 
 DatabaseManager.init = function(){
	var dataStr = new java.lang.String( ModPE.getBytesFromTexturePack("images/data.json"))+"";
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
 
 
 var loaded = false;
 
 
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
		s.nId = DatabaseManager.getLoadedIDs()[getRandom(0,DatabaseManager.getLoadedIDs().length-1)];
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
	
	
	clientMessage(ChatColor.RED+"Poke"+ChatColor.WHITE+"DroidPE "+ChatColor.GRAY+" by "+ChatColor.BLUE+"SparkDevs\n"+ChatColor.GRAY+"Do not copy/distribute without permission.");
	MCGUI.uiThread(function(){
			var windo = MCGUI.createWindow();
			var layout = MCGUI.createRootLayout(windo);
			var btn = MCGUI.Button();
			btn.setText("CLICK ME");
			layout.addView(btn);
			windo.setContentView(layout);
			windo.showAtLocation(Context.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
		});
	
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
	eval( new java.lang.String( ModPE.getBytesFromTexturePack("images/models.js"))+"" );

		
		
	
 }
 
 function modTick(){
	if(!loaded){
		
	}
	
 }
 
 
 
 
 /*
 *
 * MC-GUI
 *
 */
 
 var MCGUI = function(){}
 
 MCGUI.Resources = function(){}
 
 MCGUI.ninePatchToDrawable = function(bitmap){
	if(!android.graphics.NinePatch.isNinePatchChunk(bitmap.getNinePatchChunk())){
		ModPE.log("Bitmap is not nine patch.");
		
		return new android.graphics.drawable.BitmapDrawable(bitmap);
	}
	var np = new android.graphics.NinePatch(bitmap, bitmap.getNinePatchChunk(),null);
	ModPE.log("NinePatch is null: " + ((np==null) ? "true" : "false"));
    var npd = new android.graphics.drawable.NinePatchDrawable(np);
	ModPE.log("NinePatchDrawable is null: " + ((npd==null) ? "true" : "false"));
    
	return npd;
 }
 
 MCGUI.uiThread = function(code){
	Context.runOnUiThread(new java.lang.Runnable( { run: function() {
		try {
			code();
		}catch(problem){ 
			clientMessage("Error in UI Thread: " + problem)
			print("Error in UI Thread: " + problem);
			ModPE.log("Error in UI Thread: " + problem);
		}
	}}));
 }
 
 var buttonNormalDrawable;
 var buttonPressedDrawable;
 
 MCGUI.fetchResources = function(){
	var btnN = ModPE.getBytesFromTexturePack("images/gui/button_normal.9.png");
	ModPE.log("Loading resource: "+ btnN.length);
	
	var btnNb = android.graphics.BitmapFactory.decodeByteArray(btnN,0,btnN.length);
	ModPE.log("Bitmap is null: " + ((btnNb==null) ? "true" : "false"));
	
	buttonNormalDrawable = MCGUI.ninePatchToDrawable(btnNb);
	
	
	var btnP = ModPE.getBytesFromTexturePack("images/gui/button_pressed.9.png");
	ModPE.log("Loading resource: "+ btnN.length);
	
	var btnPb = android.graphics.BitmapFactory.decodeByteArray(btnP,0,btnP.length);
	ModPE.log("Bitmap is null: " + ((btnPb==null) ? "true" : "false"));
	
	buttonPressedDrawable = MCGUI.ninePatchToDrawable(btnPb);
	
	
 }
 MCGUI.Button = function(){
	var b = new android.widget.Button(Context);
	b.setTextSize(14);
	b.setTag(false);
	b.setSoundEffectsEnabled(false);
	b.setGravity(android.view.Gravity.CENTER);
	b.setOnTouchListener(new android.view.View.OnTouchListener()
	{
		onTouch: function(v, motionEvent)
		{
			var action = motionEvent.getActionMasked();
			if(action == android.view.MotionEvent.ACTION_DOWN)
			{
				MCGUI.setBackground(b,buttonPressedDrawable);
				b.setTextColor(android.graphics.Color.WHITE);
			}
			if(action == android.view.MotionEvent.ACTION_CANCEL || action == android.view.MotionEvent.ACTION_UP)
			{
				b.setTag(false);
				MCGUI.setBackground(b,buttonNormalDrawable);
				b.setTextColor(android.graphics.Color.parseColor("#4c4c4c"));
				
				var rect = new android.graphics.Rect(v.getLeft(), v.getTop(), v.getRight(), v.getBottom());
				if(rect.contains(v.getLeft() + motionEvent.getX(), v.getTop() + motionEvent.getY()))
				{
					
				}
			}
			if(action == android.view.MotionEvent.ACTION_MOVE)
			{
				var rect = new android.graphics.Rect(v.getLeft(), v.getTop(), v.getRight(), v.getBottom());
				if(rect.contains(v.getLeft() + motionEvent.getX(), v.getTop() + motionEvent.getY()))
				{
					if(v.getTag() == false)
					{
						b.setTag(true);
						MCGUI.setBackground(b,buttonPressedDrawable);
						b.setTextColor(android.graphics.Color.WHITE);
					}
				} else
				{
					if(v.getTag() == true)
					{
						b.setTag(false);
						MCGUI.setBackground(b,buttonNormalDrawable);
						b.setTextColor(android.graphics.Color.parseColor("#4c4c4c"));
					}
				}
			}

			return false;
		}
	});
	
	MCGUI.setBackground(b,buttonNormalDrawable);
	b.setTextColor(android.graphics.Color.parseColor("#4c4c4c"));

	
				
	return b;
 }
 
 MCGUI.setBackground = function(v,d){
	ModPE.log("SetBackground: "+(d==null));
    if (android.os.Build.VERSION.SDK_INT >= 16)
		v.setBackground(d);
	else
		v.setBackgroundDrawable(d);
 }
 
 MCGUI.createWindow = function(){
	var pw = new android.widget.PopupWindow();
	pw.setWidth(android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
	pw.setHeight(android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
	return pw;
 }
 
 MCGUI.createRootLayout = function(pw){
	var layout = new android.widget.RelativeLayout(Context);
	
	
	return layout;
 }

 new java.lang.Thread(new java.lang.Runnable()
{
	run: function()
	{
		try
		{
			DatabaseManager.init();
			MCGUI.fetchResources();
		} catch(e)
		{
			MCPE.log("Error " + e);
		}
	}
}).start();
 