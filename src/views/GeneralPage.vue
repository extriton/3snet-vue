<template>
  <div class="general-page">
    <a-form-model :model="form">
      
      <!-- Advertiser -->
      <a-row>
        <a-col :span="6">
          <div class="caption">Advertiser</div>
        </a-col>
        <a-col :span="17" :offset="1">
          <a-form-model-item>
            <a-select
              mode="multiple"
              style="width: 100%"
              placeholder="Select advertiser"
              v-model="form.advertiser"
              :options="advertiserOptions"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- External offer id -->
      <a-row>
        <a-col :span="6">
          <div class="caption">External offer id</div>
        </a-col>
        <a-col :span="17" :offset="1">
          <a-form-model-item>
            <a-input
              v-model="form.externalOfferId"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- KPI -->
      <a-row>
        <a-col :span="6">
          <div class="caption">KPI</div>
        </a-col>
        <a-col :span="16" :offset="1">
          <a-form-model-item>
            <a-tabs type="card" default-active-key="en" @change="onChangeTab">
              <a-tab-pane key="ru" tab="Russian">
                <tinymce
                  v-if="lang === 'ru'"
                  id="tinymce_ru"
                  :other_options="{ language_url: '/js/langs/ru.js' }"
                  v-model="form.kpi"
                  @editorInit="onEditorInit"
                />
              </a-tab-pane>
              <a-tab-pane key="en" tab="English">
                <tinymce
                  v-if="lang === 'en'"
                  id="tinymce_en"
                  v-model="form.kpi"
                  @editorInit="onEditorInit"
                />
              </a-tab-pane>
            </a-tabs>
            <!--
            <tinymce
              id="tinymce_rus"
              :other_options="{ language_url: '/js/langs/ru.js' }"
              v-model="form.kpi"
            />
            <tinymce
              id="tinymce_eng"
              v-model="form.kpi"
            />
            -->
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- Traffic sources -->
      <a-row>
        <a-col :span="6">
          <div class="caption">
            <span>Traffic sources</span>&nbsp;
            <a-popover title="Info">
              <template slot="content">
                <p>Bla bla bla</p>
              </template>
              <a-icon class="info-icon" type="info-circle" theme="filled" />
            </a-popover>
          </div>
        </a-col>
        <a-col :span="16" :offset="2">
          <a-form-model-item>
            <a-checkbox-group v-model="form.trafficSources">
              <div
                v-for="(item, index) in trafficSourcesOptions"
                :key="'tso' + index"
              >
                <a-checkbox :value="item.value">
                  {{ item.label }}
                </a-checkbox>
              </div>
            </a-checkbox-group>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- Upload Logo -->
      <a-row>
        <a-col :span="6">
          <div class="caption">
            Logo
            <div class="sub-text">png, jpg, jpeg / 200 * 200</div>
          </div>
        </a-col>
        <a-col :span="17" :offset="1">
          <a-form-model-item>
            <input type="file" id="logo-inputfile" ref="file" class="logo-inputfile" accept="image/jpeg,image/png" @change="handleLogoUpload" />
            <label for="logo-inputfile" class="ant-btn" :style="{ paddingTop: '5px' }">Choose image</label>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- Status -->
      <a-row>
        <a-col :span="6">
          <div class="caption">Status</div>
        </a-col>
        <a-col :span="6" :offset="1">
          <a-form-model-item>
            <a-select
              v-model="form.status"
              :options="statusOptions"
            >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="10" :offset="1">
          <a-form-model-item>
            <a-checkbox v-model="form.isSendEmail">
              <b>Send email to active affiliates on offer status changing</b>&nbsp;
              <a-popover title="Info">
                <template slot="content">
                  <p>Bla bla bla</p>
                </template>
                <a-icon class="info-icon" type="info-circle" theme="filled" />
              </a-popover>
            </a-checkbox>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- Tags -->
      <a-row>
        <a-col :span="6">
          <div class="caption">Tags</div>
        </a-col>
        <a-col :span="17" :offset="1">
          <a-form-model-item>
            <a-input v-model="form.tags" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- Privacy level -->
      <a-row>
        <a-col :span="6">
          <div class="caption">Privacy level</div>
        </a-col>
        <a-col :span="17" :offset="1">
          <a-form-model-item>
            <a-select
              v-model="form.privacyLevel"
              :options="privacyLevelOptions"
            >
            </a-select>
            <div class="sub-text">- public &ndash; Offer is available for everyone without any request;</div>
            <div class="sub-text">- pre-moderation &ndash; Affiliates apply and then wait for network manager confirmation;</div>
            <div class="sub-text">- private &ndash; Offer is not visible from affiliate`s side, except affiliates connected by manager from admin.</div>
          </a-form-model-item>
        </a-col>
      </a-row>

      <hr />
      <a-button type="primary" :style="{ marginRight: '10px' }" @click="onSaveAndContinue">Save and continue</a-button>
      <a-button type="primary" :style="{ marginRight: '10px' }" @click="onSubmit">Save</a-button>
      <a-button @click="onCancel">Cancel</a-button>

      <a-row :style="{ marginTop: '15px' }">
        <a-col :span="17" :offset="7">
          <div class="sub-text">Shows the model of payment for affiliates who use your API.</div>
        </a-col>
      </a-row>
      
      <!-- Offer schedule -->
      <a-row>
        <a-col :span="6">
          <div class="caption">Offer schedule</div>
        </a-col>
        <a-col :span="6" :offset="1">
          <a-form-model-item>
            <a-checkbox v-model="form.isOfferSchedule"></a-checkbox>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- Period -->
      <a-row>
        <a-col :span="6">
        </a-col>
        <a-col :span="5" :offset="1">
          <a-form-model-item>
            <label for="start-at" :style="{ lineHeight: '20px', marginBottom: '0px' }"><b>Start at</b></label><br />
            <a-date-picker id="start-at" v-model="form.startAt" placeholder="Specify date"></a-date-picker>
          </a-form-model-item>
        </a-col>
        <a-col :span="5">
          <a-form-model-item>
            <label for="start-at" :style="{ lineHeight: '20px', marginBottom: '0px' }">
              <b>Stop date</b>&nbsp;
              <a-popover title="Info">
                <template slot="content">
                  <p>Bla bla bla</p>
                </template>
                <a-icon class="info-icon" type="info-circle" theme="filled" :style="{ marginTop: '15px' }" />
              </a-popover>
            </label><br />
            <a-date-picker id="start-at" v-model="form.stopDate" placeholder="Specify date"></a-date-picker>
          </a-form-model-item>
        </a-col>
        <a-col :span="7">
          <a-form-model-item>
            <label for="start-at" :style="{ lineHeight: '20px', marginBottom: '0px' }"><b>Timezone</b></label><br />
            <a-select
              v-model="form.timezone"
              :options="timezoneOptions"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- Hours -->
      <a-row>
        <a-col :span="6">
          <div class="caption">Offer schedule</div>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-form-model-item>
            <a-input-number
              v-model="form.hours"
              :min="0"
              :max="23"
              placeholder="Specify hours"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- Categories -->
      <a-row>
        <a-col :span="6">
          <div class="caption">Categories</div>
        </a-col>
        <a-col :span="15" :offset="1">
          <a-form-model-item>
            <a-input v-model="form.categories" />
            <div class="sub-text">Used for offers sorting by specific category</div>
          </a-form-model-item>
        </a-col>
        <a-col :span="1" :offset="1">
          <a-form-model-item>
            <a-button @click="onAddCategory">+</a-button>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- Upload PDF -->
      <a-row>
        <a-col :span="6">
          <div class="caption">
            IO document
            <div class="sub-text">PDF only, 100MB max</div>
          </div>
        </a-col>
        <a-col :span="17" :offset="1">
          <a-form-model-item>
            <input type="file" id="pdf-inputfile" ref="file" class="pdf-inputfile" accept=".pdf" @change="handlePDFUpload" />
            <label for="pdf-inputfile" class="ant-btn" :style="{ paddingTop: '5px' }">Choose</label>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- Notes -->
      <a-row>
        <a-col :span="6">
          <div class="caption">Notes</div>
        </a-col>
        <a-col :span="17" :offset="1">
          <a-form-model-item>
            <a-textarea v-model="form.notes" :rows="5" />
          </a-form-model-item>
        </a-col>
      </a-row>
      
    </a-form-model>
  </div>
</template>

<script>
import tinymce from 'vue-tinymce-editor'
import General from '@/api/general'
// import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'GeneralPage',
  components: {
    tinymce
    // Editor
  },
  data () {
    return {
      formLayout: 'horizontal',
      // form: this.$form.createForm(this, { name: 'general_form' }),
      form: {
        advertiser: [],
        externalOfferId: '',
        kpi: '',
        trafficSources: [],
        logoFile: '',
        status: '0',
        isSendEmail: false,
        tags: '',
        privacyLevel: '1',
        isOfferSchedule: false,
        startAt: '',
        stopDate: '',
        timezone: '+03:00',
        hours: '',
        categories: '',
        pdfFile: '',
        notes: ''
      },
      mceOptions: {
        language: 'en_US'
      },
      advertiserOptions: [
        { value: '1', label: 'Advertiser 1' },
        { value: '2', label: 'Advertiser 2' },
        { value: '3', label: 'Advertiser 3' },
        { value: '4', label: 'Advertiser 4' },
        { value: '5', label: 'Advertiser 5' }
      ],
      trafficSourcesOptions: [
        { label: 'Web sites', value: 'websites' },
        { label: 'Doorway', value: 'doorway' },
        { label: 'Contextual advertising', value: 'contextual_advertising' },
        { label: 'Contextual advertising of the brands', value: 'contextual_advertising_brands' },
        { label: 'Teaser / Banner / RTB', value: 'teaser_banner_rtb' },
        { label: 'Social Network: Targeted Ads', value: 'targeted_ads' },
        { label: 'Social Network: publics, games, applications', value: 'publics_games_applications' },
        { label: 'Email', value: 'email' },
        { label: 'Mobile traffic', value: 'mobile_traffic' },
        { label: 'ClickUnder/PopUnder', value: 'click_under' },
        { label: 'Reselling traffic', value: 'reselling_traffic' },
        { label: 'Motivated Traffic', value: 'motivated_traffic' },
        { label: 'Messengers, sms', value: 'messengers_sms' },
        { label: 'Video Ads', value: 'video_ads' },
        { label: 'Push', value: 'push' },
        { label: 'API', value: 'api' },
        { label: 'Mobile App (store, pwa, apk, etx)', value: 'mobile_app' },
        { label: 'Forecast', value: 'forecast' }
      ],
      statusOptions: [
        { value: '0', label: 'Disabled' },
        { value: '1', label: 'Enabled' }
      ],
      privacyLevelOptions: [
        { value: '1', label: 'Public' },
        { value: '2', label: 'Pre-moderation' },
        { value: '3', label: 'Private' }
      ],
      timezoneOptions: [
        { value: '+03:00', label: '(GMT +03:00) Europe / Moscow' },
        { value: '-12:00', label: '(GMT -12:00) Eniwetok, Kwajalein' },
        { value: '-11:00', label: '(GMT -11:00) Midway Island, Samoa' },
        { value: '-10:00', label: '(GMT -10:00) Hawaii' },
        { value: '-09:50', label: '(GMT -9:30) Taiohae' },
        { value: '-09:00', label: '(GMT -9:00) Alaska' },
        { value: '-08:00', label: '(GMT -8:00) Pacific Time (US &amp; Canada)' }
      ],
      kpiCopy: '',
      lang: 'en'
    }
  },
  methods: {
    onSubmit () {
      General.postGeneral(this.form)
    },
    onSaveAndContinue () {
      General.postGeneral(this.form)
        .then(() => {
          this.$router.push('/')    
        })
    },
    onCancel () {
      this.$router.push('/')
    },
    onAddCategory () {
      alert('Add Category')
    },
    onChangeTab (key) {
      this.kpiCopy = this.form.kpi
      this.lang = key
      if (key === 'ru') {
        this.mceOptions = { language_url: '/js/langs/ru.js' }
        this.lang = key
      } else {
        this.mceOptions = { language: 'en_US' }
      }
    },
    onEditorInit () {
      this.form.kpi = this.kpiCopy
    },
    handleLogoUpload () {
      this.form.logoFile = this.$refs.file.files[0]
      console.log(this.form.logoFile)
    },
    handlePDFUpload () {
      this.form.pdfFile = this.$refs.file.files[0]
    }
  }
}
</script>

<style lang="scss">
.general-page {
  text-align: left;
  margin-bottom: 80px;
  .caption {
    text-align: right;
    font-weight: bold;
    padding-top: 10px;
  }
  .sub-text {
    font-size: 12px;
    color: #AEB1B5;
    line-height: 1em;
  }
  .logo-inputfile,
  .pdf-inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  /*
  .info-icon {
    display: inline-block;
    font-size: 12px;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    color: #fff;
    background-color: #344A67;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
  */
  /* ---- */
  .label-bold {
    font-weight: bold;
  }
  .ant-row.ant-form-item {
    margin-bottom: 10px;
  }
  .info-icon {
    position: relative;
    top: -3px;
    color: #344A67;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
