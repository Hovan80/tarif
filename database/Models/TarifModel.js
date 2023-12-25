import {db} from '../database.js'

class Tarif {
    constructor(title, price, minute, sms, phoneInternet, homeInternet, id = 0) {
        this.id = id
        this.title = title
        this.price = price
        this.minute = minute
        this.sms = sms
        this.phoneInternet = phoneInternet
        this.homeInternet = homeInternet
    }

    save() {
        db.run(`INSERT INTO tarif (title, price, minute, sms, mobile_internet, home_internet) VALUES (?, ?, ?, ?, ?, ?)`,
        [this.title, this.price, this.minute, this.sms, this.phoneInternet, this.homeInternet])
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            db.serialize(()=>{
                db.all(`SELECT * FROM tarif`, (err, result) => {
                    if (err){
                        reject(err)
                    }
                    resolve(result)  
                })
            })
        })
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM tarif WHERE id = ?`, [id], (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }

    update() {
        db.run(`UPDATE tarif SET title = ?, price = ?, minute = ?, sms = ?, mobile_internet = ?, home_internet = ? WHERE id = ?`,
        [this.title, this.price, this.minute, this.sms, this.phoneInternet, this.homeInternet, this.id])
    }
}

export default Tarif