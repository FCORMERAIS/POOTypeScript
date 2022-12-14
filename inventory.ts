import Objects from "./ClassObjet/Objet.ts"
import Potion from "./ClassObjet/potion.ts"
import Ether from "./ClassObjet/Ether.ts"
import MorceauEtoile from "./ClassObjet/MorceauEtoile.ts"
import Chara from "./character/Personnage.ts"
import Mage from "./character/Mage.ts"
import Pretre from "./character/Pretre.ts"
import DemiEtoile from "./ClassObjet/DemiEtoile.ts"

export default class Inventory {
    public inventory : Objects[] = [new Potion(), new Ether(), new Potion(),new MorceauEtoile()]

    public showInventory(ally : Chara[]) {//affiche l'inventaire
        if (this.inventory.length == 0) {return null}

        for (let index = 1; index <= this.inventory.length; index++) {//affiche les objets
            console.log(` ${index}. ${this.inventory[index-1].name}`)
        }

        let item : Objects | null = null
        let choose : string | number | null = prompt("what do you want to choose ? >")//choix de l'objet
        if (choose != null && parseInt(choose) <= this.inventory.length) {
            item = this.inventory[parseInt(choose)-1]
            console.log(`sur qui voulez vous consommer : ${item.name}`)
        }
        
        for (let index = 0; index < ally.length; index++) {//affiche l'équipe du joueur
            console.log(` ${index+1}. ${ally[index].name}`)          
        }
        let choose2 : string | null = prompt("Qui choisissez vous ? >")
        if (choose2 == "1" || choose2 == "2" || choose2 == "3") {//choix du personnage
            if (item != null) {
                if (item instanceof Potion) {//si l'objet est une potion
                    item.Healing(ally[parseInt(choose2)-1])//le personnage se soigne
                    this.inventory.splice(parseInt(choose as string)-1,1)
                }else if (item instanceof Ether && ally[parseInt(choose2)-1].name == "Mage") {
                    item.ether(ally[parseInt(choose2)-1] as Mage)
                    this.inventory.splice(parseInt(choose as string)-1,1)
                }else if (item instanceof Ether && ally[parseInt(choose2)-1].name == "Pretre" ) {
                    item.ether(ally[parseInt(choose2)-1] as Pretre)
                    this.inventory.splice(parseInt(choose as string)-1,1)
                }else if (item instanceof DemiEtoile) {
                    item.demiEtoile(ally[parseInt(choose2)-1])
                    this.inventory.splice(parseInt(choose as string)-1,1)
                }else if (item instanceof MorceauEtoile) {
                    item.morceauEtoile(ally[parseInt(choose2)-1])
                    this.inventory.splice(parseInt(choose as string)-1,1)
                }else {console.log("recommencer mais choisissez des entrée valides");this.showInventory(ally)}
            }
        }
    }
    /**
     * ajoute un objet à l'inventaire
     * @param item 
     */
    public addItem(item : Objects) {
        this.inventory.push(item)
    }

}
