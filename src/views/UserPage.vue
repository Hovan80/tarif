<template>
    <main>
        <div class="wrapper">
            <h1>Страница пользователя</h1>
            <div class="input-wrapper">
                <div class="label-input">
                    <p>ФИО</p>
                    <input type="text" v-model="name">
                </div>
                <div class="label-input">
                    <p>Паспорт</p>
                    <input type="text" v-model="pasport_id">
                </div>
                <div class="label-input">
                    <p>Номер телефона</p>
                    <input type="text" v-model="phone">
                </div>
                <div class="label-select">
                    <p>Тариф</p>
                    <select v-model="tarif_id">
                        <option v-for="tarif of tarifList" :key="tarif.id" :value="tarif.id">{{ tarif.title }}</option>
                    </select>
                </div>
            </div>
            <div class="btn-wrapper">
                <button class="save-btn" @click="updateUser">Сохранить</button>
                <button class="close-btn" @click="this.$router.push({name: 'userList'})">Отменить</button>
                <button class="delete-btn" @click="deleteUser">Отключить</button>
            </div>
        </div>
    </main>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
    name: 'UserPage',
    data() {
        return {
            id: this.$route.params.id,
            name: '',
            phone: '',
            pasport_id: 0,
            tarif_id: 0,
            tarifList: []
        }
    },
    created() {
        const data = ipcRenderer.sendSync('READ_USER', {id: this.id})
        this.name = data.name
        this.phone = data.phone
        this.pasport_id = data.pasport_id
        this.tarif_id = data.tarif_id
        this.tarifList = ipcRenderer.sendSync('READ_TARIF_LIST')
    },
    methods: {
        updateUser(){
            ipcRenderer.send('UPDATE_USER', {
                id: this.id,
                name: this.name,
                phone: this.phone,
                pasport_id: this.pasport_id,
                tarif_id: this.tarif_id,
            })
            this.$router.push({name: 'userList'})
        },
        deleteUser(){
            ipcRenderer.send('DELETE_USER', {id: this.id})
            this.$router.push({name: 'userList'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper{
        align-items: left;
        background: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        height: 60vh;
        width: 25vw;
        min-height: 500px;
        min-width: 400px;
        padding: 20px;
        position: fixed;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);

        .input-wrapper{
            display: flex;
            gap: 0.7rem;
            flex-direction: column;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: auto;
            width: 100%;

            input{
                display: block;
                width: 100%;
                height: calc(2.25rem + 2px);
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                color: var(--dark);
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #bdbdbd;
                border-radius: 0.25rem;
                transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            }

            select{
                display: block;
                width: 100%;
                height: calc(2.25rem + 2px);
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                color: var(--dark);
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #bdbdbd;
                border-radius: 0.25rem;
                transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            }
        }

        .btn-wrapper{

            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 100%;

            button{
                border-radius: 5px;
                font-size: 1rem;
                font-weight: 700;
                padding: 7px;
            }

            .save-btn {
                background-color: var(--primary);
                color:#fff;
            }

            .close-btn {
                color: var(--primary);
                background-color: var(--dark)
            }
            .delete-btn{
                color: #fff;
                background-color: red;
            }
        }
    }
</style>