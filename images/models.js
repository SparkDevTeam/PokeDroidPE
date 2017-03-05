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
PokemonRenderers["Pikachu"] = addPikachuRenderer(Renderer.createHumanoidRenderer()).renderType;


function addDittoRenderer(renderer){
var model = renderer.getModel();
var head = model.getPart("head").clear();
var body = model.getPart("body").clear();
var rArm = model.getPart("rightArm").clear();
var lArm = model.getPart("leftArm").clear();
var rLeg = model.getPart("rightLeg").clear();
var lLeg = model.getPart("leftLeg").clear();

body.setTextureOffset( 30, 0);
body.addBox(-4,22,-1, 8, 2, 3);

body.setTextureOffset( 30, 0);
body.addBox(-3,21,-1, 6, 1, 3);

body.setTextureOffset( 30, 0);
body.addBox(-4,20,-1, 8, 1, 3);

body.setTextureOffset( 0, 0);
body.addBox(-3,18,-1, 6, 2, 3);

body.setTextureOffset( 30, 0);
body.addBox(-2,17,-1, 4, 1, 3);

body.setTextureOffset( 30, 0);
body.addBox(-3,23,-3, 6, 1, 2);

body.setTextureOffset( 30, 0);
body.addBox(-3,23,2, 6, 1, 2);

body.setTextureOffset( 30, 0);
body.addBox(-3,22,-2, 6, 1, 1);

body.setTextureOffset( 30, 0);
body.addBox(-3,22,2, 6, 1, 1);

}

PokemonRenderers["Ditto"] = addDittoRenderer(Renderer.createHumanoidRenderer()).renderType;