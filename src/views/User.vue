<template>
  <div class="py-8 flex lg:w-4/6 justify-center items-center">
    <div class="o-container">
      <div class="text-center">
        <a class="w-24 h-24 inline-block"
           :href="userUrl"
           rel="noopener noreferrer"
           :title="userTitle"
           target="_blank">
          <img :src="user.profile.src"
               :alt="user.profile.alt"
               class="w-full rounded-full hover:shadow-outline"
          />
        </a>
        <div class="relative my-4 text-2xl">
          <span v-show="hasReceivedData"
                id="title"
                class="inline-block text-center cursor-pointer">
            {{ user.ID }}
          </span>
          <div v-show="!hasReceivedData">Loading...</div>
          <div class="text-gray-500 text-sm transition" ref="tip">
            (click username to change)
          </div>
          <Modal :trigger="'#title'">
            <form @submit.prevent="changeUser"
                  class="absolute text-sm top-0 bg-white border align-left flex">
              <input v-model="input"
                     type="search"
                     aria-label="user name"
                     placeholder="Enter user name..."
                     class="h-12 px-4"
              />
              <button type="submit" class="px-4 leading-12 text-green-500 cursor-pointer hover:bg-gray-100">
                <Icon name="checkmark"/>
              </button>
            </form>
          </Modal>
        </div>
        <div class="flex flex-col mt-3 mb-6">
          <div class="text-5xl lg:text-6xl leading-none" v-odometer="user.fans">
            {{ user.fans }}
          </div>
          <span class="text-gray-700 text-sm">
            Followers
          </span>
        </div>
        <div class="flex flex-col my-4">
          <div class="text-2xl lg:text-3xl leading-none" v-odometer="user.hearts">
            {{ user.hearts }}
          </div>
          <span class="text-gray-700 text-sm">
            Hearts
          </span>
        </div>
      </div>
      <LineChart :label="chart.label"
                 :labels="chart.labels"
                 :results="chart.results"
      />
    </div>
  </div>
</template>

<script>
  import {LineChart, Icon, Modal} from '../components'
  import defaultLogo from '../assets/default-logo.jpeg'

  import EventService from '../services/event-service'
  import {
    REFRESH_COUNT_INTERVAL,
    REFRESH_CHART_INTERVAL,
    TIP_FADE_TIMEOUT,
    TIKTOK_BASE_URL,
    CLOSE_MODAL,
    DEFAULT_USER_NAME,
  } from '../common/types'
  import {out, odometer} from '../common/directives'
  import {getTime} from '../common/utils'
  import {eventBus} from '../common/event-bus'

  export default {
    name: 'User',
    components: {
      LineChart,
      Icon,
      Modal,
    },
    directives: {
      out,
      odometer,
    },
    data() {
      return {
        user: {
          ID: null,
          fans: 0,
          hearts: 0,
          profile: {
            src: defaultLogo,
            alt: DEFAULT_USER_NAME,
          },
        },
        chart: {
          label: 'Follower count',
          labels: [],
          results: [],
        },
        hasReceivedData: false,
        input: null,
      }
    },
    computed: {
      userUrl() {
        return `${TIKTOK_BASE_URL}@${this.user.ID}`
      },
      userTitle() {
        return `See @${this.user.ID} profile on TikTok`
      }
    },
    watch: {
      hasReceivedData(bool) {
        if (bool) {
          this.refreshChart()

          // Refresh Chart (interval)
          window.setInterval(() => {
            this.refreshChart()
          }, REFRESH_CHART_INTERVAL)

          // Fade out Tip message (timeout)
          window.setTimeout(() => {
            this.$refs.tip.style.opacity = '0';
          }, TIP_FADE_TIMEOUT)
        }
      },
    },
    created() {
      this.user.ID = this.$route.params.id

      // Fetch User data
      this.fetchUser().then(() => {
        window.setInterval(() => {
          this.fetchUser()
        }, REFRESH_COUNT_INTERVAL)
      })
    },
    methods: {
      async getData() {
        return EventService.getUser(this.$route.params.id)
      },
      changeUser() {
        eventBus.$emit(CLOSE_MODAL)
        // Set new route
        this.$router.push({
          name: 'user',
          params: {
            id: this.input,
          },
        })
        this.input = null
      },
      refreshChart() {
        if (!this.hasReceivedData) {
          return
        }
        const time = getTime()

        this.chart.labels.push(time)
        this.chart.results.push(this.user.fans)
      },
      fetchUser() {
        return this.getData().then(data => {
          if (!data) {
            return
          }
          this.hasReceivedData = true

          this.user = {
            ID: data.id,
            fans: data.fans,
            hearts: parseInt(data.heart),
            profile: {
              src: data.covers[0],
              alt: data.nickName,
            },
          }
        })
      },
    },
  }
</script>
