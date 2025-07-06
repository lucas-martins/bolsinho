// Importando os componentes do PrimeVue
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import { Form } from "@primevue/forms";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Card from "primevue/card";
import Message from "primevue/message";
import Password from "primevue/password";
import Skeleton from "primevue/skeleton";
import Toast from "primevue/toast";
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import RadioButton from "primevue/radiobutton";
import DatePicker from "primevue/datepicker";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";

export function setupPrimeVue(app: any) {
  app.use(PrimeVue, { theme: { preset: Aura } });
  app.use(ToastService);

  app.component("InputText", InputText);
  app.component("Button", Button);
  app.component("Card", Card);
  app.component("Message", Message);
  app.component("Form", Form);
  app.component("Password", Password);
  app.component("Toast", Toast);
  app.component("Skeleton", Skeleton);
  app.component("Menubar", Menubar);
  app.component("Dialog", Dialog);
  app.component("InputNumber", InputNumber);
  app.component("RadioButton", RadioButton);
  app.component("DatePicker", DatePicker);
}
