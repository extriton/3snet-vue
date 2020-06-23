<template>
  <div class="general-page">
    <b-form @submit.prevent="onSubmit">

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">Advertiser</div>
        </div>
        <div class="col-9 col-md-6">
          <b-form-select v-model="form.advertiser" :options="advertiserOptions"></b-form-select>
        </div>
      </div>
      
      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">External offer id</div>
        </div>
        <div class="col-9 col-md-6">
          <b-form-input v-model="form.externalOfferId"></b-form-input>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">KPI</div>
        </div>
        <div class="col-9 col-md-6">
          <b-tabs>
            <b-tab title="Russian" active>
              <tinymce
                id="tinymce_rus"
                :other_options="{ language_url: '/js/langs/ru.js' }"
                v-model="form.kpi"
              >
              </tinymce>
            </b-tab>
            <b-tab title="English">
              <tinymce
                id="tinymce_en"
                :other_options="{}"
                v-model="form.kpi"
              >
              </tinymce>
            </b-tab>
          </b-tabs>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">
            Traffic sources
            <span class="info-icon" v-b-popover.hover.top="'Traffic sources!'">i</span>
          </div>
        </div>
        <div class="col-9 col-md-6 ml-2">
          <b-form-checkbox-group
            id="traffic-sources"
            v-model="form.trafficSources"
            :options="trafficSourcesOptions"
            stacked
          ></b-form-checkbox-group>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">
            Logo
            <div class="sub-text">png, jpg, jpeg / 200 * 200</div>
          </div>
        </div>
        <div class="col-9 col-md-6">
          <input type="file" id="logo-inputfile" ref="file" class="logo-inputfile" accept="image/jpeg,image/png" @change="handleLogoUpload()" />
          <label for="logo-inputfile" class="btn btn-outline-secondary">Choose image</label>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">Status</div>
        </div>
        <div class="col-3 col-md-4">
          <b-form-select v-model="form.status" :options="statusOptions"></b-form-select>
        </div>
        <div class="col-6 col-md-6">
          <div class="mt-1">
            <b-form-checkbox
              id="status"
              v-model="form.isSendEmail"
              :value="true"
              :unchecked-value="false"
            >
              <b>Send email to active affiliates on offer status changing</b>
              <span class="info-icon ml-1" v-b-popover.hover.top="'Send email to active affiliates on offer status changing'">i</span>
            </b-form-checkbox>
          </div>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">Tags</div>
        </div>
        <div class="col-9 col-md-6">
          <b-form-input v-model="form.tags"></b-form-input>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">Privacy level</div>
        </div>
        <div class="col-9 col-md-6">
          <b-form-select v-model="form.privacyLevel" :options="privacyLevelOptions"></b-form-select>
          <div class="sub-text">- public &ndash; Offer is available for everyone without any request;</div>
          <div class="sub-text">- pre-moderation &ndash; Affiliates apply and then wait for network manager confirmation;</div>
          <div class="sub-text">- private &ndash; Offer is not visible from affiliate`s side, except affiliates connected by manager from admin.</div>
        </div>
      </div>
      
      <hr />
      <b-button variant="info" class="mr-2" @click="onSaveAndContinue">Save and continue</b-button>
      <b-button type="submit" variant="info" class="mr-2">Save</b-button>
      <b-button variant="outline-secondary" @click="onCancel">Cancel</b-button>

      <div class="row mt-3">
        <div class="col-9 offset-3 col-md-6 offset-md-2">
          <div class="sub-text">Shows the model of payment for affiliates who use your API.</div>
        </div>
      </div>

      <div class="row form-group mt-2">
        <div class="col-3 col-md-2">
          <div class="caption">Offer schedule</div>
        </div>
        <div class="col-9 col-md-6 mt-1">
          <b-form-checkbox
            id="offer-schedule"
            v-model="form.isOfferSchedule"
            :value="true"
            :unchecked-value="false"
          >
          </b-form-checkbox>
        </div>
      </div>

      <div class="row form-group mt-2">
        <div class="col-3 offset-3 col-md-3 offset-md-2">
          <label for="start-at"><b>Start at</b></label>
          <b-form-datepicker id="start-at" v-model="form.startAt" placeholder="Specify date" class="mb-2"></b-form-datepicker>
        </div>
        <div class="col-3 col-md-3">
          <label for="start-at">
            <b>Stop date</b>
            <span class="info-icon ml-1" v-b-popover.hover.top="'Stop date'">i</span>
          </label>
          <b-form-datepicker id="stop-date" v-model="form.stopDate" placeholder="Specify date" class="mb-2"></b-form-datepicker>
        </div>
        <div class="col-3 col-md-3">
          <label for="timezone"><b>Timezone</b></label>
          <b-form-select id="timezone" v-model="form.timezone" :options="timezoneOptions"></b-form-select>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">Send email to active webmasters before stopping</div>
        </div>
        <div class="col-3 col-md-2">
          <b-form-input type="number" min="0" max="23" step="1" v-model="form.hours"></b-form-input>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">Categories</div>
        </div>
        <div class="col-3 col-md-6">
          <b-form-input v-model="form.categories"></b-form-input>
          <div class="sub-text">Used for offers sorting by specific category</div>
        </div>
        <div class="col-1 col-md-1">
          <b-button variant="outline-secondary" @click="onAddCategory">+</b-button>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">
            IO document
            <div class="sub-text">PDF only, 100MB max</div>
          </div>
        </div>
        <div class="col-9 col-md-6">
          <input type="file" id="pdf-inputfile" ref="file" class="pdf-inputfile" accept=".pdf" @change="handlePDFUpload()" />
          <label for="pdf-inputfile" class="btn btn-outline-secondary">Choose</label>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-3 col-md-2">
          <div class="caption">
            Notes
          </div>
        </div>
        <div class="col-9 col-md-6">
          <b-form-textarea
            id="notes-textarea"
            v-model="form.notes"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <div class="sub-text">Internal offer notice (The content of this note will not be displayed to Affiliates)</div>
        </div>
      </div>
      
    </b-form>
  </div>
</template>

<script>
import tinymce from 'vue-tinymce-editor'
import General from '@/api/general'

export default {
  name: 'GeneralPage',
  components: {
    tinymce
  },
  data () {
    return {
      form: {
        advertiser: null,
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
      advertiserOptions: [
        { value: null, text: 'Select advertise' },
        { value: '1', text: 'Advertiser 1' },
        { value: '2', text: 'Advertiser 2' },
        { value: '3', text: 'Advertiser 3' },
        { value: '4', text: 'Advertiser 4' },
        { value: '5', text: 'Advertiser 5' }
      ],
      trafficSourcesOptions: [
        { text: 'Web sites', value: 'websites' },
        { text: 'Doorway', value: 'doorway' },
        { text: 'Contextual advertising', value: 'contextual_advertising' },
        { text: 'Contextual advertising of the brands', value: 'contextual_advertising_brands' },
        { text: 'Teaser / Banner / RTB', value: 'teaser_banner_rtb' },
        { text: 'Social Network: Targeted Ads', value: 'targeted_ads' },
        { text: 'Social Network: publics, games, applications', value: 'publics_games_applications' },
        { text: 'Email', value: 'email' },
        { text: 'Mobile traffic', value: 'mobile_traffic' },
        { text: 'ClickUnder/PopUnder', value: 'click_under' },
        { text: 'Reselling traffic', value: 'reselling_traffic' },
        { text: 'Motivated Traffic', value: 'motivated_traffic' },
        { text: 'Messengers, sms', value: 'messengers_sms' },
        { text: 'Video Ads', value: 'video_ads' },
        { text: 'Push', value: 'push' },
        { text: 'API', value: 'api' },
        { text: 'Mobile App (store, pwa, apk, etx)', value: 'mobile_app' },
        { text: 'Forecast', value: 'forecast' }
      ],
      statusOptions: [
        { value: '0', text: 'Disabled' },
        { value: '1', text: 'Enabled' }
      ],
      privacyLevelOptions: [
        { value: '1', text: 'Public' },
        { value: '2', text: 'Pre-moderation' },
        { value: '3', text: 'Private' }
      ],
      timezoneOptions: [
        { value: '+03:00', text: '(GMT +03:00) Europe / Moscow' },
        { value: '-12:00', text: '(GMT -12:00) Eniwetok, Kwajalein' },
        { value: '-11:00', text: '(GMT -11:00) Midway Island, Samoa' },
        { value: '-10:00', text: '(GMT -10:00) Hawaii' },
        { value: '-09:50', text: '(GMT -9:30) Taiohae' },
        { value: '-09:00', text: '(GMT -9:00) Alaska' },
        { value: '-08:00', text: '(GMT -8:00) Pacific Time (US &amp; Canada)' }
      ]
    }
  },
  methods: {
    onSubmit () {
      console.log('Save')
      General.postGeneral(this.form)
    },
    onSaveAndContinue () {
      console.log('Save and Continue')
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
    handleLogoUpload () {
      this.form.logoFile = this.$refs.file.files[0]
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
    padding-top: 5px;
  }
  .sub-text {
    font-size: 12px;
    color: #AEB1B5;
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
}
</style>
