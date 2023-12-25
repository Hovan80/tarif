<template>
    <main class="tarif-list">
        <TarifAdd :show="showModal" @closeWindow="closeModal()"/>
        <h1>Список тарифов</h1>
        <button @click="openModal">Добавить тариф</button>
        <table>
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Кол-во минут</th>
                    <th>Кол-во SMS</th>
                    <th>Кол-во гигабайт</th>
                    <th>Домашний интернет</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tarif of tarifList" :key="tarif.id" @click="this.$router.push({name: 'tarif', params: {id: tarif.id}})">
                    <td>{{ tarif.title }}</td>
                    <td>{{ tarif.price }}</td>
                    <td>{{ tarif.minute }}</td>
                    <td>{{ tarif.sms }}</td>
                    <td>{{ tarif.mobile_internet }}</td>
                    <td>{{ tarif.home_internet ? 'Есть' : 'Отсутствует'}}</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script>
import { ipcRenderer } from 'electron'
import TarifAdd from '../components/TarifAdd.vue'

    export default {
        name: "TarifList",
        components: {
            TarifAdd
        },
        data() {
            return {
                tarifList: [],
                showModal: false,
            }
        },
        created(){
            this.tarifList = ipcRenderer.sendSync('READ_TARIF_LIST')
        },
        mounted(){
            ipcRenderer.on('READ_TARIF_LIST', (event, payload)=> {
                this.tarifList = payload
            })
        },
        methods: {
            openModal(){
                this.showModal = true
            },
            closeModal(){
                this.showModal = false
            }
        }

    }
</script>

<style lang="scss" scoped>
    .tarif-list{
        color: var(--dark);
        padding: 15px;
        text-align: left;
        h1{
            margin-bottom: 1rem;
        }
        button{
            background-color: var(--primary);
            border-radius: 5px;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
            padding: 7px;
        }
        table{
            border-collapse: collapse;
            font-size: 20px;
            padding: 15px, auto;
            th, td{
                max-width: 150px;
                padding: 5px;
            }
            tr{
                border-bottom: 1px solid var(--dark);
            }
            tbody{
                tr{
                    transition: 0.1s ease-out;
                }
                tr:hover{
                    background-color: var(--dark);
                    color: var(--primary);
                    cursor: pointer;
                }
                
            }
        }
    }
</style>