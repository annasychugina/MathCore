import View from "../modules/view";
import Player from "../models/player";
import Socket from "../modules/socket";
import Overplay from "../components/overplay/overplay";
import BABYLON from "../lib/babylon.js";


export default class GamePlayView extends View {
    constructor(options = {}) {
        super(options);
        this._el = document.querySelector('.js-canvas');
        this.init();
        this.show();

//         var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// if (isMobile) {
//   alert ("no play")
// }


        let socket = new Socket();
        let msg = socket.getMessaging();
        this.messaging = socket.getMessaging();

        let engine = new BABYLON.Engine(this._el, true);
        let canvas = this._el;
        let scene = this.createScene(engine, canvas);

        engine.loadingUIText = " Подождите, идет загрузка и поиск игрока ... ";
        engine.loadingUIBackgroundColor = '#1447ab';
        engine.displayLoadingUI();

        this.scene = scene;
        this.engine = engine;

        this.createSkyBox(scene);
        this.gameField = this.createGameField(scene);
        //this.highlight = new BABYLON.HighlightLayer("H1",scene);
        this.player1 = new Player(0, scene, {});
        this.player2 = new Player(1, scene, {});
        this.MovementUnresolved = false;
        this.pirats_picked = false;
        this.ship_picked = false;
        //this.picked = false;

        scene.onPointerDown = this.gameInit.bind(this);

        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
        });

    }

    init(options = {}) {


        let menu = document.querySelector('.js-topmenu');
        //menu.setAttribute('hidden',true);
        menu.style.display="none";
        let video = document.querySelector('.bgvideo');
        //video.hidden = true;
        video.style.display="none";

        this.overplay = new Overplay();
		this.overplay._updateHtml();



        document.addEventListener("StartGame", this.startGame.bind(this));
        document.addEventListener("GetNeighbors", this.getNeighbors.bind(this));
        document.addEventListener("Movement", this.movement.bind(this));
        document.addEventListener("ShipMovement", this.ship_movement.bind(this));
    }

    pause(options = {}){
        let video = document.querySelector('.bgvideo');
        //video.hidden = false;
        video.style.display="block";
        let menu = document.querySelector('.js-topmenu');
        //menu.hidden = false;
        menu.style.display="block";
        this.hide();
    }

    startGame(evt){
        this.engine.loadingUIText = " Соперник найден! ";
        this.gameCellIds = evt.content.gameBoard;
        console.log("GameBoard:");
        console.log(this.gameCellIds);
        if(evt.content.active){
            this.Player = this.player1;
            this.Enemy = this.player2;
        }
        else{
            this.Player = this.player2;
            this.Enemy = this.player1;
        }

        this.pirats = this.Player.get_pirats();
        this.ship = this.Player.get_ship(undefined);
        this.messaging.sendPingMessage();
        this.engine.hideLoadingUI();
        this.overplay._el.removeAttribute("hidden");
        let scene = document.querySelector('.js-game');
        scene.style.display = "block";
    }

    getNeighbors(evt){
        this.neighbors = evt.content.neighbors;
        console.log(this.neighbors);
        for(let j = 0; j < this.neighbors.length; j++){
            this.gameField.subMeshes[this.neighbors[j]].materialIndex = 0;
        }
    }

    ship_movement(evt){
        this.ship = this.Player.get_ship(this.ship);
        console.log(evt.content);
        if(evt.content.active){
            this.ship.forEach(function(mesh){
                mesh.isPickable = true;
            });
            let sailors = this.Player.get_pirats_on_ship();
            for(let i = 0; i < 3; i++){
                if(sailors.indexOf(i) === -1){
                    this.pirats[i].isPickable = true;
                }
            }
        }
        let movement = JSON.parse(evt.content.movements)[0];
        console.log("движение, которое мы исполням "+ movement);
        let shipOwner;
        if(this.Enemy.get_index() === movement.playerIngameId){
            shipOwner = this.Enemy;
        }
        else{
            this.targetCellIndex = movement.targetCellIndex;
            shipOwner = this.Player;
        }


        let posx = movement.playerIngameId === 0 ? 0.1 : -0.2 ; //?
        let posz = movement.playerIngameId === 0 ? 0.2 :  0.8 ; //?
        let x = - (6 - movement.targetCellIndex%13 + posx)*(1200/13);
        let z = - (6 - movement.targetCellIndex/13 + posz)*(1200/13);
        let y = 40;

        shipOwner.set_ship_position(new BABYLON.Vector3(x,y,z));

        if(this.targetCellIndex != undefined){
            shipOwner.set_ship_location(this.targetCellIndex);
            let ids = this.Player.get_ids();
            let sailors = this.Player.get_pirats_on_ship();
            sailors.forEach(function(sailor, j){
                if(sailor != undefined){
                    ids[sailor] = this.targetCellIndex;
                }
            });
            this.Player.set_ids(ids);
        }
        console.log("Айдишники клеток пиратов(на которых они стоят):");
        console.log(this.Player.get_ids());
    }

    movement(evt){

        this.ship = this.Player.get_ship(this.ship);
        console.log(evt.content);
        if(evt.content.active){
            this.ship.forEach(function(mesh){
                mesh.isPickable = true;
            });
            let sailors = this.Player.get_pirats_on_ship();
            for(let i = 0; i < 3; i++){
                if(sailors.indexOf(i) === -1){
                    this.pirats[i].isPickable = true;
                    //this.pirats[i].isVisible = true;
                }
            }
        }
        let movements = JSON.parse(evt.content.movement);
        for(let j = 0; j < movements.length; j++){
            let move = movements[j];
            //let piratid;
            //this.PiratId = move.piratId;
            let pirats = [];
            if(this.Enemy.get_index() === move.playerIngameId){
                pirats = this.Enemy.get_pirats();

            }
            else{
                pirats = this.Player.get_pirats();
                this.targetCellIndex = move.targetCellIndex;
                this.PiratId = move.piratId;
                // console.log(this.targetCellIndex);
            }
            let posx = move.playerIngameId === 0 ? 0.1 : -0.2 ; //?
            let posz = move.playerIngameId === 0 ? 0.2 :  0.8 ; //?
            let x = - (6 - move.targetCellIndex%13 + posx)*(1200/13);
            let z = - (6 - move.targetCellIndex/13 + posz)*(1200/13);
            pirats[this.PiratId].isVisible = true;
            pirats[this.PiratId].position = new BABYLON.Vector3(x, 20, z);

            //try to add normal animation
            /*let pirat = pirats[this.PiratId];
             let dx, dz;
             dx = Math.abs(pirat.position.x - x)/200;
             dz = Math.abs(pirat.position.z - z)/200;
             let walk = this.scene.beginAnimation(pirat,0,60,true);
             let first_pos = pirat.position;

             console.log("x:");
             console.log(x);
             console.log("z:");
             console.log(z);

             console.log("pirat.position:");
             console.log("x = " + first_pos.x + " z = "+ first_pos.z);


             this.scene.registerBeforeRender(function () {
             if((Math.abs(pirat.position.x) - Math.abs(x) <= 0.0001) && (Math.abs(pirat.position.z) - Math.abs(z) <= 0.0001)){
             walk.pause();
             return;
             }
             else{
             pirat.position.x += Math.sign(x - first_pos.x)*dx;
             pirat.position.z += Math.sign(z - first_pos.z)*dz;
             first_pos = pirat.position;
             }
             });*/

            console.log('Индекс игрока:');
            console.log(this.index);
            console.log("Индекс целевой клетки:");
            console.log(this.targetCellIndex);
            console.log('Индекс клетки, которая пришла:');
            console.log(move.targetCellIndex);

            if(this.targetCellIndex != undefined){
                let ids = this.Player.get_ids();
                //ids[this.index] = this.targetCellIndex;
                ids[this.PiratId] = this.targetCellIndex;
                this.Player.set_ids(ids);
            }
            console.log("Айдишники клеток пиратов(на которых они стоят):");
            console.log(this.Player.get_ids());
        }
    }

    gameInit(evt, pickResult){
        this.ship = this.Player.get_ship(this.ship);
        if(pickResult.hit){
            let mesh = pickResult.pickedMesh;
            if(this.ship.indexOf(mesh) != -1){
                if(!this.Player.isSomeOneOnShip()){
                    return;
                }
                let location = this.Player.get_ship_location();
                let data = {};
                data.cellIndex = location;
                this.messaging.sendGetNeighbors(data);
                this.ship_picked = true;
                this.pirats.forEach(function(elem){
                    elem.isPickable = false;
                });
            }
            if(this.pirats.indexOf(mesh) != -1){
                mesh.material.emissiveColor = new BABYLON.Color3(0, 0.6, 0);
                this.index = this.pirats.indexOf(mesh);
                for(let j = 0; j < 3; j++){
                    if(j!= this.index){
                        this.pirats[j].isPickable = false;
                    }
                }
                let ids = this.Player.get_ids();
                let cellIndex = ids[this.index];
                let getCellneighbors = {};
                getCellneighbors.cellIndex = cellIndex;
                this.messaging.sendGetNeighbors(getCellneighbors);
                this.pirats_picked = true;
                this.ship.forEach(function(elem){
                    elem.isPickable = false;
                })
            }
            if((mesh === this.gameField)&&(this.pirats_picked === true)){
                let id = pickResult.subMeshId;
                if(this.neighbors.indexOf(id) != -1){
                    this.pirats[this.index].material.emissiveColor = new BABYLON.Color3(0,0,0);
                    this.pirats_picked = false;
                    for (let i = 0; i < this.neighbors.length; ++i){
                        this.gameField.subMeshes[this.neighbors[i]].materialIndex = 1;
                    }
                    this.pirats.forEach(function(elem){
                        elem.isPickable = false;
                    });
                    let piratMove = {};
                    piratMove.targetCellIndex = id;
                    piratMove.piratId = this.index;
                    console.log("отправляю ход игрока с параметрами:");
                    console.log("айди пирата = " + piratMove.piratId + " , клетка, на которую передвинуть: " + piratMove.targetCellIndex);
                    this.messaging.sendPiratMove(piratMove);
                }
            }
            if((mesh === this.gameField)&&(this.ship_picked === true)){
                let id = pickResult.subMeshId;
                //this.ship_picked = false;
                if(this.neighbors.indexOf(id) != -1){
                    this.ship_picked = false;
                    for (let i = 0; i < this.neighbors.length; ++i){
                        this.gameField.subMeshes[this.neighbors[i]].materialIndex = 1;
                    }
                    this.ship.forEach(function(elem){
                        elem.isPickable = false;
                    });
                    let ship_cell_id = this.Player.get_ship_location();
                    if(Math.abs(ship_cell_id - id) === 1){
                        let moved_pirat = this.Player.move_pirat_from_ship();
                        let move_data = {};
                        //this.pirats[moved_pirat].isVisible = true;
                        move_data.targetCellIndex = id;
                        move_data.piratId = moved_pirat;
                        this.messaging.sendPiratMove(move_data);
                    }
                    else{
                        let ship_move_data = {};
                        ship_move_data.targetCellIndex = id;
                        this.messaging.sendShipMove(ship_move_data);
                    }
                }
            }

        }
    }

    createScene(engine, canvas){
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 5,
            12, new BABYLON.Vector3(-100,300,-500), scene);
        camera.lowerBetaLimit = 0.1;
        camera.lowerRadiusLimit = 30;
        camera.upperRadiusLimit = 700;
        camera.attachControl(canvas, true);
        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = .8;
        return scene;
    }

    createSkyBox(scene){
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("static/sky34/sky34", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.renderingGroupId = 0;
    }

    createGameField(scene){
        var xmin = -600,  zmin = -600;
        var xmax =  600,  zmax =  600;
        var precision = {"w" : 1, "h" : 1};
        var subdivisions = {'h' : 13, 'w' : 13};

        var tiledGround = new BABYLON.Mesh.CreateTiledGround("Tiled Ground", xmin, zmin, xmax, zmax,
            subdivisions, precision, scene);
        var LightGreen = new BABYLON.StandardMaterial("LGreen", scene);
        LightGreen.diffuseTexture = new BABYLON.Texture("static/img/texture1.3.jpg", scene);
        LightGreen.bumpTexture = new BABYLON.Texture("static/img/normalMap.jpg", scene);
        LightGreen.emissiveColor = new BABYLON.Color3(0, 0.5 , 0);

        var bumpMaterial = new BABYLON.StandardMaterial("bumpMaterial", scene);
        bumpMaterial.diffuseTexture = new BABYLON.Texture("static/img/texture1.3.jpg", scene);
        bumpMaterial.bumpTexture = new BABYLON.Texture("static/img/normalMap.jpg", scene);
        bumpMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.5 , 0.5);
        bumpMaterial.alpha = 0.3;

        var DarkGreen = new BABYLON.StandardMaterial("DGreen", scene);
        DarkGreen.diffuseTexture = new BABYLON.Texture("static/img/texture1.3.jpg", scene);
        DarkGreen.bumpTexture = new BABYLON.Texture("static/img/normalMap.jpg", scene);
        DarkGreen.emissiveColor = new BABYLON.Color3(0, 0 , 1);
        DarkGreen.alpha = 0.4;

        var multimat = new BABYLON.MultiMaterial("multi", scene);
        multimat.subMaterials.push(LightGreen);
        multimat.subMaterials.push(bumpMaterial);
        multimat.subMaterials.push(DarkGreen);

        tiledGround.material = multimat;
        tiledGround.renderingGroupId = 1;
        var verticesCount = tiledGround.getTotalVertices();
        var tileIndicesLength = tiledGround.getIndices().length / (subdivisions.w * subdivisions.h);

        tiledGround.subMeshes = [];
        var base = 0;


        for(var j = 0; j < 2*subdivisions.h; j++){
            var subMeshIndex = 2;
            if((j > 14)&&(j < 24)){
                subMeshIndex = 1;
            }
            new BABYLON.SubMesh(subMeshIndex, 0, verticesCount, base , tileIndicesLength, tiledGround);
            base += tileIndicesLength;
        }

        for(var j = 0; j < subdivisions.h - 4; j++){
            new BABYLON.SubMesh(2, 0, verticesCount, base , tileIndicesLength, tiledGround);
            base += tileIndicesLength;

            for(var i = 0; i < subdivisions.w - 2; i++){
                new BABYLON.SubMesh(1, 0, verticesCount, base , tileIndicesLength, tiledGround);
                base += tileIndicesLength;
            }

            new BABYLON.SubMesh(2, 0, verticesCount, base , tileIndicesLength, tiledGround);
            base += tileIndicesLength;
        }

        for(var j = 0; j < 2*subdivisions.h; j++){
            var subMeshIndex = 2;
            if((j > 1)&&(j < 15-4)){
                subMeshIndex = 1;
            }
            new BABYLON.SubMesh(subMeshIndex, 0, verticesCount, base , tileIndicesLength, tiledGround);
            base += tileIndicesLength;
        }

        let loader = BABYLON.SceneLoader;

        loader.ShowLoadingScreen = true;

        loader.ImportMesh("", "static/crystalls_babylon/", "crystalls.babylon", scene, function(newMeshes){
            let crystalls = [];
            console.log(crystalls);
            for(let j = 1; j < newMeshes.length; j++){
                crystalls[j] = newMeshes[j].clone("Crystall" + j);
                crystalls[j].scaling = new BABYLON.Vector3(0.003,0.003,0.003);
                crystalls[j].isVisible = true;
                crystalls[j].material.backFaceCulling = false;
                //crystalls[j].rotation.y = -Math.Pi/2;
                //crystalls[j].material.alpha = 0.8;
                crystalls[j].material.emissiveColor = new BABYLON.Color3(0.001,0.3,0.8);
                crystalls[j].renderingGroupId = 1;
                crystalls[j].position = BABYLON.Vector3.Zero();
            }
        });
        return tiledGround;
    }
}
