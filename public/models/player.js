import Model from "../modules/model";
import BABYLON from "../lib/babylon.js";

export default class Player extends Model {
    constructor(index, scene, attributes = {}) {
        super(attributes);
        this.pirats = [];
        this.ids = [];
        this.index = index;
        this.scene = scene;

        document.addEventListener("MeshLoading", this.OnMeshLoad.bind(this));
        this.MeshLoadEvent = new CustomEvent("MeshLoading", {});

        if (index == 0) {
            this.ids = [78, 78, 78];
        }

        if (index == 1) {
            this.ids = [13 * 7 - 1, 13 * 7 - 1, 13 * 7 - 1];
        }

        BABYLON.SceneLoader.ImportMesh("", "static/cosmo_babylon/", "cosmo.babylon", scene, this.onSceneLoad.bind(this));
        //BABYLON.SceneLoader.ImportMesh("", "static/walking_babylon/", "mycosmo1.babylon", scene, this.onSceneLoad.bind(this));
        BABYLON.SceneLoader.ImportMesh("", "static/ufo_babylon/", "ufo.babylon", scene, this.onShipLoad.bind(this));
        this.gold = 0;
    }

    onSceneLoad(newMeshes, skeletons) {
        let index = this.index;
        for (let j = 0; j < 3; j++) {
            this.pirats[j] = newMeshes[0].clone("Astronaut" + j + index);
            this.pirats[j].skeleton = newMeshes[0].skeleton.clone("skelet" + j + index);
            this.pirats[j].material = newMeshes[0].material.clone("Material" + j + index);
            this.pirats[j].scaling = new BABYLON.Vector3(25, 25, 25);
            this.pirats[j].renderingGroupId = 1;
        }
        console.log(this.pirats[0]);
        document.dispatchEvent(this.MeshLoadEvent);
    }

    onShipLoad(newMeshes) {
        let y = 40, z = 0;
        let x = this.index === 0 ? -700 : 700;
        this.ship = [];
        for (let j = 1; j < newMeshes.length; j++) {
            this.ship[j] = newMeshes[j].clone("ShipPart" + j);
            this.ship[j].scaling = new BABYLON.Vector3(4, 4, 4);
            this.ship[j].renderingGroupId = 1;
            this.ship[j].isPickable = true;
        }
        //console.log(this.ship);
        this.set_ship_position(new BABYLON.Vector3(x, y, z));
        this.ship_location = this.ids[0];
        this.pirats_on_ship = [0, 1, 2];
        this.set_ship_light();
    }

    set_ship_position(position) {
        this.ship.forEach(function (elem) {
            elem.position = position;
        })
    }

    get_ship(obj) {
        if (obj === undefined) {
            console.log("ship was undefined, but now all ok!")
        }
        return this.ship;
    }

    get_ship_location() {
        return this.ship_location;
    }

    set_ship_location(new_location) {
        this.ship_location = new_location;
    }

    move_pirat_from_ship() {
        for (let j = 0; j < 3; j++) {
            if (!(this.pirats_on_ship[j] === undefined)) {
                console.log("Пытаемся достать с корабля пирата с номером " + j);
                delete this.pirats_on_ship[j];
                return j;
            }
        }
        return -1;
    }

    get_pirats_on_ship() {
        return this.pirats_on_ship;
    }

    isSomeOneOnShip() {
        for (let j = 0; j < 3; j++) {
            if (this.pirats_on_ship[j] != undefined) {
                return true;
            }
        }
        return false;
    }

    set_ship_light() {
        this.ship.forEach(function (elem) {
            elem.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        })
    }

    unset_ship_light() {
        this.ship.forEach(function (elem) {
            elem.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
        })
    }

    OnMeshLoad(e) {
        let x, y = 20, z = -35;
        let rotation;

        if (this.index === 0) {
            x = -600;
            rotation = -Math.PI / 2;
        }
        else {
            x = 600;
            rotation = Math.PI / 2;
        }

        this.pirats.forEach(function (elem) {
            elem.position = new BABYLON.Vector3(x, y, z);
            elem.rotation.y = rotation;
            z += 35;
            elem.isPickable = false;
            elem.isVisible = false;
        })
    }

    url(id) {

    }

    set_ids(newIds) {
        this.ids = newIds;
    }

    set_gold(newNumber) {
        this.gold = newNumber;
    }

    get_pirats() {
        return this.pirats;
    }

    get_ids() {
        return this.ids;
    }

    get_index() {
        return this.index;
    }

    get_gold() {

    }

    destroy_pirat(mesh) {

    }
}
