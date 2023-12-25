<template>
  <main>
      <div class="wrapper">
        <h1>Страница тарифа</h1>
        <div class="input-wrapper">
          <div class="label-input">
            <label>Название</label>
            <input type="text" v-model="tarifTitle">
          </div>
          <div class="label-input">
            <label>Цена</label>
            <input type="text" v-model="tarifPrice">
          </div>
          <div class="label-input">
            <label>Минуты</label>
            <input type="text" v-model="tarifMinute">
          </div>
          <div class="label-input">
            <label>Кол-во SMS</label>
            <input type="text" v-model="tarifSms">
          </div>
          <div class="label-input">
            <label>Мобильный интернет</label>
            <input type="text" v-model="tarifMobileInternet">
          </div>
          <div class="label-checkbox">
            <label for="">Домашний интернет: </label>
            <input type="checkbox" v-model="tarifHomeInternet">
          </div>
        </div>
        <div class="btn-wrapper">
            <button class="save-btn" @click="updateTarif">Сохранить</button>
            <button class="close-btn" @click="this.$router.push({name: 'tarifList'})">Отменить</button>
        </div>
      </div>
  </main>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'TarifPage',
  data() {
      return {
          id: this.$route.params.id,
          tarifTitle: '',
          tarifPrice: 0,
          tarifMinute: 0,
          tarifSms: 0,
          tarifMobileInternet: 0,
          tarifHomeInternet: false,
      }
  },
  created() {
      const data = ipcRenderer.sendSync('READ_TARIF', {id: this.id})
      console.log(data)
      this.tarifTitle = data.title
      this.tarifPrice = data.price
      this.tarifMinute = data.minute
      this.tarifSms = data.sms
      this.tarifMobileInternet = data.mobile_internet
      this.tarifHomeInternet = data.home_internet ? true : false 
  },
  methods: {
      updateTarif(){
          ipcRenderer.send('UPDATE_TARIF', {
            id: this.id,
            title: this.tarifTitle,
            price: this.tarifPrice,
            minute: this.tarifMinute,
            sms: this.tarifSms,
            mobileInternet: this.tarifMobileInternet,
            homeInternet: this.tarifHomeInternet,
          })
          this.$router.push({name: 'tarifList'})
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

            input[type=text]{
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