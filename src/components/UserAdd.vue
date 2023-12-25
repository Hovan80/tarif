<template>
  <div v-if="show" class="shadow-box">
    <div class="modal-window">
        <h3>Добавить пользователя</h3>
        <div class="form-wrapper">
            <div class="label-input">
                <label>ФИО</label>
                <input type="text" v-model="userName">
            </div>
            <div class="label-input">
                <label>Паспорт</label>
                <input type="text" v-model="pasport">
            </div>
            <div class="label-input">
                <label>Номер телефона</label>
                <input type="text" v-model="phoneNumber">
            </div>
            <div class="label-input">
                <label>Тариф</label>
                <select v-model="userTarif">
                    <option v-for="tarif of tarifList" :key="tarif.id" :value="tarif.id">{{ tarif.title }}</option>
                </select>
            </div>
        </div>
        <div class="btn-wrapper">
            <button class="save-btn" @click="saveUser">Сохранить</button>
            <button class="close-btn" @click="closeWindow">Закрыть</button>
        </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
    name: 'UserAdd',
    created(){
       this.tarifList = ipcRenderer.sendSync('READ_TARIF_LIST')
    },
    data() {
        return {
            userName: '',
            pasport: 0,
            phoneNumber: '',
            userTarif: 0,
            tarifList: []
        }
    },
    props: {
        show: {
         type: Boolean,
         default: false
        }
    },
    methods: {
        closeWindow(){
            this.$emit('closeWindow')
        },
        saveUser(){
            ipcRenderer.send('SAVE_USER', {
                name: this.userName,
                phone: this.phoneNumber,
                pasport_id: this.pasport,
                tarif_id: this.userTarif
            })
        }
    }
}
</script>

<style lang="scss" scoped>
 .shadow-box{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);

    .modal-window{
        align-items: center;
        background: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        height: 60%;
        height: 500px;
        width: 400px;
        padding: 20px;
        position: fixed;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);

        h3{
            margin-bottom: 15px;
        }

        .form-wrapper{
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
        }
    }
 }
</style>