<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <header>
        <button class="menu-togle-button" @click="TogleMenu()">
            <Menu class="menu-icon" :size=icon_size />
            <Close class="close-icon" :size=icon_size />
        </button>
    </header>
    <div class="menu-wrap">
        <router-link class="link-button" to="/">
            <Account class="link-icon" :size=icon_size />
            <span class="link-label">Клиенты</span>
        </router-link>
        <router-link class="link-button" to="/tarif">
            <Sale class="link-icon" :size=icon_size />
            <span class="link-label">Тарифы</span>
        </router-link>
        <router-link class="link-button" to="/report">
            <File class="link-icon" :size=icon_size />
            <span class="link-label">Отчёты</span>
        </router-link>
    </div>
  </aside>
</template>

<script>
import Account from 'vue-material-design-icons/Account.vue'
import Close from 'vue-material-design-icons/Close.vue'
import File from 'vue-material-design-icons/File.vue'
import Menu from 'vue-material-design-icons/Menu.vue'
import Sale from 'vue-material-design-icons/Sale.vue'

export default {
    name: 'SidebarMenu',
    components: {
        Account,
        Close,
        File,
        Menu,
        Sale
    },
    data() {
        return {
            is_expanded: false,
            icon_size: 28
        }
    },
    methods: {
        TogleMenu() {
            this.is_expanded = !this.is_expanded
        }
    }
}
</script>

<style lang="scss" scoped>
aside {
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px);
    min-height: 100vh;
    overflow: hidden;

    background-color: var(--dark);

    transition: 0.2s ease-out;

    header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 32px;
        width:100%;
        padding: 5px 10px;
        margin-bottom: 10px;
        transition: 0.2s ease-out;

        .menu-togle-button{
            color: var(--light);
            display: block;
            width: 32px;
            height: 100%;
            position: relative;
            font-size: 2rem;
            transition: 0.2s ease-out;


            .close-icon {
                opacity: 0;
                transition: 0.2s ease-out;
                position: absolute;
                top: 0;
                left: 0;
            }

            .menu-icon {
                opacity: 1;
                transition: 0.2s ease-out;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
        .menu-togle-button:hover{
            color: var(--primary);
            transform: scale(1.1);
        }

    }

    .menu-wrap{
        display: flex;
        flex-direction: column;
        justify-content: start;
        
        .link-button{
            color: var(--light);
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            font-size: 1.5rem;
            text-decoration: none;
            padding: 5px 0px 5px 1rem;

            .link-icon{
                transition: 0.2s ease-out;
            }

            .link-label{
                width: 0%;
                opacity: 0;
                transition: 0.2s ease-out;
            }
            &:hover {
                background-color: var(--dark-alt);
                color: var(--primary)
            }

            &.router-link-exact-active {
                border-right: 5px solid var(--primary);
                background-color: var(--dark-alt);
                color: var(--primary);
                transition: 0.2s ease-out;
            }
        }
    }

    &.is-expanded {
        width: var(--sidebar-width);
        header {
            justify-content: flex-end;
            .menu-togle-button{
                .menu-icon{
                    opacity: 0;
                }
                .close-icon{
                    opacity: 1;
                }
            }
        }

        .menu-wrap{
            .link-button{
                .link-icon{
                    margin-right: 1rem;
                }
                .link-label{
                    width: 100%;
                    opacity: 1;
                }
            }
        }
    }

    @media (max-width: 786px){
        &.is-expanded{
            position: fixed;
            z-index: 99;
        }
    }
}

</style>