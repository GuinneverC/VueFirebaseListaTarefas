<template >
  <v-container class="pa-8" fluid>
    <h1 class="h1" >Minha Lista de Tarefas</h1>
    <v-form >
      <v-text-field label="Nova tarefa" v-model="novaTarefa" @keydown.enter="adicionar">
        <v-icon color="#1a83cc" slot="append" @click="adicionar">mdi-send</v-icon>
      </v-text-field>
    </v-form >
    <v-divider></v-divider>
  <v-list >
    <v-list-item-group>
      
      <v-list-item v-for="tarefa of tarefas" :key="tarefa.id">
       <v-checkbox></v-checkbox>
        {{tarefa.titulo}}
      </v-list-item>
    </v-list-item-group>
  </v-list>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase"
export default {
data() {
  return {
    novaTarefa: '', 
    tarefas: [
    
    ],
  };
},
mounted() {
  this.uid = fb.auth.currentUser.uid;
  this.buscarTarefasDoServidor();
},
methods: {
  async buscarTarefasDoServidor() {
    this.tarefas = []
    const logTasks = await fb.tasksCollection.where('owner', '==', this.uid).get();
    for (const doc of logTasks.docs) {
        this.tarefas.push({
          id: doc.id,
          titulo: doc.data().titulo,
        });
      }
    },

  async adicionar() {
    event.preventDefault();
      await fb.tasksCollection.add({
        titulo: this.novaTarefa,
        dataGravacao: new Date().toISOString().slice(0, 10),
        owner: this.uid,
        checked: false,
      });
      this.novaTarefa = "";
      this.buscarTarefasDoServidor();
    },
},
        
};
</script>

<style>

</style>