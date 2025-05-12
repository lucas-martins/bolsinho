// Importando os componentes do PrimeVue
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';

export function setupPrimeVue(app: any) {
  app.use(PrimeVue, { theme: { preset: Aura } });

  app.component('InputText', InputText);
  app.component('Button', Button);
}
