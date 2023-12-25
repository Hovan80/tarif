<template>
  <main class="report-list">
    <h1>Отчёты</h1>
    <div class="label-select">
      <span>Тариф</span>
      <select v-model="tarif_id" @change="get_month_change">
        <option v-for="tarif of tarifList" :key="tarif.id" :value="tarif.id">{{ tarif.title }}</option>
      </select>
    </div>
    <div class="table-wrap">
        <span>Месяц с максимальным количеством отключившихся абонентов: {{ maxMonth }}</span>
        <table>
          <thead>
            <tr>
              <th>Месяц</th>
              <th>Кол-во подключившихся</th>
              <th>Кол-во отключившихся</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report of reportList" :key="report.date">
              <td>{{ report.reg_date ? report.reg_date : report.disc_date}}</td>
              <td>{{ report.reg_count ? report.reg_count : 'Отсутствуют' }}</td>
              <td>{{ report.disc_count ? report.disc_count : 'Отсутствуют' }}</td>
            </tr>
          </tbody>
        </table>
    </div>
  </main>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
    name: 'ReportPage',
    data(){
        return{
          tarif_id: 1,
          reportList: [],
          tarifList: []
        }
    },
    created(){
      this.reportList = ipcRenderer.sendSync('EVERYMONTH_CHANGE', {tarif_id: this.tarif_id})
      this.tarifList = ipcRenderer.sendSync('READ_TARIF_LIST')
    },
    computed: {
      maxMonth(){
        let max_month = ''
        let maxDiscUser = 0
        for (const report of this.reportList){
          if (report.disc_count > maxDiscUser){
            max_month = report.disc_date
            maxDiscUser = report.disc_count
          }
        }
        return max_month
      }
    },
    methods:{
      get_month_change(){
        this.reportList = ipcRenderer.sendSync('EVERYMONTH_CHANGE', {tarif_id: this.tarif_id})
      }
    }
}
</script>

<style lang="scss" scoped>
.report-list{
        color: var(--dark);
        padding: 15px;
        text-align: left;
        h1{
            margin-bottom: 1rem;
        }
        .label-select{
          display: flex;
          flex-direction: column;
          gap: 5px;

          span{
            font-size: 20px;
            font-weight: 700;
          }
          select{
                  display: block;
                  height: 2rem;
                  max-width: 10%;
                  min-width: 200px;
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
        .table-wrap{
          margin-top: 20px;
          span{
            font-size: 20px;
          }

          table{
              font-size: 20px;
              border-collapse: collapse;
              margin-top: 20px;
              padding: 15px, auto;
              th, td{
                  padding: 5px;
              }
              tr{
                  border-bottom: 1px solid var(--dark);
              }
          }
        }
    }
</style>