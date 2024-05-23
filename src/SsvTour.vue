<template>
  <div class="wrapper ">
    <div class="">
      <div class="bg-[#3F1052] text-white rounded-t-md">
        <div class="flex p-4 pb-2">
          <div class="w-10">
            <img src="https://ssl.gstatic.com/onebox/media/sports/logos/EKIe0e-ZIphOcfQAwsuEEQ_48x48.png">
          </div>
          <div class="text text-lg pl-4">
            <div>
              Premier League
            </div>
            <div class="text-xs">
              Matchday 8 of 38
            </div>
          </div>
        </div>
        <div class="tab flex">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            class="tab-button"
            :class="{ 'selected-tab': index == selectTab }"
            @click="chooseTab(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <!-- Start Show Content -->
      <!-- First List -->
      <div class="bg-black">
        <div
          v-show="selectTab == 0"
          class="w-full bg-[#202124] text-[#bdc1c6]"
          key="test"
        >
          <div class="grid-wrapper grid grid-cols-2 gap-0 w-full bg-[#202124]">
            <TransitionGroup name="expand">
              <div
                v-for="(item, index) in data"
                v-show="item.show"
                :key="index"
                class="p-4 flex w-full flex-nowrap bg-[#1f1f1f]"
                :class="{ 'col-span-2': index == middleMatch }"
              >
                <template v-if="index != middleMatch">
                  <div class="w-[80%]">
                    <div class="flex p-1">
                      <img
                        src="https://ssl.gstatic.com/onebox/media/sports/logos/teLLSaMXim_8BA1d93sMng_48x48.png"
                        class="w-8 pr-1"
                        alt=""
                      >
                      <div
                        class="flex items-center pl-1"
                        :class="{ 'text-red-500': item.winner != item.teamA }"
                      >
                        {{ item.teamA }}
                      </div>
                      <div
                        class="ml-[auto] flex items-center pr-2"
                        :class="{ 'text-red-500': item.winner != item.teamB }"
                      >
                        {{ item.scoreA }}
                      </div>
                    </div>
                    <div class="flex p-1">
                      <img
                        src="https://ssl.gstatic.com/onebox/media/sports/logos/teLLSaMXim_8BA1d93sMng_48x48.png"
                        class="w-8 pr-1"
                        alt=""
                      >
                      <div class="flex items-center  pl-1">
                        {{ item.teamB }}
                      </div>
                      <div class="ml-[auto] flex items-center pr-2">
                        {{ item.scoreB }}
                      </div>
                    </div>
                  </div>
                  <div class="w-[20%] flex items-center justify-center border-l border-[#3c4043]">
                    <div class=" w-full text-center">
                      <div class="w-full ">
                        {{ item.time }}
                      </div>
                      <div class="w-full">
                        {{ item.date }}
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="w-full flex py-4 justify-between relative"
                    style="padding-left:calc((100% / 4) - 1rem); padding-right:calc((100% / 4) - 1rem)"
                  >
                    <div class="flex-1 flex">
                      <div class="w-fit translate-x-[-50%]">
                        <img
                          src="https://ssl.gstatic.com/onebox/media/sports/logos/FqnQ9nu7UDiSgnXKohdIgg_48x48.png"
                          alt=""
                          class="ml-auto mr-auto w-[60px]"
                        >
                        <a
                          class="w-fit font-[400] mt-2 block"
                          href="/"
                        >Aston Villa</a>
                      </div>
                    </div>
                    <div class="flex-1 flex justify-end">
                      <div class="w-fit translate-x-[50%]">
                        <img
                          src="https://ssl.gstatic.com/onebox/media/sports/logos/0iShHhASp5q1SL4JhtwJiw_96x96.png"
                          alt=""
                          class="ml-auto mr-auto w-[60px]"
                        >
                        <a
                          class="w-fit font-[400] mt-2 block"
                          href="/"
                        >Liverpool</a>
                      </div>
                    </div>
                    <div class="absolute left-[50%] translate-x-[-50%] top-[80%] translate-y-[-50%]">vs</div>
                  </div>
                </template>
              </div>
            </TransitionGroup>
          </div>
          <div class="border border-t-0 h-10 border-[#3c4043]" />
          <div class="w-full flex items-center justify-center">
            <div
              class="mt-[-20px] w-[40px] h-[40px] rounded-full bg-[#8ab4f8] flex justify-center items-center white text-lg text-white cursor-pointer select-none transition-all duration-[0.5s]"
              :class="{ 'rotate-180': !isExpand }"
              @click="ExpandAndColap(isExpand)"
            >
              &#129033;
            </div>
          </div>
        </div>
        <!-- Second List -->
        <div
          v-show="selectTab == 1"
          class="w-full "
          key="test1"
        >
          <div class="text-sm p-2 bg-[#303134] text-[#bdc1c6]">
            <div class="pl-1 font-bold text-base">
              Weeks
            </div>
            <div class="">
              <select
                id=""
                name=""
                class="outline-none border-0 bg-[#303134] "
              >
                <option
                  v-for="item in date"
                  :key="item"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <table class="w-full bg-[#202124] text-[#bdc1c6]">
            <tr class="">
              <td
                class="w-[40%] text-left pl-[18px] py-2"
                colspan="2"
              >
                Team
              </td>
              <td class="w-[5%] team-header">
                MP
              </td>
              <td class="w-[5%] team-header">
                W
              </td>
              <td class="w-[5%] team-header">
                D
              </td>
              <td class="w-[5%] team-header">
                L
              </td>
              <td class="w-[5%] team-header">
                GF
              </td>
              <td class="w-[5%] team-header">
                GA
              </td>
              <td class="w-[5%] team-header">
                GD
              </td>
              <td class="w-[5%] team-header">
                Pts
              </td>
              <td class="w-[10%]">
                last 5
              </td>
            </tr>
            <TransitionGroup
              tag="tbody"
              name="tableRow"
            >
              <tr
                v-for="(item, index) in team"
                :key="index"
                class="team-row"
              >
                <td class="w-[5%] py-2">
                  {{ index + 1 }}
                </td>
                <td class="flex items-center  py-2">
                  <img
                    :src="item.logoTeam"
                    class='w-[24px] h-[24px]'
                  >
                  <span class="pl-2">{{ item.name }}</span>
                </td>
                <td>{{ item.MP }}</td>
                <td>{{ item.W }}</td>

                <td>{{ item.D }}</td>


                <td>{{ item.L }}</td>
                <td>{{ item.GF }}</td>


                <td>{{ item.GA }}</td>


                <td>{{ item.GD }}</td>
                <td>{{ item.Pts }}</td>
                <td class="flex !flex-nowrap justify-center">
                  <span
                    v-for="mark in item.lastFive"
                    :key="mark"
                    class="flex m-[1px]"
                  >
                    <span v-if="mark == 0">
                      <img src="./minus.svg">
                    </span>
                    <span v-if="mark == 1">
                      <img src="./v.svg">
                    </span>
                    <span v-if="mark == -1">
                      <img src="./x.svg">
                    </span>
                  </span>
                </td>
              </tr>
            </TransitionGroup>
          </table>
        </div>
      </div>
      <!-- End Show Content -->
    </div>
  </div>
  {{ middleMatch }}
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
const maxItemBeforeExpand = 5;

const selectTab = ref(0)

const middleMatch = Math.floor(maxItemBeforeExpand / 2)

const chooseTab = (index) => {
  selectTab.value = index;
}

const isExpand = ref(false);

const ExpandAndColap = (isExp) => {
  console.log("hello world")
  if (isExp) {
    data.value = data.value.map((item, index) => ({
      ...item,
      show: index >= maxItemBeforeExpand ? false : true,
    }));
  } else {
    data.value = data.value.map((item, index) => ({
      ...item,
      show: true
    }));
  }
  isExpand.value = !isExpand.value


}


onMounted(() => {
  data.value = data.value.map((item, index) => ({
    ...item,
    show: index < maxItemBeforeExpand ? true : item.show,
  }));


})


const data = ref([
  {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  },
  {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  },
  {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  }, {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  }, {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  },
  {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  },

  {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  }
  ,

  {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  }
  ,

  {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  }
  ,

  {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  }
  ,

  {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  }
  ,

  {
    teamA: 'ABC',
    teamB: 'XYZ',
    scoreA: 0,
    scoreB: 1,
    winner: 'ABC',
    time: 'FT',
    date: 'Aug 12',
    show: false,
  }
]);


const tabList = ref([
  'Match',
  'Standing',
  'Match',
  'Standing',
  'Match',
])


const date = ref([
  'Tuần 1 Tháng 9',
  'Tuần 2 Tháng 9',
  'Tuần 3 Tháng 9',
  'Tuần 4 Tháng 9',
  'Tuần 5 Tháng 9',
]);

const team = ref([
  {
    logoTeam: 'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png',
    name: 'Man city',
    MP: '7',
    W: '6',
    D: '0',
    L: 'L',
    GF: '12',
    GA: '6',
    GD: '12',
    Pts: '18',
    lastFive: [0, 1, 1, 1, 1]
  }, {
    logoTeam: 'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png',
    name: 'Man city',
    MP: '7',
    W: '6',
    D: '0',
    L: 'L',
    GF: '12',
    GA: '6',
    GD: '12',
    Pts: '18',
    lastFive: [0, 1, 1, 1, 1]
  },
  {
    logoTeam: 'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png',
    name: 'Man city',
    MP: '7',
    W: '6',
    D: '0',
    L: 'L',
    GF: '12',
    GA: '6',
    GD: '12',
    Pts: '18',
    lastFive: [0, -1, 1, 1, 1]
  }, {
    logoTeam: 'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png',
    name: 'Man city',
    MP: '7',
    W: '6',
    D: '0',
    L: 'L',
    GF: '12',
    GA: '6',
    GD: '12',
    Pts: '18',
    lastFive: [0, 1, 1, 1, 1]
  }
  , {
    logoTeam: 'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png',
    name: 'Man city',
    MP: '7',
    W: '6',
    D: '0',
    L: 'L',
    GF: '12',
    GA: '6',
    GD: '12',
    Pts: '18',
    lastFive: [0, 1, 1, 1, 1]
  }
  , {
    logoTeam: 'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png',
    name: 'Man city',
    MP: '7',
    W: '6',
    D: '0',
    L: 'L',
    GF: '12',
    GA: '6',
    GD: '12',
    Pts: '18',
    lastFive: [0, 1, 1, 1, 1]
  }
  , {
    logoTeam: 'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png',
    name: 'Man city',
    MP: '7',
    W: '6',
    D: '0',
    L: 'L',
    GF: '12',
    GA: '6',
    GD: '12',
    Pts: '18',
    lastFive: [0, 1, 1, 1, 1]
  }
  , {
    logoTeam: 'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png',
    name: 'Man city',
    MP: '7',
    W: '6',
    D: '0',
    L: 'L',
    GF: '12',
    GA: '6',
    GD: '12',
    Pts: '18',
    lastFive: [0, 1, 1, 1, 1]
  }
])

</script>


<style scoped>
.wrapper {
  margin-left: auto;
  margin-right: auto;
  max-width: 1280px;
}


.tab-button {
  @apply flex-1 p-4 text-center cursor-pointer;
  border-bottom: 1px solid #3F1052
}

.tab-button:hover {
  background-color: rgba(255, 255, 255, .1);
}


.selected-tab {
  border-bottom: 2px solid white;
}

table,
tr,
th {
  @apply border text-center border-[#3c4043]
}


.grid-wrapper {
  /* border-top: 1px solid black; */
  @apply border-t border-l border-[#3c4043]
  /* border-left: 1px solid black; */
}


.grid-wrapper>div {
  padding: 15px;
  text-align: center;
  @apply border-b border-r border-[#3c4043]
}


.team-row:hover {
  @apply bg-[#424548] select-none
}


.team-header {
  @apply text-xs
}


.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


.tableRow-enter-active,
.tableRow-leave-active {
  transition: all 0.5s ease;
}

.tableRow-enter-from,
.tableRow-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* .changeTab-enter-active {
  transition: all 0s ease;
}

.changeTab-enter-from {
  opacity: 0;
  transform: translateX(30px);
} */
</style>
