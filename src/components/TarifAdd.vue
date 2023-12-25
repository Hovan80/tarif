<template>
  <div v-if="show" class="shadow-box">
    <div class="modal-window">
        <h3>Добавить тариф</h3>
        <div class="form-wrapper">
            <div class="label-input">
                <label>Название</label>
                <input type="text" v-model="tarifTitle">
            </div>
            <div class="label-input">
                <label>Цена</label>
                <input type="number" v-model="tarifPrice">
            </div>
            <div class="label-input">
                <label>Минуты</label>
                <input type="number" v-model="tarifMinute">
            </div>
            <div class="label-input">
                <label>Кол-во SMS</label>
                <input type="number" v-model="tarifSms">
            </div>
            <div class="label-input">
                <label>Мобильный интернет</label>
                <input type="number" v-model="tarifMobileInternet">
            </div>
            <div class="label-checkbox">
                <label for="">Домашний интернет: </label>
                <input type="checkbox" v-model="tarifHomeInternet">
            </div>
        </div>
        <div class="btn-wrapper">
            <button class="save-btn" @click="saveTarif">Сохранить</button>
            <button class="close-btn" @click="closeWindow">Закрыть</button>
        </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
    name: 'TarifAdd',
    data() {
        return {
            tarifTitle: '',
            tarifPrice: 0,
            tarifMinute: 0,
            tarifSms: 0,
            tarifMobileInternet: 0,
            tarifHomeInternet: false
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
        saveTarif(){
            ipcRenderer.send('SAVE_TARIF', {
                title: this.tarifTitle,
                price: this.tarifPrice,
                minute: this.tarifMinute,
                sms: this.tarifSms,
                phoneInternet: this.tarifMobileInternet,
                homeInternet: this.tarifHomeInternet
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

            .label-input{
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