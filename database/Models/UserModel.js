import {db} from '../database'

class User {
    constructor(name, phone, pasport_id, tarif_id=0, id = 0) {
        this.id = id
        this.name = name
        this.phone = phone
        this.pasport_id = pasport_id
        this.tarif_id = tarif_id
    }

    save() {
        db.run(`INSERT INTO user (name, phone, pasport_id, tarif_id) VALUES (?, ?, ?, ?)`,
        [this.name, this.phone, this.pasport_id, this.tarif_id])
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            db.serialize(()=>{
                db.all(`SELECT user.id, name, phone, pasport_id, title FROM user LEFT JOIN tarif ON user.tarif_id = tarif.id`, (err, result) => {
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
            db.get(`SELECT * FROM user WHERE id = ?`, [id], (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }

    update() {
        db.run(`INSERT INTO user_log (name, pasport_id, tarif_id) SELECT name, pasport_id, tarif_id FROM user WHERE id = ?`, [this.id])
        db.run(`UPDATE user SET name = ?, phone = ?, pasport_id = ?, tarif_id = ? WHERE id = ?`,
        [this.name, this.phone, this.pasport_id, this.tarif_id, this.id])
    }

    static delete(userId) {
        db.serialize(() => {
            db.run(`INSERT INTO user_log (name, pasport_id, tarif_id) SELECT name, pasport_id, tarif_id FROM user WHERE id = ?`, [userId])
            db.run(`DELETE FROM user WHERE id = ?`, [userId])
        })
    }
    static get_everymonth_change(tarif_id){
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM 
            (SELECT strftime('%m-%Y', user.last_update) as reg_date, COUNT(user.id) as reg_count
            FROM user WHERE user.tarif_id = ?
            GROUP BY strftime('%m-%Y', last_update)) AS user_month
            FULL JOIN (SELECT strftime('%m-%Y', user_log.date) as disc_date, COUNT(user_log.id) as disc_count
            FROM user_log WHERE user_log.tarif_id = ?
            GROUP BY strftime('%m-%Y', user_log.date)) AS user_log_month
            ON user_month.reg_date = user_log_month.disc_date`, [tarif_id, tarif_id], (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }
}

export default User