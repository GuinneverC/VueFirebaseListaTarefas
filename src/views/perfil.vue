<template>
  <v-container class="pa-8" fluid>
    <h1 class="h1">Meu Perfil</h1>
    <v-form>
      <v-container color="#CBEBF5">
        <v-text-field label="Nome" v-model="nome"></v-text-field>
        <v-text-field label="Sobrenome" v-model="sobrenome"></v-text-field>
        <v-btn color="#00478F" dark @click="salvarPerfil">Salvar</v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
data() {
return {
  nome: '',
  sobrenome: '', 
  uid: '',
  temPerfil: false,
};
},
async mounted() {
  this.uid = fb.auth.currentUser.uid;
  const userProfile = await fb.profileCollection.where("uid", "==", this.uid).get();
  if (userProfile.docs.length > 0) {
    this.temPerfil = true;
    const perfil = userProfile.docs[0];
    this.profileId = perfil.profileId;
    this.profileId = perfil.id;
    this.nome = perfil.data().nome;
    this.sobrenome = perfil.data().sobrenome;
  }
},
methods: {
    async salvarPerfil() {
      if (this.temPerfil) {
        await fb.profileCollection.doc(this.profileId).update({
          nome: this.nome,
          sobrenome: this.sobrenome,
        });
      } else {
        await fb.profileCollection.add({
          uid: this.uid,
          nome: this.nome,
          sobrenome: this.sobrenome,
        });
      }
    },
  },
};
</script>

<style>

</style>