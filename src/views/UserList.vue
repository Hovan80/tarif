<template>
    <main class="user-list">
        <UserAdd :show="showModal" @closeWindow="closeModal()"/>
        <h1>Список абонентов</h1>
        <button @click="openModal">Добавить пользователя</button>
        <table>
            <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Номер телефона</th>
                    <th>Паспорт</th>
                    <th>Тариф</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user of userList" :key="user.id" @click="this.$router.push({name: 'user', params: {id: user.id}})">
                    <td>{{ user.name }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.pasport_id }}</td>
                    <td>{{ user.title }}</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script>
import { ipcRenderer } from 'electron'
import UserAdd from '../components/UserAdd.vue'

    export default {
        name: "UserList",
        components: {
            UserAdd
        },
        data() {
            return {
                userList: [],
                showModal: false,
            }
        },
        created(){
            this.userList = ipcRenderer.sendSync('READ_USER_LIST')
        },
        mounted(){
            ipcRenderer.on('READ_USER_LIST', (event, payload)=> {
                this.userList = payload
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
    .user-list{
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