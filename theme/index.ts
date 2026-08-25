import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

// Import Theme Styles
import './styles/index.css'

// Import Components
import OreButton from './components/OreButton.vue'
import OreButtonGroup from './components/OreButtonGroup.vue'
import OreCheckbox from './components/OreCheckbox.vue'
import OreSwitch from './components/OreSwitch.vue'
import OreSlider from './components/OreSlider.vue'
import OreDropdown from './components/OreDropdown.vue'
import OreInput from './components/OreInput.vue'
import OreBanner from './components/OreBanner.vue'
import OrePop from './components/OrePop.vue'
import OreModal from './components/OreModal.vue'
import OreShowBlock from './components/OreShowBlock.vue'
import OreBadge from './components/OreBadge.vue'
import OreTag from './components/OreTag.vue'
import OreList from './components/OreList.vue'
import OreSoundToggle from './components/OreSoundToggle.vue'
import OreDisplay from './components/OreDisplay.vue'
import OreHero from './components/OreHero.vue'
import OreFeatures from './components/OreFeatures.vue'
import InteractiveDemo from './components/InteractiveDemo.vue'
import InteractiveToastDemo from './components/InteractiveToastDemo.vue'
import InteractiveModalDemo from './components/InteractiveModalDemo.vue'
import SoundSandboxDemo from './components/SoundSandboxDemo.vue'

// Export Composables
export * from './composables/useSound'
export * from './composables/usePop'

const OreUITheme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Register Global Components
    app.component('OreButton', OreButton)
    app.component('OreButtonGroup', OreButtonGroup)
    app.component('OreCheckbox', OreCheckbox)
    app.component('OreSwitch', OreSwitch)
    app.component('OreSlider', OreSlider)
    app.component('OreDropdown', OreDropdown)
    app.component('OreInput', OreInput)
    app.component('OreBanner', OreBanner)
    app.component('OrePop', OrePop)
    app.component('OreModal', OreModal)
    app.component('OreShowBlock', OreShowBlock)
    app.component('OreBadge', OreBadge)
    app.component('OreTag', OreTag)
    app.component('OreList', OreList)
    app.component('OreSoundToggle', OreSoundToggle)
    app.component('OreDisplay', OreDisplay)
    app.component('OreHero', OreHero)
    app.component('OreFeatures', OreFeatures)
    app.component('InteractiveDemo', InteractiveDemo)
    app.component('InteractiveToastDemo', InteractiveToastDemo)
    app.component('InteractiveModalDemo', InteractiveModalDemo)
    app.component('SoundSandboxDemo', SoundSandboxDemo)
  }
}

export default OreUITheme
