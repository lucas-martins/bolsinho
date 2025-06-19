<template>
  <div class="flex container auth-card">
    <Card>
      <template #title>
        <div class="flex container">
          {{ name }}
        </div>
      </template>
      <template #content>
        <Form
          v-slot="$form"
          :initial-values="initialValues"
          :validation-schema="schema"
          :validate-on-value-update="false"
          :validate-on-blur="true"
          @submit="onFormSubmit"
          class="flex flex-column gap-4 w-full sm:w-56"
        >
          <div class="mb-1">
            <Field name="username" v-slot="{ field, meta, errors }">
              <InputText
                v-bind="field"
                class="w-100"
                placeholder="E-mail/Nome de Usuário"
              />
              <Message
                v-if="meta.touched && errors[0]"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ errors[0] }}
              </Message>
            </Field>
          </div>
          <div>
            <Field name="password" v-slot="{ field, meta, errors }">
              <Password
                v-bind="field"
                placeholder="Senha"
                :feedback="false"
                toggleMask
              />
              <Message
                v-if="meta.touched && errors[0]"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ errors[0] }}
              </Message>
            </Field>
          </div>
          <Button
            class="mt-1"
            type="submit"
            severity="success"
            label="Entrar"
          />
        </Form>
        <TextInsideDivider nome="OU" />
        <span
          >Ainda não tem conta? Clique
          <RouterLink to="/register" class="link">aqui</RouterLink> para se
          registrar.</span
        >
      </template>
    </Card>
  </div>
</template>

<script setup>
import { z } from "zod";
import { Form, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import TextInsideDivider from "../../components/TextInsideDivider.vue";
import { useLoading } from "../../composables/useLoading.js";
import api from "../../services/axios.js";

const name = "Login";
const router = useRouter();
const toast = useToast();
const { showLoading, hideLoading } = useLoading();

const schema = toTypedSchema(
  z.object({
    username: z.string().min(1, "Usuário é obrigatório."),
    password: z.string().min(1, "A senha é obrigatória."),
  })
);

const initialValues = {
  username: "",
  password: "",
};

const onFormSubmit = async (values) => {
  const { username, password } = values;
  const payload = {
    username,
    password,
  };

  try {
    showLoading();

    const response = await api.post("/auth/login", payload);
    const token = response.data.access_token;

    toast.add({
      severity: "success",
      summary: "Sucesso",
      detail: "Login realizado com sucesso!",
      life: 3000,
    });

    localStorage.setItem("token", token);
    router.push("/"); // ajuste conforme sua rota
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Erro",
      detail:
        "Erro ao logar: " + (error.response?.data?.detail || error.message),
      life: 5000,
    });
  } finally {
    hideLoading();
  }
};
</script>

<script>
export default {
  name: "Login",
};
</script>
