<script lang="ts">
import { io } from 'socket.io-client'

export default{
  data:() => ({
    socket: io("http://localhost:3002"),
    messageEntries: []
  }),
  mounted(){
    this.socket.on("SUBSCRIBE", (message) => {
      this.messageEntries.push(message)
      console.log(message)
    })
  }
}
</script>

<template>
   <main>
    <h5 v-for="entry of messageEntries" :key="entry">
    {{ entry }}
    </h5>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
