<template>
  <div class="flex container auth-card">
    <Card>
      <template #title>
        <div class="flex container relative">
          <Button
            class="btn-icon"
            icon="pi pi-angle-left"
            iconPos="left"
            @click="goToLogin"
          />
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
          <!-- Nome -->
          <div class="mb-1">
            <Field name="name" v-slot="{ field, meta, errors }">
              <InputText
                v-bind="field"
                class="w-100"
                placeholder="Nome completo"
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

          <!-- Nome de usuário -->
          <div class="mb-1">
            <Field name="username" v-slot="{ field, meta, errors }">
              <InputText
                v-bind="field"
                class="w-100"
                placeholder="Nome de usuário"
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

          <!-- E-mail -->
          <div>
            <Field name="email" v-slot="{ field, meta, errors }">
              <InputText
                v-bind="field"
                class="w-100"
                placeholder="E-mail"
                type="email"
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

          <!-- Senha -->
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

          <!-- Confirmar senha -->
          <div>
            <Field name="confirmPassword" v-slot="{ field, meta, errors }">
              <Password
                v-bind="field"
                placeholder="Confirmar senha"
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
            class="mt-1 mb-1"
            type="submit"
            severity="success"
            label="Cadastrar"
          />
        </Form>

        <span
          >Já tem conta? Clique
          <RouterLink to="/login" class="link">aqui</RouterLink> para
          entrar.</span
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

const name = "Cadastro";
const router = useRouter();

const schema = toTypedSchema(
  z
    .object({
      name: z.string().min(1, "Nome é obrigatório."),
      username: z.string().min(1, "Usuário é obrigatório."),
      email: z
        .string()
        .email("E-mail inválido.")
        .min(1, "E-mail é obrigatório."),
      password: z
        .string()
        .min(6, "A senha precisa ter no mínimo 6 caracteres."),
      confirmPassword: z.string().min(1, "Confirme sua senha."),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas devem ser iguais.",
      path: ["confirmPassword"],
    })
);

const initialValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const onFormSubmit = (values) => {
  console.log("Cadastro enviado com:", values);
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<script>
export default {
  name: "Register",
};
</script>

<style scoped>
:deep(.p-password) {
  margin-top: 1rem;
}
</style>
