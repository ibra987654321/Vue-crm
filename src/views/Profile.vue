<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @click.prevent="handleSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required
          }"
        />
        <label for="description">Имя</label>
        <span
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          Введите имя
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Profile",
  data: () => ({
    name: ""
  }),
  validations: {
    name: { required }
  },
  mounted() {
    this.name = this.info.name;
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(["info"])
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name
        });
      } catch (e) {}
    }
  }
};
</script>
