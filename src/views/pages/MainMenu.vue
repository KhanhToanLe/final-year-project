<template>
  <div class="wrapper">
    <div class="main-container">
      <div class="main-logo">
        <!-- <img
          src="/images/logo.png"
          alt="logo image"
        > -->
      </div>
      <div class="pl-4">
        <RouterLink
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          class="button-link"
        >
          <template v-if="route.meta.show">
            {{ route.name }}
          </template>
        </RouterLink>
        <div />
      </div>
      <div class="ml-auto">
        <div class="menu-icon">
          <CIcon
            icon="Search"
            class="w-12 !text-lg text-center"
          />
        </div>
        <div class="menu-icon">
          <CIcon
            icon="Person"
            class="w-12 !text-lg text-center"
            @click="dropdown = !dropdown"
          />
        </div>
        <q-btn-dropdown
          v-model="dropdown"
          color="primary"
          class="dropdown"
        >
          <q-list>
            <q-item
              v-close-popup
              clickable
              @click="informationClickHandler"
            >
              <q-item-section>
                <q-item-label>
                  <div class="flex">
                    <CIcon icon="Info" />
                    <span class="w-[120px] pl-2 ">
                      Information
                    </span>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            
            <q-item
              v-close-popup
              clickable
              @click="signOutClickHandler"
            >
              <q-item-section>
                <q-item-label>
                  <div class="flex">
                    <CIcon icon="Logout" />
                    <span class="w-[120px] pl-2">
                      Sign Out
                    </span>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useDialogStore } from 'src/stores/dialog';
import { useCookies} from 'vue3-cookies';
const router = useRouter();
const routes = router.getRoutes();
const dialog = useDialogStore();
const {cookies} = useCookies();

const dropdown = ref(false);
const informationClickHandler = () =>{
  dialog.show({
    type:"message",
    header:"Attention",
    message:"This Module Is Currently Under Development"
  })
}

const signOutClickHandler = () =>{
  cookies.remove("token");
  router.push("/login");
}
</script>

<style scoped lang="scss">
.wrapper {
  z-index: 1;
  @apply bg-white sticky top-0 left-0 right-0
}

.main-container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  @apply flex;
}

.main-container {
  div {
    @apply flex items-center h-16
  }
}

.button-link {
  @apply text-lg text-black h-full p-3 hover:bg-slate-300 transition-all flex items-center justify-center
}

.menu-icon {
  @apply flex justify-center items-center cursor-pointer
}

.dropdown{
  width: 1px;
  height:1px;
  padding:0;
  margin:0;
  visibility: hidden;

}
</style>